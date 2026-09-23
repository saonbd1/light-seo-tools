---
layout: default
title: Bing Image Grabber
description: Extract image URLs from pasted HTML.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Bing Image Grabber</h1><p class="hero-description">Collect every image source URL from a page's HTML, deduplicated.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">HTML</h2>
      <p class="section-desc">Paste the page source or a snippet containing <code>&lt;img&gt;</code> tags.</p>
      <textarea id="input" class="tool-input" rows="14" placeholder="&lt;img src=&quot;https://example.com/image.jpg&quot; alt=&quot;...&quot;&gt;"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Grab Images</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Image URLs</h2>
      <p class="section-desc">Unique image source URLs.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="total">0</strong> images</span></div>
      <div id="results" style="display:none;max-height:360px;overflow-y:auto;margin-bottom:12px;"></div>
      <textarea id="output" class="tool-input" rows="10" readonly placeholder="Copyable list will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<style>
.link-result { border:1px solid var(--line); border-radius:8px; padding:8px 12px; margin-bottom:8px; background:var(--bg); font-size:.85rem; }
.link-result .u { color:var(--muted); word-break:break-all; font-family:monospace; font-size:.78rem; }
</style>

<script>
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
document.getElementById('run').addEventListener('click', function () {
  const html = document.getElementById('input').value;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const imgs = Array.from(doc.querySelectorAll('img'));
  const srcs = [];
  imgs.forEach(function (img) {
    const src = img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-original') || '';
    if (src) srcs.push(src);
  });
  const unique = Array.from(new Set(srcs));

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = unique.map(function (s) { return '<div class="link-result"><div class="u">' + escapeHtml(s) + '</div></div>'; }).join('');
  resultsDiv.style.display = 'block';

  document.getElementById('output').value = unique.join('\n');
  document.getElementById('total').textContent = unique.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = unique.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('results').innerHTML = ''; document.getElementById('results').style.display = 'none'; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
