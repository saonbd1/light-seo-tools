---
layout: default
title: Remove Duplicate Entries
seo_title: "Remove Duplicate Entries — Dedupe Any Text List Free"
description: "Remove duplicate lines from any text list for free. Paste keywords, URLs or names and get a unique list back, with optional case-insensitive matching."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Remove Duplicate Entries
  what: "A general-purpose deduplicator: paste any line-based list and the tool keeps the first occurrence of every entry, with an optional case-insensitive mode for lists where Apple and apple should count as one."
  steps:
    - "Paste one entry per line into the Input box."
    - "Tick Case-insensitive if capitalisation should not create a separate entry."
    - "Click Remove Duplicates."
    - "Review the submitted, unique and removed counters, then copy the result."
  tips:
    - "For URL lists specifically, use the Duplicate URL Finder, which gives the same result with URL-shaped counters."
    - "Run Sort Text Files first if you want to see which duplicates sat next to each other in the source."
    - "Case-insensitive mode keeps the first spelling it meets, so put your preferred capitalisation at the top of the list."
faq:
  - q: "Does it remove blank lines?"
    a: "Yes. Empty lines and lines containing only spaces are dropped before deduplication."
  - q: "What is the difference between case-sensitive and case-insensitive?"
    a: "Case-sensitive treats Apple and apple as two entries. Case-insensitive treats them as one and keeps the first spelling encountered."
  - q: "Is there a size limit?"
    a: "The work happens in your browser, so the practical limit is your device's memory. Very large files are better handled by the offline report workflow."
related:
  - title: Duplicate URL Finder
    url: /tools/duplicate-url-finder.html
  - title: Sort Text Files
    url: /tools/sort-text-files.html
  - title: Merge Duplicate Links
    url: /tools/merge-duplicate-links.html
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

{% include tool-guide.html %}
