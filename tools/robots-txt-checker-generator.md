---
layout: default
title: Robots.txt Checker & Generator
description: Inspect any site's robots.txt and generate your own crawler directives in seconds.
---

<div class="page-hero">
  <div class="shell">
    <span class="eyebrow">Free browser helper</span>
    <h1>Robots.txt Checker &amp; Generator</h1>
    <p class="hero-description">Fetch and analyze any site's robots.txt file, or build your own crawler rules with a simple generator.</p>
  </div>
</div>

<div class="shell">
  <div class="content">

    <div class="section-heading">
      <div>
        <span class="eyebrow">Checker</span>
        <h2>Inspect a robots.txt</h2>
      </div>
      <p>Enter a domain or URL. The tool fetches its robots.txt and summarizes the directives.</p>
    </div>

    <div class="tool-section">
      <div class="tool-panel">
        <h2 class="section-title">Site</h2>
        <p class="section-desc">Enter a full URL or a bare domain, e.g. <code>https://example.com</code>.</p>
        <label class="field-label" for="check-input">Domain or URL</label>
        <input id="check-input" class="tool-input" placeholder="https://example.com" />
        <div class="tool-actions">
          <button id="check-btn" class="btn-primary">Check robots.txt</button>
          <button id="check-clear" class="btn-secondary">Clear</button>
        </div>
        <p id="check-status" class="status-text" style="display:none;"></p>
      </div>

      <div class="tool-panel">
        <h2 class="section-title">Results</h2>
        <p class="section-desc">Raw file plus a parsed summary of rules and potential issues.</p>
        <div class="result-meta" id="check-meta" style="display:none;">
          <span class="meta-item"><strong id="meta-status">-</strong> status</span>
          <span class="meta-item"><strong id="meta-agents">0</strong> user-agents</span>
          <span class="meta-item"><strong id="meta-disallow">0</strong> disallow rules</span>
          <span class="meta-item"><strong id="meta-allow">0</strong> allow rules</span>
          <span class="meta-item"><strong id="meta-sitemaps">0</strong> sitemaps</span>
        </div>
        <div id="check-summary" style="display:none;"></div>
        <textarea id="check-output" class="tool-input" rows="10" readonly placeholder="Fetched robots.txt content will appear here"></textarea>
        <div class="tool-actions">
          <button id="check-copy" class="btn-secondary" style="display:none;">Copy Content</button>
        </div>
      </div>
    </div>

    <div class="tool-callout">
      <strong>Fetching note:</strong> The checker reads a remote robots.txt from your browser. If a site blocks cross-origin requests, the tool falls back to a public proxy; if that is unavailable the fetch will report an error. For offline or large-scale checks, <a href="{{ site.baseurl }}/request.html">request a Scrapebox report</a>.
    </div>

    <div class="section-heading" style="margin-top:60px">
      <div>
        <span class="eyebrow">Generator</span>
        <h2>Build your own robots.txt</h2>
      </div>
      <p>Fill in the rules and copy or download the result.</p>
    </div>

    <div class="tool-section">
      <div class="tool-panel">
        <h2 class="section-title">Rules</h2>
        <p class="section-desc">Leave fields empty to omit them from the output.</p>

        <label class="field-label" for="gen-agent">User-agent</label>
        <input id="gen-agent" class="tool-input" value="*" placeholder="*" />

        <label class="field-label" for="gen-disallow">Disallow (one path per line)</label>
        <textarea id="gen-disallow" class="tool-input" rows="4" placeholder="/private/&#10;/admin/"></textarea>

        <label class="field-label" for="gen-allow">Allow (one path per line)</label>
        <textarea id="gen-allow" class="tool-input" rows="3" placeholder="/private/public/"></textarea>

        <label class="field-label" for="gen-delay">Crawl-delay (seconds)</label>
        <input id="gen-delay" class="tool-input" type="number" min="0" step="1" placeholder="e.g. 10" />

        <label class="field-label" for="gen-host">Host</label>
        <input id="gen-host" class="tool-input" placeholder="example.com" />

        <label class="field-label" for="gen-sitemap">Sitemap URL</label>
        <input id="gen-sitemap" class="tool-input" placeholder="https://example.com/sitemap.xml" />

        <div class="tool-actions">
          <button id="gen-btn" class="btn-primary">Generate robots.txt</button>
          <button id="gen-clear" class="btn-secondary">Clear</button>
        </div>
      </div>

      <div class="tool-panel">
        <h2 class="section-title">Output</h2>
        <p class="section-desc">Your generated robots.txt file.</p>
        <textarea id="gen-output" class="tool-input" rows="16" readonly placeholder="Generated robots.txt will appear here"></textarea>
        <div class="tool-actions">
          <button id="gen-copy" class="btn-secondary" style="display:none;">Copy</button>
          <button id="gen-download" class="btn-secondary" style="display:none;">Download</button>
        </div>
      </div>
    </div>

  </div>
