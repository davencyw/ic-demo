import './styles.css';
import { HttpAgent, Actor } from '@dfinity/agent';
import { LLM_CANISTER_ID, MODEL, IC_HOST, SYSTEM_PROMPT, llmIdl } from './config';
import { formatMessage } from './formatting';
import { executeTool, availableTools } from './tools';
import type { ChatMessage, LLMActor, LLMResponse } from './types';

class ChatApp {
  private chatBox!: HTMLElement;
  private form!: HTMLFormElement;
  private input!: HTMLInputElement;
  private llmActor!: LLMActor;
  private chatHistory: ChatMessage[] = [];

  constructor() {
    this.initializeApp();
  }

  private async initializeApp() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupDOMElements());
    } else {
      this.setupDOMElements();
    }

    // Initialize LLM connection
    await this.initializeLLM();
    
    // Add welcome message after a brief delay to ensure DOM is ready
    setTimeout(() => {
      // Add system context to chat history (this won't be displayed)
      this.chatHistory.push({
        role: 'system',
        content: SYSTEM_PROMPT
      });
      
      this.appendMessage('bot', 'Hello! I\'m OISY Wallet, your fully on-chain multi-chain wallet assistant. How can I help you today?');
    }, 500);
  }

  private setupDOMElements() {
    this.chatBox = document.querySelector(".msger-chat")!;
    this.form = document.querySelector(".msger-inputarea")!;
    this.input = document.querySelector(".msger-input")!;

    this.form.addEventListener("submit", this.handleSubmit);
  }

  private async initializeLLM() {
    try {
      console.log('Configuring IC agent for host:', IC_HOST);
      const agent = new HttpAgent({ host: IC_HOST });
      
      // Create actor for LLM canister
      this.llmActor = Actor.createActor(llmIdl, {
        agent,
        canisterId: LLM_CANISTER_ID,
      }) as LLMActor;
      
      console.log('LLM actor created for canister:', LLM_CANISTER_ID);
    } catch (error) {
      console.error('Failed to initialize LLM:', error);
      this.appendMessage('bot', 'Sorry, I\'m having trouble connecting to the Internet Computer. Please try again later.');
    }
  }

  private appendMessage(person: 'user' | 'bot', text: string) {
    // Store message in chat history (skip system messages and thinking messages)
    if (person === 'user') {
      this.chatHistory.push({ role: 'user', content: text });
    } else if (person === 'bot' && !text.includes('🤔 Thinking...')) {
      this.chatHistory.push({ role: 'assistant', content: text });
    }

    const formattedText = formatMessage(text, person === 'bot');

    const msgHTML = `
      <div class="msg ${person === 'user' ? 'right-msg' : 'left-msg'}">
        <div class="msg-text">${formattedText}</div>
      </div>
    `;

    this.chatBox.insertAdjacentHTML("beforeend", msgHTML);
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }

  private handleSubmit = async (event: Event) => {
    event.preventDefault();
    const msgText = this.input.value.trim();
    if (!msgText) return;

    this.appendMessage('user', msgText);
    this.input.value = "";

    this.addThinkingMessage();

    try {
      const result = await this.askLLM(msgText);
      this.removeLastThinkingMessage();

      if (result) {
        this.appendMessage('bot', result);
      } else {
        this.appendMessage('bot', "Sorry, I didn't get a response from the LLM.");
      }
    } catch (error) {
      this.removeLastThinkingMessage();
      console.error('Error asking LLM:', error);
      this.appendMessage('bot', `Sorry, something went wrong: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  private addThinkingMessage() {
    const msgHTML = `
      <div class="msg left-msg thinking-message">
        <div class="msg-text">Thinking...</div>
      </div>
    `;
    this.chatBox.insertAdjacentHTML("beforeend", msgHTML);
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }

  private removeLastThinkingMessage() {
    const thinkingMessage = this.chatBox.querySelector('.thinking-message');
    if (thinkingMessage) {
      thinkingMessage.remove();
    }
  }

  private buildMessages(prompt: string): unknown[] {
    // Get last 10 messages from chat history
    const recentHistory = this.chatHistory.slice(-10);
    
    // Build messages array
    const messages: unknown[] = [];

    // Add recent chat history in v1 format
    recentHistory.forEach(msg => {
      if (msg.role === 'system') {
        messages.push({
          system: {
            content: msg.content
          }
        });
      } else if (msg.role === 'user') {
        messages.push({
          user: {
            content: msg.content
          }
        });
      } else if (msg.role === 'assistant') {
        messages.push({
          assistant: {
            content: [msg.content],
            tool_calls: []
          }
        });
      }
    });

    // If no system message in recent history, add the default one
    if (!recentHistory.some(msg => msg.role === 'system')) {
      messages.unshift({
        system: {
          content: SYSTEM_PROMPT
        }
      });
    }

    // Add the current user message
    messages.push({
      user: {
        content: prompt
      }
    });

    return messages;
  }

  private async handleToolCalls(response: LLMResponse, messages: unknown[]): Promise<string> {
    const toolCalls = response.message.tool_calls;
    if (!toolCalls || toolCalls.length === 0) {
      return "No tool calls found in response.";
    }

    console.log('Processing tool calls:', toolCalls);
    
    // Execute tool calls and collect results
    const toolResults = [];
    for (const toolCall of toolCalls) {
      const toolResult = await executeTool(toolCall);
      toolResults.push({
        tool: {
          content: toolResult,
          tool_call_id: toolCall.id
        }
      });
    }

    // Add tool results to messages and make another LLM call
    const updatedMessages = [...messages];
    
    // Add the assistant's tool call message
    updatedMessages.push({
      assistant: {
        content: response.message.content || [],
        tool_calls: response.message.tool_calls
      }
    });

    // Add tool results
    updatedMessages.push(...toolResults);

    // Make another LLM call with tool results
    const followUpRequest = {
      model: MODEL,
      messages: updatedMessages,
      tools: availableTools
    };

    console.log('Making follow-up call with tool results...');
    const followUpResponse = await this.llmActor.v1_chat(followUpRequest);
    
    if (followUpResponse && followUpResponse.message && followUpResponse.message.content) {
      const content = followUpResponse.message.content;
      if (Array.isArray(content) && content.length > 0 && typeof content[0] === 'string') {
        return content[0].trim();
      }
    }
    
    return "I executed the requested action but didn't get a proper response.";
  }

  private async askLLM(prompt: string): Promise<string> {
    try {
      console.log('Starting LLM request with prompt:', prompt);
      
      // Check if actor is available
      if (!this.llmActor) {
        throw new Error('LLM actor not initialized');
      }

      console.log('Using model: ', MODEL);

      const messages = this.buildMessages(prompt);

      const chatRequest = {
        model: MODEL,
        messages: messages,
        tools: availableTools
      };

      console.log('Chat history length:', this.chatHistory.length);
      console.log('Sending chat request with', messages.length, 'messages:', chatRequest);

      // Send the request to LLM canister
      console.log('Calling v1_chat method...');
      const response = await this.llmActor.v1_chat(chatRequest);

      console.log('Raw LLM Response:', response);
      console.log('Response type:', typeof response);

      // Handle tool calls if present
      if (response && typeof response === 'object' && response.message && response.message.tool_calls && response.message.tool_calls.length > 0) {
        return await this.handleToolCalls(response, messages);
      }

      // Handle regular text response
      if (response && typeof response === 'object' && response.message) {
        const content = response.message.content; // content is optional and is an array
        if (content && Array.isArray(content) && content.length > 0 && typeof content[0] === 'string') {
          return content[0].trim();
        }
      }

      console.error('Unexpected response structure:', response);
      return `I received an unexpected response structure: ${JSON.stringify(response)}`;
      
    } catch (error) {
      console.error("Detailed error calling LLM canister:", error);
      console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
      
      // More detailed error handling
      if (error instanceof Error) {
        return `LLM Error: ${error.message}`;
      } else {
        return `Unknown LLM Error: ${String(error)}`;
      }
    }
  }
}

// Initialize the app when the script loads
new ChatApp(); 