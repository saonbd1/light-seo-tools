# Tool Audit Instruction

## Purpose

Audit every browser tool in `tools/` and classify it as working, degraded,
or broken — with reproducible evidence.

## Scope

All `tools/*.md` files with `tool: true` frontmatter.
Exclude `tools-overview.md` and `tools/README.md`.

## Definitions — read before testing

A tool has THREE outcomes, not two. Never collapse them.

| State | Meaning |
|---|---|
| **working** | Primary input produces correct output for 3 real sites |
| **degraded** | Works, but fails under defined conditions (rate limits, large inputs, specific sites) |
| **broken** | Fails for normal input on most sites, or produces wrong results |

A tool that reports success but returns incorrect data is **broken**, not
working. Wrong output is worse than an error — an error is visible.

## Test protocol

For each tool:

1. Open the live page at `https://saonbd1.github.io/light-seo-tools/tools/<name>.html`
2. Test in a real browser, not curl. `curl` does not reproduce CORS,
   proxy behaviour, or rate limits, and is not evidence.
3. Use 3 real target sites per test, one small and two non-trivial
4. Record the exact input used
5. Record the exact output, including counts
6. Note console errors verbatim

## Required evidence per tool

- Input used (verbatim)
- Output observed (verbatim, or count summary)
- Console errors (or "none")
- State: working / degraded / broken
- If broken: which line of the tool's `<script>` is responsible

## Failure taxonomy

Classify every failure into one of these, not "it doesn't work":

1. **Network dependency** — needs an external proxy, rate-limited, CORS blocked
2. **Logic bug** — wrong output from correct input
3. **Parse bug** — misreads valid input format
4. **UI bug** — handler wired wrong, double-firing, cleared state
5. **Limit** — hard cap reached (page counts, URL counts, sizes)

## Reporting format

| Tool | State | Category | Input | Output | Root cause | Fix |
|---|---|---|---|---|---|---|

Fix column states the change, not the symptom. "Handle proxy
failure as unknown" — not "make it work".

## Rules

- Do not claim a tool works because the code looks correct. Run it.
- Do not claim a tool is broken based on a single failure. Retry once
  after 30s. Rate limiting is not breakage.
- Do not infer browser behaviour from command-line requests.
- If a result cannot be reproduced, mark it **unconfirmed**, not broken.

## Group tools by network need

Sort by dependency type before testing — it finds bugs faster than
testing alphabetically.

| Group | Network need | Risk profile |
|---|---|---|
| A | none (pure client-side) | Should always work; failures are logic bugs |
| B | single fetch per action | Usually fine; failures are CORS or proxy |
| C | many fetches per action | Rate limiting; needs concurrency cap and retry |

Zero-network tools passing while heavy-network tools fail is a signal
about architecture, not about the tools individually.

## Test the batch path separately

A tool can pass with one URL and fail with twenty. Test both:

- single input (1 URL)
- batch input (20+ URLs)

Record them as separate rows. A tool that is working at 1 and broken at
20 is **degraded**, and the fix is a concurrency cap, not a rewrite.
