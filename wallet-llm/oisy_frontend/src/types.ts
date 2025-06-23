// Chat message interface
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Tool call interfaces
export interface ToolCallArgument {
  name: string;
  value: string;
}

export interface ToolFunction {
  name: string;
  arguments: ToolCallArgument[];
}

export interface ToolCall {
  id: string;
  function: ToolFunction;
}

// LLM Response interfaces
export interface LLMMessage {
  content?: string[];
  tool_calls: ToolCall[];
}

export interface LLMResponse {
  message: LLMMessage;
}

// IDL interface (simplified typing for the IDL factory)
export interface IDLFactory {
  IDL: {
    Service: (methods: unknown) => unknown;
    Func: (args: unknown[], returnType: unknown[], annotations?: unknown[]) => unknown;
    Record: (fields: unknown) => unknown;
    Vec: (type: unknown) => unknown;
    Variant: (variants: unknown) => unknown;
    Text: unknown;
    Opt: (type: unknown) => unknown;
  };
}

// Actor interface for the LLM canister
export interface LLMActor {
  v1_chat: (request: unknown) => Promise<LLMResponse>;
} 