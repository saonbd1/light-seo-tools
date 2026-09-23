---
layout: default
title: Bulk Anchor Text Creator
description: Generate HTML anchor tags from lists of URLs and anchor text.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Bulk Anchor Text Creator</h1><p class="hero-description">Turn lists of URLs and anchor text into ready-to-paste <code>&lt;a&gt;</code> tags.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Inputs</h2>
      <p class="section-desc">Paste URLs and anchor texts, one per line. Anchor texts cycle when there are more URLs.</p>
      <label class="field-label" for="urls">URLs</label>
      <textarea id="urls" class="tool-input" rows="7" placeholder="https://example.com&#10;https://example.com/page-2"></textarea>
      <label class="field-label" for="texts">Anchor texts</label>
      <textarea id="texts" class="tool-input" rows="5" placeholder="Example site&#10;Learn more"></textarea>
      <label class="field-label" style="display:flex;gap:8px;align-items:center;"><input type="checkbox" id="nofollow" style="width:auto;" /> Add rel=&quot;nofollow&quot;</label>
      <div class="tool-actions"><button id="run" class="btn-primary">Create Anchors</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">HTML</h2>
      <p class="section-desc">Copy the anchor tags into your page or editor.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="out-count">0</strong> anchors</span></div>
      <textarea id="output" class="tool-input" rows="16" readonly placeholder="Generated HTML will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
document.getElementById('run').addEventListener('click', function () {
  const urls = document.getElementById('urls').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  const texts = document.getElementById('texts').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  const nofollow = document.getElementById('nofollow').checked;
  const rel = nofollow ? ' rel="nofollow"' : '';
  const out = urls.map(function (u, i) {
    const t = texts.length ? texts[i % texts.length] : u;
    return '<a href="' + u + '"' + rel + '>' + t + '</a>';
  });
  document.getElementById('output').value = out.join('\n');
  document.getElementById('out-count').textContent = out.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = out.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('urls').value = ''; document.getElementById('texts').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
