---
layout: default
title: Extract URL Links
description: Extract all URLs from a block of text or HTML.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Extract URL Links</h1><p class="hero-description">Pull every <code>http(s)</code> URL out of pasted text or HTML, deduplicated.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Input</h2>
      <p class="section-desc">Paste any text, HTML, or mixed content.</p>
      <textarea id="input" class="tool-input" rows="14" placeholder="Check https://example.com and http://another.org/page plus https://example.com"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Extract URLs</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">URLs</h2>
      <p class="section-desc">Unique URLs found in the input.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="out-count">0</strong> URLs</span></div>
      <textarea id="output" class="tool-input" rows="14" readonly placeholder="Extracted URLs will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
document.getElementById('run').addEventListener('click', function () {
  const text = document.getElementById('input').value;
  const matches = text.match(/https?:\/\/[^\s"'<>]+/gi) || [];
  const cleaned = matches.map(function (m) { return m.replace(/[.,;:!?)]+$/, ''); });
  const unique = Array.from(new Set(cleaned));
  document.getElementById('output').value = unique.join('\n');
  document.getElementById('out-count').textContent = unique.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = unique.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
