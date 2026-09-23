---
layout: default
title: Merge Duplicate Links
description: Merge two URL lists and remove duplicates.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Merge Duplicate Links</h1><p class="hero-description">Combine two lists into one and strip out any repeated URLs.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Lists</h2>
      <p class="section-desc">Paste two lists, one URL per line. They will be merged and deduplicated.</p>
      <label class="field-label" for="list-a">List A</label>
      <textarea id="list-a" class="tool-input" rows="7" placeholder="https://example.com/a&#10;https://example.com/b"></textarea>
      <label class="field-label" for="list-b">List B</label>
      <textarea id="list-b" class="tool-input" rows="5" placeholder="https://example.com/b&#10;https://example.com/c"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Merge</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Merged</h2>
      <p class="section-desc">Combined unique list.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="total-count">0</strong> total</span><span class="meta-item"><strong id="out-count">0</strong> unique</span><span class="meta-item"><strong id="dupe-count">0</strong> duplicates</span></div>
      <textarea id="output" class="tool-input" rows="14" readonly placeholder="Merged results will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
document.getElementById('run').addEventListener('click', function () {
  const a = document.getElementById('list-a').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  const b = document.getElementById('list-b').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  const all = a.concat(b);
  const unique = Array.from(new Set(all));
  document.getElementById('output').value = unique.join('\n');
  document.getElementById('total-count').textContent = all.length;
  document.getElementById('out-count').textContent = unique.length;
  document.getElementById('dupe-count').textContent = all.length - unique.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = unique.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('list-a').value = ''; document.getElementById('list-b').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
