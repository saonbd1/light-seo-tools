---
layout: default
title: Trim URL to Domain
description: Reduce a list of full URLs to just their domains.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Trim URL to Domain</h1><p class="hero-description">Strip paths, query strings, and the <code>www.</code> prefix to keep only the domain.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Input URLs</h2>
      <p class="section-desc">Paste one URL per line. Invalid entries are skipped.</p>
      <textarea id="input" class="tool-input" rows="12" placeholder="https://www.example.com/page?q=1&#10;https://blog.another-site.org/articles/42"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Trim to Domain</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Domains</h2>
      <p class="section-desc">One cleaned domain per line.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="in-count">0</strong> URLs</span><span class="meta-item"><strong id="out-count">0</strong> domains</span></div>
      <textarea id="output" class="tool-input" rows="12" readonly placeholder="Domains will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
function domainOf(u) {
  try { return new URL(u).hostname.replace(/^www\./i, ''); } catch (e) { return null; }
}
document.getElementById('run').addEventListener('click', function () {
  const lines = document.getElementById('input').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  const out = [];
  lines.forEach(function (l) { const d = domainOf(l); if (d) out.push(d); });
  document.getElementById('output').value = out.join('\n');
  document.getElementById('in-count').textContent = lines.length;
  document.getElementById('out-count').textContent = out.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = out.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