</div>

<style>
#check-summary .summary-block {
  margin-bottom: 14px;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--bg);
}
#check-summary .summary-block h4 {
  margin: 0 0 6px;
  font-size: 0.82rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--muted);
}
#check-summary .summary-block ul {
  margin: 0;
  padding-left: 18px;
}
#check-summary .summary-block li {
  font-size: 0.86rem;
  color: var(--ink);
  word-break: break-all;
}
#check-summary .issue {
  font-size: 0.86rem;
  padding: 7px 10px;
  border-radius: 7px;
  margin-bottom: 6px;
}
#check-summary .issue.warn { background: #fff7e6; color: #92400e; }
#check-summary .issue.info { background: var(--sky); color: var(--ink); }
</style>

<script>
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ---------- Checker ----------
function normalizeRobotsUrl(input) {
  let raw = (input || '').trim();
  if (!raw) return null;
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;
  let u;
  try { u = new URL(raw); } catch (e) { return null; }
  u.pathname = '/robots.txt';
  u.search = '';
  u.hash = '';
  return u.toString();
}

async function fetchRobotsText(url) {
  let lastErr = null;
  try {
    const r = await fetch(url, { redirect: 'follow' });
    if (r.ok) return await r.text();
    lastErr = new Error('HTTP ' + r.status);
  } catch (e) { lastErr = e; }

  const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
  const r = await fetch(proxy);
  if (!r.ok) throw new Error('HTTP ' + r.status + ' (via proxy)');
  return await r.text();
}

function parseRobots(text) {
  const agents = new Set();
  const disallow = [];
  const allow = [];
  const sitemaps = [];
  const crawlDelays = [];
  const hosts = [];

  const lines = text.split(/\r?\n/);
  let currentAgents = [];
  for (let line of lines) {
    const hashIdx = line.indexOf('#');
    if (hashIdx !== -1) line = line.slice(0, hashIdx);
    line = line.trim();
    if (!line) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const field = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (!value) continue;

    if (field === 'user-agent') {
      currentAgents = [value];
      agents.add(value);
    } else if (field === 'disallow') {
      disallow.push({ agents: currentAgents.slice(), path: value });
    } else if (field === 'allow') {
      allow.push({ agents: currentAgents.slice(), path: value });
    } else if (field === 'sitemap') {
      sitemaps.push(value);
    } else if (field === 'crawl-delay') {
      crawlDelays.push(value);
    } else if (field === 'host') {
      hosts.push(value);
    }
  }

  const issues = [];
  if (agents.size === 0) issues.push({ type: 'warn', text: 'No User-agent directive found.' });
  if (sitemaps.length === 0) issues.push({ type: 'warn', text: 'No Sitemap directive found. Consider adding one to help discovery.' });
  if (disallow.length === 0) issues.push({ type: 'info', text: 'No Disallow rules found — the site is open to crawling.' });
  const blocksAll = disallow.some(d => d.path === '/' && d.agents.includes('*'));
  if (blocksAll) issues.push({ type: 'warn', text: 'Disallow: / blocks all crawlers matching "*".' });

  return { agents, disallow, allow, sitemaps, crawlDelays, hosts, issues };
}

