---
layout: default
title: Bing Meta Scraper
description: Extract meta tags and page title from pasted HTML.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Bing Meta Scraper</h1><p class="hero-description">Pull the title and all meta tags from a page's HTML source.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">HTML</h2>
      <p class="section-desc">Paste the page source, especially the <code>&lt;head&gt;</code> section.</p>
      <label class="field-label" for="url-input">Or fetch source from a URL</label>
      <div class="tool-actions" style="margin-top:0;margin-bottom:14px;">
        <input id="url-input" class="tool-input" placeholder="https://example.com" style="flex:1;min-width:0;" />
        <button id="fetch-btn" class="btn-secondary">Fetch Source</button>
      </div>
      <p id="status" class="status-text" style="display:none;margin:0 0 10px;"></p>
      <textarea id="input" class="tool-input" rows="14" placeholder="&lt;head&gt;&lt;title&gt;Page&lt;/title&gt;&lt;meta name=&quot;description&quot; content=&quot;...&quot;&gt;&lt;/head&gt;"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Scrape Meta Tags</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Meta Tags</h2>
      <p class="section-desc">Title plus name/property and content pairs.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="total">0</strong> tags</span></div>
      <div id="results" style="display:none;max-height:360px;overflow-y:auto;margin-bottom:12px;"></div>
      <textarea id="output" class="tool-input" rows="10" readonly placeholder="Copyable list will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<style>
.link-result { border:1px solid var(--line); border-radius:8px; padding:8px 12px; margin-bottom:8px; background:var(--bg); font-size:.85rem; }
.link-result .t { font-weight:700; color:var(--ink); word-break:break-all; }
.link-result .u { color:var(--muted); word-break:break-all; font-size:.78rem; }
</style>

<script>
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
document.getElementById('run').addEventListener('click', function () {
  const html = document.getElementById('input').value;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const title = doc.querySelector('title');
  const metas = Array.from(doc.querySelectorAll('meta'));
  const rows = [];
  if (title) rows.push({ name: 'title', value: (title.textContent || '').trim() });
  metas.forEach(function (m) {
    const name = m.getAttribute('name') || m.getAttribute('property') || m.getAttribute('http-equiv') || m.getAttribute('charset') || '';
    const content = m.getAttribute('content') || '';
    if (name) rows.push({ name: name, value: content });
  });

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = rows.map(function (r) {
    return '<div class="link-result"><div class="t">' + escapeHtml(r.name) + '</div><div class="u">' + escapeHtml(r.value) + '</div></div>';
  }).join('');
  resultsDiv.style.display = 'block';

  document.getElementById('output').value = rows.map(function (r) { return r.name + ': ' + r.value; }).join('\n');
  document.getElementById('total').textContent = rows.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = rows.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('results').innerHTML = ''; document.getElementById('results').style.display = 'none'; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
async function fetchHtml(url) {
  try { const r = await fetch(url); if (r.ok) return await r.text(); } catch (e) {}
  const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
  const r = await fetch(proxy);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return await r.text();
}
async function fetchAndRun() {
  const status = document.getElementById('status');
  const btn = document.getElementById('fetch-btn');
  let url = document.getElementById('url-input').value.trim();
  if (!url) { status.textContent = 'Please enter a URL.'; status.style.display = 'block'; return; }
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  try { new URL(url); } catch (e) { status.textContent = 'Please enter a valid URL.'; status.style.display = 'block'; return; }
  btn.disabled = true;
  status.textContent = 'Fetching source...';
  status.style.display = 'block';
  try {
    const html = await fetchHtml(url);
    document.getElementById('input').value = html;
    status.textContent = 'Fetched ' + html.length + ' characters.';
    document.getElementById('run').click();
  } catch (e) {
    status.textContent = 'Error: ' + (e.message || 'Unable to fetch');
  } finally {
    btn.disabled = false;
  }
}
document.getElementById('fetch-btn').addEventListener('click', fetchAndRun);
document.getElementById('clear').addEventListener('click', function () {
  document.getElementById('url-input').value = '';
  const s = document.getElementById('status'); s.textContent = ''; s.style.display = 'none';
});
</script>
