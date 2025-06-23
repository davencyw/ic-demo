# IC Agent MCP Example

## Overview
A template for building Internet Computer (IC) agents that integrate seamlessly with AI assistants via the Model Context Protocol ([MCP](https://modelcontextprotocol.io/)). This template enables you to deploy smart contracts (canisters) to the IC and expose their functionality as AI tools through MCP.

## Project Structure
```
src/
├── agents/                 # Agents as IC canisters, accessible through MCP
└── mcp-server/             # MCP integration
```

## Prerequisites
- [dfx](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/) (IC SDK)
- [Rust](https://rustup.rs/) with `wasm32-unknown-unknown` target
- [Node.js](https://nodejs.org/) (for MCP server)
- [just](https://github.com/casey/just) (command runner)

# Quickstart
## Build and Launch Agents

1. **Install dependencies:**
   ```bash
   just install
   ```

2. **Start local IC replica:**
   ```bash
   just start-dfx
   ```

3. **Deploy agents:**
   ```bash
   just deploy
   ```

4. **Generate MCP tools:**
   ```bash
   just regen-mcp
   ```


## Integrate MCP into Claude Desktop

To integrate the MCP server with Claude Desktop:

1. **Locate your Claude Desktop configuration file:**
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add the MCP server configuration** to the `mcpServers` section:
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

3. **Update the `args` and `cwd` path** to point to your actual `src/mcp-server` directory

4. **Restart Claude Desktop** for the changes to take effect

Once configured, you'll have access to all agentic tools directly within Claude Desktop conversations.

### Example
Try asking Claude: *"Increment the value and tell me what it was before and after"* - it will automatically call your deployed IC agent!

![Claude Integration](.github/images/claude.gif)


## Add New Agents

1. **Write your new canister**
   ```bash
   cp -r src/agents/adder src/agents/my_agent
   cd src/agents/my_agent
   ```

2. **Update key files:**
   - **`src/lib.rs`**: Implement your agent logic
   - **`src/service.did`**: Define your Candid interface
   ```did
   service my_agent: {
       my_function: (text) -> (text) query;
   }
   ```

3. **Register in workspace** (`Cargo.toml`):
   ```toml
   members = [
       "src/agents/adder",
       "src/agents/my_agent",  # Add this
   ]
   ```

4. **Add to IC configuration** (`dfx.json`):
   ```json
   "canisters": {
       "my_agent": {
           "type": "custom",
           "build": "just build",
           "wasm": "target/wasm32-unknown-unknown/release/my_agent.wasm",
           "candid": "src/agents/my_agent/src/service.did"
       }
   }
   ```

5. **Register with MCP** (`src/mcp-server/agents.json`):
   ```json
   {
       "my_agent": {
           "name": "My Agent",
           "candid_file": "src/agents/my_agent/src/service.did",
           "principal": "your-canister-id"
       }
   }
   ```

6. **Generate tools and deploy canisters (agents):**
   ```bash
   just regen-mcp
   just deploy
   ```

7. **Restart Claude (or any other MCP integration)**

### MCP Integration

The MCP server automatically generates AI tools from your agent's Candid interface. Each public function becomes a callable tool in Claude Desktop.

For detailed MCP server documentation, see [`src/mcp-server/README.md`](src/mcp-server/README.md).
