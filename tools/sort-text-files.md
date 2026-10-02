---
layout: default
title: Sort Text Files
seo_title: "Sort Text Files — Alphabetical & Numeric Sorter Free"
description: "Sort any text list alphabetically or numerically for free, ascending or descending, with optional duplicate removal. Paste your lines and copy the sorted result."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Sort Text Files
  what: "Paste a list and sort it alphabetically or numerically in either direction, with an optional dedupe step. Sorting makes duplicates and near-duplicates obvious and keeps exports tidy."
  steps:
    - "Paste one entry per line."
    - "Choose the order: ascending or descending."
    - "Choose the mode: alphabetical for text, numeric when entries are counts, prices or ranks."
    - "Tick Remove duplicates for a sorted unique list, then click Sort."
  tips:
    - "Numeric mode reads the leading number in each line, so sort the values before adding labels to them."
    - "Alphabetical sorting uses locale rules, which handle accented characters sensibly."
    - "Sort, then deduplicate, then export — that order produces the cleanest client-ready list."
faq:
  - q: "Why does 10 sort before 2 in alphabetical mode?"
    a: "Alphabetical mode compares text, so it looks at characters rather than value. Switch to numeric mode and 2 correctly sorts before 10."
  - q: "Will it keep my formatting?"
    a: "Each line is trimmed of surrounding spaces and then sorted as a whole. Internal spacing and punctuation are preserved."
  - q: "Can I sort a single CSV column?"
    a: "Not directly, because this tool works on whole lines. Extract the column first, sort it here, then paste it back into your spreadsheet."
related:
  - title: Remove Duplicate Entries
    url: /tools/remove-duplicate-entries.html
  - title: Split Text File
    url: /tools/split-text-file.html
  - title: Duplicate URL Finder
    url: /tools/duplicate-url-finder.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Sort Text Files</h1><p class="hero-description">Sort a list alphabetically or numerically, ascending or descending.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Input</h2>
      <p class="section-desc">Paste one entry per line.</p>
      <textarea id="input" class="tool-input" rows="12" placeholder="zeta&#10;alpha&#10;10&#10;2&#10;beta"></textarea>
      <label class="field-label" for="order">Order</label>
      <select id="order" class="tool-input"><option value="asc">Ascending (A-Z)</option><option value="desc">Descending (Z-A)</option></select>
      <label class="field-label" for="mode">Mode</label>
      <select id="mode" class="tool-input"><option value="alpha">Alphabetical</option><option value="num">Numeric</option></select>
      <label class="field-label" style="display:flex;gap:8px;align-items:center;"><input type="checkbox" id="dedupe" style="width:auto;" /> Remove duplicates</label>
      <div class="tool-actions"><button id="run" class="btn-primary">Sort</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Sorted</h2>
      <p class="section-desc">Sorted list.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="out-count">0</strong> lines</span></div>
      <textarea id="output" class="tool-input" rows="16" readonly placeholder="Sorted results will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
document.getElementById('run').addEventListener('click', function () {
  let lines = document.getElementById('input').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  if (document.getElementById('dedupe').checked) lines = Array.from(new Set(lines));
  const order = document.getElementById('order').value;
  const numeric = document.getElementById('mode').value === 'num';
  lines.sort(function (a, b) {
    let r;
    if (numeric) r = (parseFloat(a) || 0) - (parseFloat(b) || 0);
    else r = a.localeCompare(b);
    return order === 'desc' ? -r : r;
  });
  document.getElementById('output').value = lines.join('\n');
  document.getElementById('out-count').textContent = lines.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = lines.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>

{% include tool-guide.html %}
