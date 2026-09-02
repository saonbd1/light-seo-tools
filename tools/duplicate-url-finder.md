---
layout: default
title: Duplicate URL Finder
---

<div class="page-hero">
  <div class="shell">
    <h1>Duplicate URL Finder</h1>
    <p class="hero-description">Remove duplicate URLs from a list instantly in your browser. Copy, paste, and process—no uploads required.</p>
  </div>
</div>

<div class="shell">
    <div class="content">
      <div class="tool-section">
        <div class="tool-panel">
          <h2 class="section-title">Input URLs</h2>
          <p class="section-desc">Paste one URL per line. The tool removes exact duplicates and cleans whitespace.</p>
          <textarea id="input" class="tool-input" rows="12" placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page1"></textarea>
          <div class="tool-actions">
            <button id="remove" class="btn-primary">Remove Duplicates</button>
            <button id="clear" class="btn-secondary">Clear</button>
          </div>
        </div>

        <div class="tool-panel">
          <h2 class="section-title">Cleaned Results</h2>
          <p class="section-desc">Unique URLs after deduplication. Copy and use directly.</p>
          <div class="result-meta" id="meta" style="display:none;">
            <span class="meta-item"><strong id="input-count">0</strong> URLs submitted</span>
            <span class="meta-item"><strong id="output-count">0</strong> unique URLs</span>
            <span class="meta-item"><strong id="dupe-count">0</strong> duplicates removed</span>
          </div>
          <textarea id="output" class="tool-input" rows="12" readonly placeholder="Results will appear here"></textarea>
          <button id="copy" class="btn-secondary" style="display:none;">Copy Results</button>
        </div>
      </div>

      <div class="tool-callout">
        <strong>For large-scale deduplication</strong> or cross-source duplicate detection, <a href="{{ site.baseurl }}/request.html">request a Scrapebox report</a> for processing lists up to hundreds of thousands of URLs with advanced filtering options.
      </div>
    </div>
</div>

<script>
document.getElementById('remove').addEventListener('click', function(){
  const input = document.getElementById('input').value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  const seen = new Set();
  const out = [];
  for(const u of input){
    if(!seen.has(u)) { seen.add(u); out.push(u); }
  }
  const inputCount = input.length;
  const outputCount = out.length;
  const dupeCount = inputCount - outputCount;
  
  document.getElementById('output').value = out.join('\n');
  document.getElementById('input-count').textContent = inputCount;
  document.getElementById('output-count').textContent = outputCount;
  document.getElementById('dupe-count').textContent = dupeCount;
  document.getElementById('meta').style.display = inputCount > 0 ? 'flex' : 'none';
  document.getElementById('copy').style.display = outputCount > 0 ? 'block' : 'none';
});

document.getElementById('clear').addEventListener('click', function(){
  document.getElementById('input').value = '';
  document.getElementById('output').value = '';
  document.getElementById('meta').style.display = 'none';
  document.getElementById('copy').style.display = 'none';
});

document.getElementById('copy').addEventListener('click', function(){
  document.getElementById('output').select();
  document.execCommand('copy');
  const btn = this;
  const orig = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => { btn.textContent = orig; }, 2000);
});
</script>
