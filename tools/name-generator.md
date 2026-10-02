---
layout: default
title: Name Generator
seo_title: "Name Generator — Free Random Name Tool for Test Data"
description: "Generate random full names for placeholder data, testing or brainstorming. Free browser-based generator for up to 500 names at a time, ready to copy."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Name Generator
  what: "Produce a batch of random first and last name combinations for test records, form filling, mock listings or outreach-name brainstorming. Nothing is stored and no data leaves your browser."
  steps:
    - "Set how many names you need, up to 500 per run."
    - "Click Generate Names."
    - "Review the list, one name per line."
    - "Copy the output into your spreadsheet, fixture file or database seed."
  tips:
    - "Generate more names than you need, then remove duplicates before using them as unique keys."
    - "Pair this with the Email Generator to build matching placeholder contacts for QA."
    - "These are fictional placeholders, so do not use them to create real accounts or misrepresent identities."
faq:
  - q: "Are the generated names real people?"
    a: "No. They are random combinations from a fixed list of common first and last names, so any resemblance to a real person is coincidental."
  - q: "How many names can I generate at once?"
    a: "Up to 500 per run. Repeat the generation and merge the outputs if you need a larger dataset."
  - q: "Can I get matching email addresses?"
    a: "Not from this tool, because it only produces full names. Use the Email Generator to create matching addresses for the same test dataset."
related:
  - title: Email Generator
    url: /tools/email-generator.html
  - title: Sort Text Files
    url: /tools/sort-text-files.html
  - title: Remove Duplicate Entries
    url: /tools/remove-duplicate-entries.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Name Generator</h1><p class="hero-description">Produce a batch of random full names for seed data, testing, or brainstorming.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Options</h2>
      <p class="section-desc">Choose how many names to generate.</p>
      <label class="field-label" for="count">Number of names</label>
      <input id="count" class="tool-input" type="number" min="1" max="500" value="20" />
      <div class="tool-actions"><button id="run" class="btn-primary">Generate Names</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Names</h2>
      <p class="section-desc">One name per line.</p>
      <textarea id="output" class="tool-input" rows="16" readonly placeholder="Generated names will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
const FIRST = ['Ava','Liam','Mia','Noah','Zoe','Ethan','Ivy','Lucas','Ruby','Owen','Ella','Mason','Nora','Leo','Lily','Jack','Grace','Miles','Isla','Finn','Chloe','Caleb','Aria','Henry','Nina','Asher','Lena','Eli','Willa','Jonah'];
const LAST = ['Carter','Brooks','Hayes','Reed','Cole','Wells','Knox','Shaw','Stone','Ford','Pierce','Vance','Drake','Marsh','Quinn','Frost','Hale','Wren','Beck','Gray'];
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
document.getElementById('run').addEventListener('click', function () {
  const n = Math.max(1, Math.min(500, parseInt(document.getElementById('count').value, 10) || 20));
  const out = [];
  for (let i = 0; i < n; i++) out.push(pick(FIRST) + ' ' + pick(LAST));
  document.getElementById('output').value = out.join('\n');
  document.getElementById('copy').style.display = 'block';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('output').value = ''; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>

{% include tool-guide.html %}
