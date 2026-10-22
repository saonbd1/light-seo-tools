# Tool Audit Report — Static Analysis

> Method: static analysis of every `tools/*.md` script block, plus targeted
> runtime tests where a claim could be isolated (robots parser, proxy
> endpoints). Static findings are marked **confirmed** only when proven by
> execution; everything else is **code-level** and needs browser confirmation.
>
> Author: OpenClaw agent. Date: 2026-10-22.
> Cross-check target: user's own manual browser audit.

## Summary

41 tools audited (excluding `tools-overview.md` and `tools/README.md`).

| Class | Count | Notes |
|---|---|---|
| **Stub** — no JavaScript at all | **14** | Look interactive, do nothing |
| **Client-side** — real logic, no network | **15** | Should work; failures are logic bugs |
| **Single-fetch** — one request per action | **10** | Mostly work; CORS/proxy risk |
| **Multi-fetch** — many requests per action | **2** | Rate-limit risk |

**The headline finding is not a broken proxy. It is that 14 tools contain no
script whatsoever.** They render an input field and a button that is never
wired to anything. A user typing a domain and clicking gets silence — which
reads as "broken," but no amount of proxy fixing will help.

## Class 1 — Stubs (14 tools, no JavaScript)

These files contain zero `<script>` content, zero event handlers, and zero
logic. They cannot work in any browser.

| Tool | Has input field |
|---|---|
| `alexa-rank-checker` | yes |
| `bing-index-checker` | yes |
| `bing-serp-scraper` | no |
| `bulk-nameserver-extractor` | yes |
| `check-unregistered-domain` | yes |
| `domain-resolver-tool` | yes |
| `duplicate-url-report` | no |
| `google-index-checker` | yes |
| `mass-url-shortener` | yes |
| `meta-tag-scraper` | no |
| `social-account-scraper` | yes |
| `tdname-scrapper` | yes |
| `vanity-name-checker` | yes |
| `whois-scraper` | yes |

Note `meta-tag-scraper` and `duplicate-url-report` and `bing-serp-scraper`
have no input field either — they are pure marketing pages.

**Recommendation:** these need a deliberate decision per tool:
implement client-side, implement server-side via Supabase, or hide the
tool card so it is not advertised as available. A stub advertised as a
free tool is a trust problem, not just a bug.

## Class 2 — Client-side (15 tools, no network)

Real logic, self-contained. These should all work, and the user's tests
confirm several of them do.

| Tool | JS bytes | Handlers |
|---|---|---|
| `bulk-anchor-text-creator` | 1472 | 3 |
| `duplicate-url-finder` | 1432 | 3 |
| `email-generator` | 1442 | 3 |
| `extract-url-links` | 1161 | 3 |
| `legal-page-generator` | 7634 | 7 |
| `merge-duplicate-links` | 1422 | 3 |
| `meta-tag-generator` | 308 | 1 |
| `name-generator` | 1322 | 3 |
| `ocr-image-to-text` | 13773 | 13 |
| `remove-duplicate-entries` | 1405 | 3 |
| `sort-text-files` | 1424 | 3 |
| `split-text-file` | 1399 | 3 |
| `trim-url-to-domain` | 1302 | 3 |
| `trim-url-to-first-folder` | 1389 | 3 |
| `trim-url-to-root` | 1273 | 3 |

User-confirmed working: `bulk-anchor-text-creator`, `legal-page-generator`
(and its privacy/terms variants).

Lowest risk group. `meta-tag-generator` at 308 bytes is thin — worth a look.

## Class 3 — Single-fetch (10 tools)

Each uses `https://api.allorigins.win/raw?url=...` with a direct-fetch
first attempt:

| Tool | Fetches | try/catch |
|---|---|---|
| `anchor-text-checker` | 2 | 3/3 |
| `article-scraper` | 2 | 3/3 |
| `bandwidth-meter` | 2 | 3/3 |
| `bing-image-grabber` | 2 | 3/3 |
| `bing-meta-scraper` | 2 | 3/3 |
| `dofollow-link-tester` | 2 | 3/3 |
| `link-extractor` | 2 | 6/5 |
| `outbound-link-checker` | 2 | 5/5 |
| `robots-txt-checker-generator` | 2 | 3/3 |
| `sitemap-scraper` | 2 | 3/3 |

All ten share an identical `fetchHtml` shape: try direct, fall back to
proxy. Error handling is present in all of them.

User-confirmed working: `link-extractor`, `sitemap-scraper`.

## Class 4 — Multi-fetch (2 tools)

### `alive-url-checker` — **confirmed defect**

```js
if (!r.ok) return { alive: false, code: r.status };
const code = (data.status && data.status.http_code) || 0;
} catch (e) { return { alive: false, code: 0 }; }
```

Three paths map *failure* to *"the site is dead"*:

