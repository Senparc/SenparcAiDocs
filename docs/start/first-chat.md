# First Chat Success

## Goal

Complete a multi-turn chat through menu `[1] Chat`, and confirm AgentSession is working.

## Prerequisites

- Completed [Get Code and Run](/start/clone-and-run.html)
- At least one available chat model (for example `gpt-4o`)

## Steps

1. Start sample and enter `1` for Chat.
2. Enter System Message when prompted (or keep default by leaving empty).
3. Choose session mode:
- `1` Shared AgentSession (recommended)
- `2` New Session each turn (for comparison)
4. Ask a question, for example:

```text
What are three local specialties in Suzhou?
```

5. Ask a follow-up:

```text
What about Nanjing?
```

## Expected Result and Troubleshooting

- Expected: in mode `1`, second response keeps context.
- Expected: token stats appear in output (input/output/total).
- If context seems lost: confirm you selected mode `1`.
- If 401/403 appears: check key and endpoint.
- If response is very slow: switch to a lighter model or disable local proxy interference.
