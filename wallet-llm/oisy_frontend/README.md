# OISY Console Frontend (Standalone)

A standalone frontend that connects directly to the LLM canister on the Internet Computer using the [@dfinity/llm](https://www.npmjs.com/package/@dfinity/llm) TypeScript library.

## Overview

This standalone chat interface bypasses the need for a local IC canister and connects directly to the Internet Computer's LLM canister (`w36hm-eqaaa-aaaal-qr76a-cai`) using the agent.js library. It provides the same OISY Wallet assistant experience as the original console frontend but runs completely independently.

## Features

- 🚀 **Direct IC Connection**: Uses `@dfinity/llm` to connect directly to the LLM canister
- 💬 **Chat Interface**: Same familiar chat experience as the original console frontend
- 🌍 **Network Support**: Automatically detects local development vs mainnet
- 🎨 **OISY Branding**: Maintains the OISY Wallet personality and context
- ⚡ **No Backend Required**: Runs completely standalone

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation

1. Navigate to the standalone frontend directory:
```bash
cd console_frontend_standalone
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## Build for Production

Build the application:

```bash
npm run build
```

Preview the built application:

```bash
npm run preview
```

## How It Works

### Direct LLM Connection

Instead of going through your local console_backend canister, this frontend:

1. **Initializes** the `@dfinity/llm` library
2. **Connects** directly to the IC LLM canister at `w36hm-eqaaa-aaaal-qr76a-cai`
3. **Sends** chat messages using the same OISY Wallet system prompt
4. **Receives** responses directly from the LLM

### Network Detection

The app automatically configures the agent based on the environment:

- **Local Development**: Connects to `http://127.0.0.1:4943` (requires local IC replica)
- **Production**: Connects to `https://ic0.app` (Internet Computer mainnet)

### LLM Model

Uses the **Llama4Scout** model via `llm.Model.Llama4Scout` for generating responses.

## Architecture Comparison

### Original Flow (console_frontend → console_backend → LLM)
```
Browser → console_frontend → console_backend (IC Canister) → LLM Canister
```

### Standalone Flow (direct to LLM)
```
Browser → console_frontend_standalone → LLM Canister (Direct)
```

## Dependencies

- **@dfinity/llm**: TypeScript library for LLM canister interaction
- **@dfinity/agent**: Core agent library for IC communication
- **@dfinity/candid**: Candid interface definitions
- **@dfinity/principal**: Principal utilities
- **Vite**: Build tool and development server
- **TypeScript**: Type-safe JavaScript

## Environment Variables

No environment variables are required. The app automatically detects the network environment.

## Troubleshooting

### "Failed to initialize LLM" Error

This usually indicates a network connectivity issue:

1. **Local Development**: Ensure you have a local IC replica running (`dfx start`)
2. **Production**: Check your internet connection

### TypeScript Errors

Make sure all dependencies are installed:

```bash
npm install
```

### Build Errors

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

This standalone frontend mirrors the functionality of the original console_frontend but uses the direct LLM connection approach. When making changes:

1. Ensure compatibility with both local and mainnet environments
2. Maintain the OISY Wallet personality and branding
3. Follow the existing code style and structure

## Related Documentation

- [@dfinity/llm npm package](https://www.npmjs.com/package/@dfinity/llm)
- [DFINITY LLM GitHub Repository](https://github.com/dfinity/llm)
- [Internet Computer Agent Documentation](https://agent-js.icp.xyz/) 