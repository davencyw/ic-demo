#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import * as generatedTools from "./tools/index.js";

// Create the server instance
const server = new Server({
  name: "ic-agentic-mcp-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {},
    resources: {},
    prompts: {}
  }
});

// Collect all tools by executing them with a mock server to extract metadata
const allTools = [];
const mockServerForRegistration = {
  tool: (toolName, config, handler) => {
    allTools.push({
      name: toolName,
      description: config.description,
      inputSchema: config.inputSchema,
      handler: handler
    });
  }
};

// Execute all tool functions to register them
Object.entries(generatedTools).forEach(([key, toolOrToolset]) => {
  if (typeof toolOrToolset === 'function' && key.endsWith('Tool')) {
    // Execute the tool function to register it
    toolOrToolset(mockServerForRegistration);
  }
});

// Handle tools/list requests
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: allTools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: zodToJsonSchema(tool.inputSchema)
    }))
  };
});

// Handle tools/call requests  
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  const tool = allTools.find(t => t.name === name);
  if (!tool) {
    throw new Error(`Tool not found: ${name}`);
  }
  
  return await tool.handler(args || {});
});

// Connect to stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