document.getElementById('check-btn').addEventListener('click', async function () {
  const input = document.getElementById('check-input').value;
  const statusEl = document.getElementById('check-status');
  const output = document.getElementById('check-output');
  const summary = document.getElementById('check-summary');
  const meta = document.getElementById('check-meta');
  const copyBtn = document.getElementById('check-copy');

  const url = normalizeRobotsUrl(input);
  if (!url) {
    statusEl.textContent = 'Please enter a valid domain or URL.';
    statusEl.style.display = 'block';
    return;
  }

  const btn = this;
  btn.disabled = true;
  statusEl.textContent = 'Fetching ' + url + ' ...';
  statusEl.style.display = 'block';
  output.value = '';
  summary.innerHTML = '';
  summary.style.display = 'none';
  meta.style.display = 'none';
  copyBtn.style.display = 'none';

  try {
    const text = await fetchRobotsText(url);
    output.value = text;

    const parsed = parseRobots(text);
    document.getElementById('meta-status').textContent = 'OK';
    document.getElementById('meta-agents').textContent = parsed.agents.size;
    document.getElementById('meta-disallow').textContent = parsed.disallow.length;
    document.getElementById('meta-allow').textContent = parsed.allow.length;
    document.getElementById('meta-sitemaps').textContent = parsed.sitemaps.length;
    meta.style.display = 'flex';

    let html = '';
    if (parsed.agents.size) {
      html += '<div class="summary-block"><h4>User-agents</h4><ul>' + [...parsed.agents].map(a => '<li>' + escapeHtml(a) + '</li>').join('') + '</ul></div>';
    }
    if (parsed.disallow.length) {
      html += '<div class="summary-block"><h4>Disallow rules</h4><ul>' + parsed.disallow.map(d => '<li>' + escapeHtml(d.path) + '</li>').join('') + '</ul></div>';
    }
    if (parsed.allow.length) {
      html += '<div class="summary-block"><h4>Allow rules</h4><ul>' + parsed.allow.map(d => '<li>' + escapeHtml(d.path) + '</li>').join('') + '</ul></div>';
    }
    if (parsed.sitemaps.length) {
      html += '<div class="summary-block"><h4>Sitemaps</h4><ul>' + parsed.sitemaps.map(s => '<li>' + escapeHtml(s) + '</li>').join('') + '</ul></div>';
    }
    if (parsed.crawlDelays.length) {
      html += '<div class="summary-block"><h4>Crawl-delay</h4><ul>' + parsed.crawlDelays.map(c => '<li>' + escapeHtml(c) + 's</li>').join('') + '</ul></div>';
    }
    if (parsed.issues.length) {
      html += '<div class="summary-block"><h4>Notes</h4>' + parsed.issues.map(i => '<div class="issue ' + i.type + '">' + escapeHtml(i.text) + '</div>').join('') + '</div>';
    }
    summary.innerHTML = html;
    summary.style.display = 'block';
    copyBtn.style.display = 'block';

    statusEl.textContent = 'Fetched ' + url;
  } catch (err) {
    statusEl.textContent = 'Error: ' + (err.message || 'Unable to fetch robots.txt');
    document.getElementById('meta-status').textContent = 'Error';
    document.getElementById('meta-agents').textContent = '0';
    document.getElementById('meta-disallow').textContent = '0';
    document.getElementById('meta-allow').textContent = '0';
    document.getElementById('meta-sitemaps').textContent = '0';
    meta.style.display = 'flex';
  } finally {
    btn.disabled = false;
  }
});

document.getElementById('check-clear').addEventListener('click', function () {
  document.getElementById('check-input').value = '';
  document.getElementById('check-output').value = '';
  document.getElementById('check-summary').innerHTML = '';
  document.getElementById('check-summary').style.display = 'none';
  document.getElementById('check-meta').style.display = 'none';
  document.getElementById('check-status').style.display = 'none';
  document.getElementById('check-copy').style.display = 'none';
});

document.getElementById('check-copy').addEventListener('click', function () {
  const el = document.getElementById('check-output');
  el.select();
  document.execCommand('copy');
  const btn = this;
  const orig = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => { btn.textContent = orig; }, 2000);
});

// ---------- Generator ----------
function generateRobotsText() {
  const agent = document.getElementById('gen-agent').value.trim() || '*';
  const disallow = document.getElementById('gen-disallow').value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const allow = document.getElementById('gen-allow').value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const delay = document.getElementById('gen-delay').value.trim();
  const host = document.getElementById('gen-host').value.trim();
  const sitemap = document.getElementById('gen-sitemap').value.trim();

  const lines = [];
  lines.push('User-agent: ' + agent);
  disallow.forEach(d => lines.push('Disallow: ' + d));
  allow.forEach(a => lines.push('Allow: ' + a));
  if (delay) lines.push('Crawl-delay: ' + delay);
  if (host) lines.push('Host: ' + host);
  if (sitemap) lines.push('Sitemap: ' + sitemap);
  return lines.join('\n');
}

document.getElementById('gen-btn').addEventListener('click', function () {
  const out = document.getElementById('gen-output');
  out.value = generateRobotsText();
  document.getElementById('gen-copy').style.display = 'block';
  document.getElementById('gen-download').style.display = 'block';
});

document.getElementById('gen-clear').addEventListener('click', function () {
  document.getElementById('gen-agent').value = '*';
  document.getElementById('gen-disallow').value = '';
  document.getElementById('gen-allow').value = '';
  document.getElementById('gen-delay').value = '';
  document.getElementById('gen-host').value = '';
  document.getElementById('gen-sitemap').value = '';
  document.getElementById('gen-output').value = '';
  document.getElementById('gen-copy').style.display = 'none';
  document.getElementById('gen-download').style.display = 'none';
});

document.getElementById('gen-copy').addEventListener('click', function () {
  const el = document.getElementById('gen-output');
  el.select();
  document.execCommand('copy');
  const btn = this;
  const orig = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => { btn.textContent = orig; }, 2000);
});

document.getElementById('gen-download').addEventListener('click', function () {
  const text = document.getElementById('gen-output').value;
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
});
</script>
