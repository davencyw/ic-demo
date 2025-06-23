// Configuration constants
export const LLM_CANISTER_ID = 'w36hm-eqaaa-aaaal-qr76a-cai';
export const MODEL = 'llama3.1:8b';
export const IC_HOST = 'https://ic0.app';

// System prompt for OISY Wallet
export const SYSTEM_PROMPT = `You are OISY Wallet, a fully on-chain multi-chain wallet powered by Internet Computer's Chain Fusion technology.
You support BTC, ETH, SOL, ICP, Polygon, BNB Chain & Base without bridges.
Core Identity: Browser-based wallet requiring no downloads. Uses network custody - 
private keys distributed across ICP nodes via threshold ECDSA, never controlled by single entity.
Key Features: Internet Identity authentication (passkeys), privacy mode, address book, WalletConnect 
integration, in-wallet swaps. Fully decentralized - entire app served from blockchain.
Personality: Confident about revolutionary security model, user-focused on seamless experience, 
honest about alpha status. Emphasize true decentralization vs traditional wallets requiring centralized infrastructure.
Answer style: Concise`;

// Candid interface for the LLM canister
export const llmIdl = ({ IDL }: { IDL: any }) => IDL.Service({
  'v1_chat': IDL.Func(
    [
      IDL.Record({
        'model': IDL.Text,
        'messages': IDL.Vec(
          IDL.Variant({
            'user': IDL.Record({
              'content': IDL.Text,
            }),
            'system': IDL.Record({
              'content': IDL.Text,
            }),
            'assistant': IDL.Record({
              'content': IDL.Opt(IDL.Text),
              'tool_calls': IDL.Vec(
                IDL.Record({
                  'id': IDL.Text,
                  'function': IDL.Record({
                    'name': IDL.Text,
                    'arguments': IDL.Vec(
                      IDL.Record({
                        'name': IDL.Text,
                        'value': IDL.Text,
                      })
                    ),
                  }),
                })
              ),
            }),
            'tool': IDL.Record({
              'content': IDL.Text,
              'tool_call_id': IDL.Text,
            }),
          })
        ),
        'tools': IDL.Opt(IDL.Vec(
          IDL.Variant({
            'function': IDL.Record({
              'name': IDL.Text,
              'description': IDL.Opt(IDL.Text),
              'parameters': IDL.Opt(
                IDL.Record({
                  'type': IDL.Text,
                  'properties': IDL.Opt(IDL.Vec(
                    IDL.Record({
                      'type': IDL.Text,
                      'name': IDL.Text,
                      'description': IDL.Opt(IDL.Text),
                      'enum': IDL.Opt(IDL.Vec(IDL.Text)),
                    })
                  )),
                  'required': IDL.Opt(IDL.Vec(IDL.Text)),
                })
              ),
            }),
          })
        )),
      })
    ],
    [
      IDL.Record({
        'message': IDL.Record({
          'content': IDL.Opt(IDL.Text),
          'tool_calls': IDL.Vec(
            IDL.Record({
              'id': IDL.Text,
              'function': IDL.Record({
                'name': IDL.Text,
                'arguments': IDL.Vec(
                  IDL.Record({
                    'name': IDL.Text,
                    'value': IDL.Text,
                  })
                ),
              }),
            })
          ),
        }),
      })
    ],
    [] // Update method (no annotation means update)
  ),
}); 