1. `code: r.status` reports the **proxy's** status (502/520/522) as if it
   were the target's
2. `|| 0` turns a malformed response into `0`, and `0 >= 200` is false
3. `catch → alive: false` labels every timeout, CORS error, and network
   blip as a dead link

It also loops URLs **serially with no delay and no retry**. A burst test
returned `522, 502, 502, 000, 522, 520, 000, 000, 522` — nine consecutive
failures. Every one of those would be reported to the user as "dead."

This is the only tool in the repo that uses `/get` rather than `/raw`, and
the only one with two-state error handling. It is the only tool the user
reported as uniformly failing. **Cause and symptom match.**

**Fix:** three-state result (`alive` / `dead` / `unknown`), concurrency cap,
per-URL timeout, retry once. Better: move to a Supabase edge function like
`redirect-checker`, which already works correctly.

### `robots-txt-checker-generator` — **confirmed parse bug**

```js
if (field === 'user-agent') { currentAgents = [value]; agents.add(value); }
```

`currentAgents = [value]` **overwrites** rather than appends. Proven by
running the extracted `parseRobots` under node:

```
input:  User-agent: Googlebot
        User-agent: Bingbot
        Disallow: /private

output: disallow entries: [{"agents":["Bingbot"],"path":"/private"}]
```

Googlebot's rule is silently lost. The `agents` set still lists all three,
so the summary *looks* complete while the rules are wrong. Silent
misattribution is worse than a crash.

**Fix:** `currentAgents.push(value)` with a reset on the next block.
The generator half is unaffected and works offline.

## Repo-wide defects

### Duplicate click listeners (6 tools)

`#clear` has two `click` handlers in `anchor-text-checker`,
`article-scraper`, `bing-image-grabber`, `bing-meta-scraper`,
`dofollow-link-tester`, `outbound-link-checker`. Both fire; the second also
wipes `url-input`. Cosmetic but confusing — a clear action that clears more
than it appears to.

### `redirect-checker` placeholder credential

```js
Authorization: 'Bearer ***'
```

A literal redacted string is committed to the repo. It works **only**
because the Supabase function has JWT verification disabled. Anyone reading
the source sees a redaction that is not a real secret, and the function is
effectively unauthenticated. Either remove the header or supply a real
publishable key.

### `outbound-link-checker` count mismatch

`total` counts all `<a>` rows, while `internal` and `external` exclude
empty and invalid hrefs. So `total ≠ internal + external` whenever a page
has anchors without hrefs. Users comparing the numbers will think the tool
lost links.

### `link-extractor` crawl cap

`PAGE_LIMIT = 150` silently truncates depth-3 crawls. Not a bug, but it
should be surfaced in the status line — currently the crawl just stops and
looks complete.

## Corrections to my earlier claims

Recorded so the same reasoning error is not repeated:

| Claim I made | Verdict |
|---|---|
| "api.allorigins.win is dead" | **Wrong.** `/get` returns 200 with valid `http_code`. |
| "Origin header is the differentiator" | **Wrong.** Did not reproduce. |
| "Link extractor is broken" | **Wrong.** User confirms it works. |
| "Robots checker is broken" | **Wrong about fetch.** Parser bug stands. |
| "Not your network" | **Unproven.** I never had a valid sample. |

Root cause of the error: I used `curl` from this VM as a proxy for browser
behaviour. It is not one. `curl` cannot reproduce CORS, browser throttling,
or real proxy behaviour, and my probing likely rate-limited my own IP.
**Command-line results are not evidence for this class of tool.**

## What needs browser confirmation

Everything in Classes 3 and 4 except the two proven bugs. Specifically:

- `outbound-link-checker` — paste-HTML path vs fetch-URL path
- `anchor-text-checker`, `article-scraper`, `bing-meta-scraper`,
  `bing-image-grabber`, `dofollow-link-tester`, `bandwidth-meter`
- batch behaviour of every tool, at 1 URL and at 20 URLs

## Suggested order of work

1. **Decide the 14 stubs** — implement, hide, or mark. Highest impact.
2. **Fix `alive-url-checker`** — it is actively returning false data.
3. **Fix robots parser** — one-line change, silent data corruption.
4. **Fix `outbound-link-checker` count and duplicate listener.**
5. **Resolve the `Bearer ***` placeholder** in `redirect-checker`.
6. **Consider a Supabase `fetch-page` function** to replace the proxy for
   all multi-fetch tools. Not urgent — most single-fetch tools work — but
   it removes the rate-limit ceiling permanently.

---

# Round 2 — Fixes applied and verified

Browser testing was done through the operator's real Windows Chrome via CDP
(see "Browser setup" below). This matters: `curl` from WSL was never valid
evidence, and the earlier proxy conclusions were wrong because of it.

## Environment finding: the shared CORS proxy is down

