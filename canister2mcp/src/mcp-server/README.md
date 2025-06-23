# IC Agentic MCP Server

An MCP (Model Context Protocol) server that provides access to Internet Computer canister methods through auto-generated tools.

## Overview

This MCP server automatically generates tools from IC agent definitions, providing direct access to canister methods through a standardized MCP interface.

## Configuration

### `agents.json`
Defines available agents and their candid file locations:
```json
{
  "adder_agent": {
    "name": "Adder Agent",
    "candid_file": "src/agents/adder/src/service.did",
    "principal": "zzxla-byaaa-aaaai-ajr5a-cai"
  }
}
```

- The candid file is used to generate the functions that will be available through the MCP server
- The principal is used to call the canister on the IC

### Environment Variables
- `IC_HOST`: IC network endpoint 
  - Local development: `http://localhost:8000` (default)
  - Mainnet: `https://icp-api.io`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Generate tools from candid files:
```bash
node generateTools.js
```

3. Start the server:
```bash
node server.js
```

## Usage with MCP Clients

Configure in your MCP client (e.g., Claude Desktop):
```json
{
  "mcpServers": {
    "ic-agent": {
      "command": "node",
      "args": ["path-to-your-project/src/mcp-server/server.js"],
      "cwd": "path-to-your-project/src/mcp-server"
    }
  }
}
```

## Adding New Agents

1. Add agent definition to `agents.json`
2. Run `node generateTools.js` (or `just regen-mcp` from the root of this repo) to regenerate tools
3. Restart the server

Tools are automatically created for each method defined in the agent's candid file, with proper type validation and IC canister integration using [@dfinity/agent-js](https://github.com/dfinity/agent-js).

## Technical Details

### How the Tool Generation System Works

1. **agents.json**: Defines the available agents and their candid file locations
2. **generateTools.js**: Preprocessing script that reads agents.json and candid files
3. **tools/**: Directory containing generated tool files (one per agent)
4. **server.js**: Main server file that imports and registers all generated tools

### Candid File Support

The current implementation supports:
- Simple method signatures: `method_name: (param_types) -> (return_type);`
- Text parameters and return types
- Parameter names extracted directly from candid file definitions:
  - Uses actual parameter names when defined as `param_name: type`
  - Falls back to `param_N` if only type is specified
  - Preserves parameter types for better validation

### IC Canister Integration

The generated tools include actual IC canister integration using [@dfinity/agent-js](https://github.com/dfinity/agent-js). Each tool:

1. **Creates an HTTP Agent** connected to the Internet Computer
2. **Generates IDL interface** from the candid method signatures  
3. **Makes actual canister calls** using the Actor pattern
4. **Handles errors gracefully** with proper error messages

## Test MCP Server with Inspector

You can test the MCP server using the official MCP inspector:

```bash
npx @modelcontextprotocol/inspector node server.js
```

Make sure that you launched the agent canisters beforehand.

This will:
1. Start the MCP server
2. Open a web interface to interact with the server
3. Allow you to test all available tools interactively
4. Show tool schemas and responses in real-time

The inspector is useful for:
- Verifying tool generation worked correctly
- Testing canister connectivity
- Debugging tool parameters and responses
- Exploring available functionality before integrating with MCP clients