#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local replica configuration
const LOCAL_REPLICA_PORT = 8000; // pocket-ic proxy port

// Parse a candid file to extract method signatures with parameter names
function parseCandidFile(candidContent) {
  const methods = [];
  
  // Regex to match method definitions like: method_name: (param_name: param_type, ...) -> (return_type) [query];
  const methodRegex = /(\w+):\s*\(([^)]*)\)\s*->\s*\(([^)]*)\)(?:\s+(\w+))?\s*;/g;
  
  let match;
  while ((match = methodRegex.exec(candidContent)) !== null) {
    const [, methodName, paramString, returnType, annotation] = match;
    
    // Parse parameters to extract names and types
    const params = [];
    if (paramString.trim()) {
      const paramList = paramString.split(',').map(p => p.trim());
      
      paramList.forEach(param => {
        // Check if parameter has name: type format
        const paramMatch = param.match(/(\w+):\s*(\w+)/);
        if (paramMatch) {
          const [, paramName, paramType] = paramMatch;
          params.push({
            name: paramName,
            type: paramType
          });
        } else {
          // Fallback: just type without name
          params.push({
            name: `param_${params.length + 1}`,
            type: param
          });
        }
      });
    }
    
    methods.push({
      name: methodName,
      params: params,
      returnType: returnType.trim(),
      isQuery: annotation === 'query'
    });
  }
  
  return methods;
}

// Generate tool definition for a method
function generateToolDefinition(agentName, agentKey, method, agentConfig) {
  const toolName = `${agentKey}_${method.name}`;
  
  // Create input schema based on parameters from candid file
  const inputSchemaProperties = {};
  method.params.forEach((param, index) => {
    const paramName = param.name;
    const isOptional = index > 0; // First parameter required, others optional
    const zodType = isOptional ? 'z.string().optional()' : 'z.string()';
    inputSchemaProperties[paramName] = `${zodType}.describe("${param.name} (${param.type}) for ${method.name}")`;
  });
  
  const inputSchemaPropsStr = Object.entries(inputSchemaProperties).length > 0 
    ? Object.entries(inputSchemaProperties)
        .map(([key, value]) => `      ${key}: ${value}`)
        .join(',\n')
    : '';

  // Generate parameter destructuring
  const paramNames = Object.keys(inputSchemaProperties);
  const destructuring = paramNames.length > 0 ? `{ ${paramNames.join(', ')} }` : `{}`;

  return `
// Tool: ${method.name}
export const ${toolName}Tool = (server) => server.tool(
  "${toolName}",
  {
    description: "Calls ${method.name} on the ${agentName}",
    inputSchema: z.object({${inputSchemaPropsStr ? '\n' + inputSchemaPropsStr + '\n    ' : ''}})
  },
  async (${destructuring}) => {
    try {
      // Get the actor instance
      const actor = await getActor();
      
      // Prepare parameters, filtering out undefined optional parameters
      const params = [${method.params.map((param, index) => {
        if (index === 0) {
          // First parameter is required
          return param.name;
        } else {
          // Optional parameters - only include if defined
          return `${param.name} || ""`;
        }
      }).join(', ')}];
      
      // Make the actual canister call
      const result = await actor.${method.name}(...params);
      
      return {
        content: [
          {
            type: "text",
            text: String(result)
          }
        ]
      };
    } catch (error) {
      console.error(\`Error calling ${method.name} on ${agentName}:\`, error);
      
      return {
        content: [
          {
            type: "text",
            text: \`Error: Failed to call ${method.name} on ${agentName}. \${error.message}\`
          }
        ]
      };
    }
  }
);`;
}



