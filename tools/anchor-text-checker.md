---
layout: default
title: Anchor Text Checker
description: Extract anchor text and href values from pasted HTML.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Anchor Text Checker</h1><p class="hero-description">Parse a page's HTML and list every link with its anchor text and target URL.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">HTML</h2>
      <p class="section-desc">Paste the page source or a snippet containing links.</p>
      <textarea id="input" class="tool-input" rows="14" placeholder="&lt;a href=&quot;https://example.com&quot;&gt;Example&lt;/a&gt;"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Check Anchors</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Links</h2>
      <p class="section-desc">Anchor text with its target URL.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="total">0</strong> links</span><span class="meta-item"><strong id="empty">0</strong> empty text</span></div>
      <div id="results" style="display:none;max-height:360px;overflow-y:auto;margin-bottom:12px;"></div>
      <textarea id="output" class="tool-input" rows="10" readonly placeholder="Copyable list will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<style>
.link-result { border:1px solid var(--line); border-radius:8px; padding:8px 12px; margin-bottom:8px; background:var(--bg); font-size:.85rem; }
.link-result .t { font-weight:700; color:var(--ink); word-break:break-all; }
.link-result .u { color:var(--muted); word-break:break-all; font-family:monospace; font-size:.78rem; }
.badge { display:inline-block; padding:2px 8px; border-radius:999px; font-size:.7rem; font-weight:800; margin-left:6px; }
.badge.empty { background:#fee2e2; color:#991b1b; }
</style>

<script>
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
document.getElementById('run').addEventListener('click', function () {
  const html = document.getElementById('input').value;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const links = Array.from(doc.querySelectorAll('a'));
  const results = links.map(function (a) {
    const text = (a.textContent || '').trim();
    const href = a.getAttribute('href') || '';
    return { text: text, href: href };
  });
  const emptyCount = results.filter(function (r) { return !r.text; }).length;

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = results.map(function (r) {
    const badge = r.text ? '' : '<span class="badge empty">empty</span>';
    return '<div class="link-result"><div class="t">' + escapeHtml(r.text || '(no text)') + badge + '</div><div class="u">' + escapeHtml(r.href) + '</div></div>';
  }).join('');
  resultsDiv.style.display = 'block';

  document.getElementById('output').value = results.map(function (r) { return (r.text || '(no text)') + '\t' + r.href; }).join('\n');
  document.getElementById('total').textContent = results.length;
  document.getElementById('empty').textContent = emptyCount;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = results.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('results').innerHTML = ''; document.getElementById('results').style.display = 'none'; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
