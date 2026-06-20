# AgentSession

`ChatSample.cs` shows two usage modes for AgentSession:

- Shared session: preserves conversation context across turns (recommended)
- New session each turn: no context carry-over (for comparison)

## Related APIs

- `BuildKernelWithAgentSessionAsync()`: creates and binds session.
- `RunChatAsync(prompt, agentSession)`: sends with explicit session.

## Troubleshooting tips

- If behavior feels "memoryless": first check whether you accidentally selected "new session each turn".
- For reproducibility: lock the same session and run multiple follow-up turns.