// Generate a complete tool file for an agent
function generateAgentToolFile(agentKey, agentConfig, methods) {
  const imports = `import { z } from "zod";
import { HttpAgent, Actor } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";`;

  const canisterSetup = `
// Canister configuration
const CANISTER_ID = "${agentConfig.principal || 'rdmx6-jaaaa-aaaaa-aaadq-cai'}";
const LOCAL_HOST = "http://localhost:` + LOCAL_REPLICA_PORT + `"; // pocket-ic proxy port
const HOST = process.env.IC_HOST || LOCAL_HOST;

// Create agent and actor
let agent;
let actor;

async function getActor() {
  if (!actor) {
    agent = new HttpAgent({ host: HOST });
    
    // In development, you might want to fetch root key for local replica
    if (HOST.includes("localhost") || HOST.includes("127.0.0.1")) {
      await agent.fetchRootKey();
    }
    
    // IDL factory for ${agentConfig.name}
    const idlFactory = ({ IDL }) => {
      return IDL.Service({
        ${methods.map(method => {
          const paramTypes = method.params.map(p => 'IDL.Text').join(', ');
          // Map candid return types to IDL types
          let returnType = 'IDL.Text';
          if (method.returnType === 'int64') returnType = 'IDL.Int64';
          else if (method.returnType === '' || method.returnType === 'null') returnType = 'IDL.Null';
          
          const returnTypes = method.returnType === '' || method.returnType === 'null' ? '[]' : `[${returnType}]`;
          const annotations = method.isQuery ? "['query']" : '[]';
          return `${method.name}: IDL.Func([${paramTypes}], ${returnTypes}, ${annotations})`;
        }).join(',\n        ')}
      });
    };
    
    actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: CANISTER_ID,
    });
  }
  return actor;
}`;
  
  const tools = methods.map(method => 
    generateToolDefinition(agentConfig.name, agentKey, method, agentConfig)
  ).join('\n');
  
  const exports = methods.map(method => 
    `${agentKey}_${method.name}Tool`
  );
  
  const exportStatement = `
// Export all tools for this agent
export const ${agentKey}Tools = {
  ${exports.map(toolName => `${toolName}: ${toolName}`).join(',\n  ')}
};`;

  return `${imports}\n${canisterSetup}\n${tools}\n${exportStatement}`;
}

// Main preprocessing function
async function generateTools() {
  try {
    // Read agents.json
    const agentsJsonPath = path.join(__dirname, 'agents.json');
    const agentsContent = await fs.readFile(agentsJsonPath, 'utf8');
    const agents = JSON.parse(agentsContent);
    
    // Create tools directory
    const toolsDir = path.join(__dirname, 'tools');
    await fs.mkdir(toolsDir, { recursive: true });
    
    // Generate index file for importing all tools
    const indexExports = [];
    
    // Process each agent
    for (const [agentKey, agentConfig] of Object.entries(agents)) {
      console.log(`Processing agent: ${agentKey}`);
      
      // Read candid file
      const candidPath = path.resolve(__dirname, '../../', agentConfig.candid_file);
      const candidContent = await fs.readFile(candidPath, 'utf8');
      
      // Parse methods from candid file
      const methods = parseCandidFile(candidContent);
      console.log(`Found methods: ${methods.map(m => m.name).join(', ')}`);
      
      // Generate tool file
      const toolFileContent = generateAgentToolFile(agentKey, agentConfig, methods);
      const toolFilePath = path.join(toolsDir, `${agentKey}.js`);
      await fs.writeFile(toolFilePath, toolFileContent);
      
      // Only export individual tool functions, not the toolset objects
      indexExports.push(`export * from './${agentKey}.js';`);
      
      console.log(`Generated tool file: ${toolFilePath}`);
    }
    
    // Generate index.js file
    const indexContent = indexExports.join('\n') + '\n';
    await fs.writeFile(path.join(toolsDir, 'index.js'), indexContent);
    
    console.log('Tool generation completed successfully!');
    console.log('Generated files:');
    console.log('- tools/index.js');
    Object.keys(agents).forEach(agentKey => {
      console.log(`- tools/${agentKey}.js`);
    });
    
  } catch (error) {
    console.error('Error generating tools:', error);
    process.exit(1);
  }
}

// Run the tool generation
generateTools(); 