Measured from the operator's own browser and network:

| Target | Result |
|---|---|
| `httpbin.org/get` (control) | 200 in 995ms |
| `api.allorigins.win/raw` | hung, aborted at 10s |
| `api.allorigins.win/get` | hung, aborted at 10s |

TCP 443 connects; no HTTP response. A third-party egress returns `522`, so
Cloudflare cannot reach the proxy origin. **The proxy is down, not the user's
network and not rate limiting.**

Consequence: every proxy-dependent tool fails right now regardless of code
quality. The client-side fixes below are therefore tested in isolation, not
end-to-end through the dead proxy.

## Fixes applied

### 1. `alive-url-checker` — false "dead" reports (**fixed**)

Was: three paths mapped failure to "dead" (`code: r.status`, `|| 0`, `catch`),
serial loop with no delay and no retry.

Now: three states, 15s per-request abort, one retry, 250ms gap between targets.
Proxy status is reported as `unknown`, never as a dead link.

Verified against five stubbed responses:

```
alive 200    -> state=alive   code=200
dead 404     -> state=dead    code=404
proxy 522    -> state=unknown code=522
no status    -> state=unknown code=0
throws       -> state=unknown code=0
```

### 2. `robots-txt-checker-generator` — multi-agent rules lost (**fixed**)

Was: `currentAgents = [value]` overwrote the group on every `User-agent` line,
so a shared block attributed its rules to the last agent only.

Now: appends within a group, resets when a directive line intervenes.

Verified:

```
agents: Googlebot,Bingbot,*
rules:  [{"agents":["Googlebot","Bingbot"],"path":"/private"},
         {"agents":["*"],"path":"/"}]
```

Both `Googlebot` and `Bingbot` now receive `/private`.

### 3. `outbound-link-checker` — pseudo-links in export (**fixed**)

Was: `javascript:void(0)` and friends classified `external`, because
`new URL(...).hostname` is empty and therefore "not the base host". Also
`total` counted every anchor, so `total ≠ internal + external`.

Now: non-navigational schemes (`javascript:`, `mailto:`, `tel:`, `sms:`,
`data:`, `blob:`, `#`) are classified `skip`; `total` equals
`internal + external`.

Verified across 8 cases — all pass, including `javascript:void(0)` → `skip`.

### 4. `dofollow-link-tester` — sponsored/ugc misreported (**fixed**)

Was: only `rel="nofollow"` counted. `rel="sponsored"` and `rel="ugc"` were
reported as **dofollow**, which is wrong for a link audit — Google treats both
as non-endorsed.

Now: `/(?:nofollow|sponsored|ugc)/i`.

Verified across 7 `rel` values — all pass.

## Tested and found working

| Tool | Evidence |
|---|---|
| `article-scraper` | Pasted HTML with nav/header/aside/footer/script: output was article text only, 17 words / 116 chars |
| `bandwidth-meter` | `httpbin.org/html` → 3.65 KB (3741 bytes), correct |
| `dofollow-link-tester` | Classification correct apart from the fixed `sponsored`/`ugc` gap |

## Known limitations left in place

- **`article-scraper` loses paragraph breaks.** `DOMParser` documents are not
  laid out, so `innerText` degrades to `textContent` and blocks concatenate
  (`Real HeadlineThis is the actual...`). Fixing this properly needs block-level
  traversal. Left as a known limitation.
- **`bandwidth-meter` measures decoded text, not transfer size.** It reports
  uncompressed bytes and cannot measure images or other binary responses.
- **`bandwidth-meter` depends on CORS or the dead proxy** for arbitrary sites.
- **14 stub pages** contain no JavaScript at all. They are absent from
  `README.md` and from `sitemap.xml`, so they are unlisted orphans rather than
  advertised-and-broken. Deciding each one (implement, hide, or delete) is a
  product decision, not a code fix. Left untouched.

## Browser setup (operator machine)

Needed because no Linux browser exists in WSL, all GTK/NSS libraries are
missing, and `sudo` requires a password.

1. Chrome launched on Windows with `--remote-debugging-port=9222`
2. Windows `portproxy 0.0.0.0:9222 -> 127.0.0.1:9222` plus firewall rule
   (`C:\Users\saonb\cdp-bridge.ps1`), both persistent
3. `openclaw-cdp-forward.service` forwards `127.0.0.1:18800 -> Windows:9222`,
   resolving the WSL gateway from `/proc/net/route` at startup

Chrome binds CDP to loopback only, so the portproxy is what makes WSL reach it.
The bridge requires Chrome to be running on Windows; it does not launch it.

## Verification method

- `node --check` on all four patched script blocks — syntax OK
- Extracted `parseRobots`, `checkAlive`, and both classification predicates and
  exercised them directly with stubbed inputs
- Earlier live-page runs in the operator's browser captured the real failures
