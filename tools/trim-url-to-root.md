---
layout: default
title: Trim URL to Root
description: Reduce a list of URLs to their root origin (scheme and host).
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Trim URL to Root</h1><p class="hero-description">Keep only the scheme and host of each URL, dropping paths and query strings.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Input URLs</h2>
      <p class="section-desc">Paste one URL per line. Invalid entries are skipped.</p>
      <textarea id="input" class="tool-input" rows="12" placeholder="https://example.com/one/two?x=1&#10;http://sub.example.org/page"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Trim to Root</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Roots</h2>
      <p class="section-desc">One root URL per line.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="in-count">0</strong> URLs</span><span class="meta-item"><strong id="out-count">0</strong> roots</span></div>
      <textarea id="output" class="tool-input" rows="12" readonly placeholder="Roots will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
function rootOf(u) {
  try { return new URL(u).origin; } catch (e) { return null; }
}
document.getElementById('run').addEventListener('click', function () {
  const lines = document.getElementById('input').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  const out = [];
  lines.forEach(function (l) { const r = rootOf(l); if (r) out.push(r); });
  document.getElementById('output').value = out.join('\n');
  document.getElementById('in-count').textContent = lines.length;
  document.getElementById('out-count').textContent = out.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = out.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
