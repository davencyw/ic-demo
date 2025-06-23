import type { ToolCall, ToolCallArgument } from './types';

// Mock contact data
const mockContacts = [
  { name: "Alice", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", currency: "BTC" },
  { name: "Bob", address: "0x742d35Cc123C4c42c6782f8E8F4B8e8e1E9DC8Ae", currency: "ETH" },
  { name: "Charlie", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgHKv", currency: "SOL" },
  { name: "Dave", address: "rrkah-fqaaa-aaaah-qcuaq-cai", currency: "ICP" }
];

// Mock method to get user contacts
export async function getContacts(): Promise<string> {
  return JSON.stringify(mockContacts, null, 2);
}

// Mock method to send tokens
export async function sendTokens(to: string, amount: string, currency: string): Promise<string> {
  const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return JSON.stringify({
    success: true,
    transaction_id: transactionId,
    to: to,
    amount: amount,
    currency: currency,
    status: "pending",
    message: `Successfully initiated transfer of ${amount} ${currency} to ${to}`
  }, null, 2);
}

// Convert tool call arguments array to a map
function parseToolArguments(args: ToolCallArgument[]): Record<string, string> {
  const argMap: Record<string, string> = {};
  if (args && Array.isArray(args)) {
    args.forEach((arg) => {
      if (arg.name && arg.value) {
        argMap[arg.name] = arg.value;
      }
    });
  }
  return argMap;
}

// Execute tool calls
export async function executeTool(toolCall: ToolCall): Promise<string> {
  try {
    const functionName = toolCall.function.name;
    const args = toolCall.function.arguments;
    
    console.log(`Executing tool: ${functionName}`, args);

    switch (functionName) {
      case 'get_contacts':
        return await getContacts();
        
      case 'send_tokens': {
        const argMap = parseToolArguments(args);
        
        const to = argMap['to'];
        const amount = argMap['amount'];
        const currency = argMap['currency'];
        
        if (!to || !amount || !currency) {
          return JSON.stringify({
            error: "Missing required parameters. Need: to, amount, currency"
          });
        }
        
        return await sendTokens(to, amount, currency);
      }
        
      default:
        return JSON.stringify({
          error: `Unknown tool: ${functionName}`
        });
    }
  } catch (error) {
    console.error('Error executing tool:', error);
    return JSON.stringify({
      error: `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
    });
  }
}

// Define available tools for the LLM
export const availableTools = [[
  {
    function: {
      name: "get_contacts",
      description: ["Get the user's saved wallet contacts"],
      parameters: [{
        type: "object",
        properties: [[]],
        required: [[]]
      }]
    }
  },
  {
    function: {
      name: "send_tokens",
      description: ["Send tokens to a wallet address"],
      parameters: [{
        type: "object",
        properties: [[
          {
            type: "string",
            name: "to",
            description: ["Recipient wallet address"],
            enum: []
          },
          {
            type: "string", 
            name: "amount",
            description: ["Amount to send"],
            enum: []
          },
          {
            type: "string",
            name: "currency", 
            description: ["Currency/token to send (BTC, ETH, SOL, ICP, etc.)"],
            enum: []
          }
        ]],
        required: [["to", "amount", "currency"]]
      }]
    }
  }
]]; 