---
layout: default
title: Remove Duplicate Entries
description: Remove duplicate lines from any text list in your browser.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Remove Duplicate Entries</h1><p class="hero-description">Clean repeated lines from any list, with an optional case-insensitive mode.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Input</h2>
      <p class="section-desc">Paste one entry per line.</p>
      <textarea id="input" class="tool-input" rows="14" placeholder="apple&#10;Banana&#10;apple&#10;cherry"></textarea>
      <label class="field-label" style="display:flex;gap:8px;align-items:center;"><input type="checkbox" id="ci" style="width:auto;" /> Case-insensitive (Apple = apple)</label>
      <div class="tool-actions"><button id="run" class="btn-primary">Remove Duplicates</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Unique Entries</h2>
      <p class="section-desc">Deduplicated list.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="in-count">0</strong> submitted</span><span class="meta-item"><strong id="out-count">0</strong> unique</span><span class="meta-item"><strong id="dupe-count">0</strong> removed</span></div>
      <textarea id="output" class="tool-input" rows="14" readonly placeholder="Results will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
document.getElementById('run').addEventListener('click', function () {
  const ci = document.getElementById('ci').checked;
  const lines = document.getElementById('input').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  const seen = new Set();
  const out = [];
  lines.forEach(function (l) {
    const key = ci ? l.toLowerCase() : l;
    if (!seen.has(key)) { seen.add(key); out.push(l); }
  });
  document.getElementById('output').value = out.join('\n');
  document.getElementById('in-count').textContent = lines.length;
  document.getElementById('out-count').textContent = out.length;
  document.getElementById('dupe-count').textContent = lines.length - out.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = out.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
