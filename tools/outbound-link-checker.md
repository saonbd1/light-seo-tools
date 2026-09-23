---
layout: default
title: Outbound Link Checker
description: Find external (outbound) links in pasted HTML.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Outbound Link Checker</h1><p class="hero-description">Separate internal and external links by comparing against a base domain.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Input</h2>
      <p class="section-desc">Paste a base domain and the page's HTML.</p>
      <label class="field-label" for="base">Base domain</label>
      <input id="base" class="tool-input" placeholder="https://example.com" />
      <label class="field-label" for="input">HTML</label>
      <textarea id="input" class="tool-input" rows="10" placeholder="&lt;a href=&quot;https://example.com/about&quot;&gt;Internal&lt;/a&gt;&#10;&lt;a href=&quot;https://other.com&quot;&gt;External&lt;/a&gt;"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Check Links</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Outbound Links</h2>
      <p class="section-desc">External links, then internal links.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="total">0</strong> links</span><span class="meta-item"><strong id="external">0</strong> external</span><span class="meta-item"><strong id="internal">0</strong> internal</span></div>
      <div id="results" style="display:none;max-height:360px;overflow-y:auto;margin-bottom:12px;"></div>
      <textarea id="output" class="tool-input" rows="10" readonly placeholder="Copyable list will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<style>
.link-result { border:1px solid var(--line); border-radius:8px; padding:8px 12px; margin-bottom:8px; background:var(--bg); font-size:.85rem; }
.link-result .u { color:var(--muted); word-break:break-all; font-family:monospace; font-size:.78rem; }
.badge { display:inline-block; padding:2px 8px; border-radius:999px; font-size:.7rem; font-weight:800; }
.badge.internal { background:var(--sky); color:var(--blue); }
.badge.external { background:var(--lavender); color:#604fc5; }
</style>

<script>
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
document.getElementById('run').addEventListener('click', function () {
  let baseHost = null;
  try { baseHost = new URL(document.getElementById('base').value.trim()).hostname; } catch (e) {}
  const html = document.getElementById('input').value;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const links = Array.from(doc.querySelectorAll('a'));
  const rows = links.map(function (a) {
    const href = a.getAttribute('href') || '';
    let type = 'empty';
    if (href && baseHost) {
      try { type = new URL(href, 'https://' + baseHost).hostname === baseHost ? 'internal' : 'external'; } catch (e) { type = 'invalid'; }
    }
    return { href: href, type: type };
  });
  const external = rows.filter(function (r) { return r.type === 'external'; });
  const internal = rows.filter(function (r) { return r.type === 'internal'; });

  const resultsDiv = document.getElementById('results');
  const card = function (r, label, cls) { return '<div class="link-result"><div class="u"><span class="badge ' + cls + '">' + label + '</span> ' + escapeHtml(r.href) + '</div></div>'; };
  resultsDiv.innerHTML = external.map(function (r) { return card(r, 'external', 'external'); }).join('') + internal.map(function (r) { return card(r, 'internal', 'internal'); }).join('');
  resultsDiv.style.display = 'block';

  document.getElementById('output').value = '# External\n' + external.map(function (r) { return r.href; }).join('\n') + '\n\n# Internal\n' + internal.map(function (r) { return r.href; }).join('\n');
  document.getElementById('total').textContent = rows.length;
  document.getElementById('external').textContent = external.length;
  document.getElementById('internal').textContent = internal.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = rows.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('base').value = ''; document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('results').innerHTML = ''; document.getElementById('results').style.display = 'none'; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
