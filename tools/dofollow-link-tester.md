---
layout: default
title: Dofollow Link Tester
description: Detect dofollow and nofollow links in pasted HTML.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Dofollow Link Tester</h1><p class="hero-description">Classify every link as dofollow or nofollow based on its <code>rel</code> attribute.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">HTML</h2>
      <p class="section-desc">Paste the page source or a snippet containing links.</p>
      <textarea id="input" class="tool-input" rows="14" placeholder="&lt;a href=&quot;https://example.com&quot;&gt;Dofollow&lt;/a&gt;&#10;&lt;a href=&quot;https://example.com&quot; rel=&quot;nofollow&quot;&gt;Nofollow&lt;/a&gt;"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Test Links</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Results</h2>
      <p class="section-desc">Dofollow and nofollow links.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="total">0</strong> links</span><span class="meta-item"><strong id="dofollow">0</strong> dofollow</span><span class="meta-item"><strong id="nofollow">0</strong> nofollow</span></div>
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
.badge.dofollow { background:#dcfce7; color:#166534; }
.badge.nofollow { background:#fee2e2; color:#991b1b; }
</style>

<script>
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
document.getElementById('run').addEventListener('click', function () {
  const html = document.getElementById('input').value;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const links = Array.from(doc.querySelectorAll('a'));
  const rows = links.map(function (a) {
    const href = a.getAttribute('href') || '';
    const nofollow = /nofollow/i.test(a.getAttribute('rel') || '');
    return { href: href, nofollow: nofollow };
  });
  const dofollowCount = rows.filter(function (r) { return !r.nofollow; }).length;
  const nofollowCount = rows.length - dofollowCount;

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = rows.map(function (r) {
    const badge = r.nofollow ? '<span class="badge nofollow">nofollow</span>' : '<span class="badge dofollow">dofollow</span>';
    return '<div class="link-result"><div class="u">' + badge + ' ' + escapeHtml(r.href) + '</div></div>';
  }).join('');
  resultsDiv.style.display = 'block';

  document.getElementById('output').value = rows.map(function (r) { return (r.nofollow ? 'nofollow' : 'dofollow') + '\t' + r.href; }).join('\n');
  document.getElementById('total').textContent = rows.length;
  document.getElementById('dofollow').textContent = dofollowCount;
  document.getElementById('nofollow').textContent = nofollowCount;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = rows.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('results').innerHTML = ''; document.getElementById('results').style.display = 'none'; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
