---
layout: default
title: Split Text File
seo_title: "Split Text File — Break a List Into Parts Free"
description: "Split a large text list into smaller parts for free. Choose lines per part, get numbered chunks you can copy, and keep line counts visible while you work."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Split Text File
  what: "Paste a long list and the splitter breaks it into numbered parts of a fixed size. This is the usual first step before uploading to a tool or form that caps how many lines it accepts."
  steps:
    - "Paste the text you want to split."
    - "Set how many lines each part should contain, for example 100."
    - "Click Split."
    - "Copy the output and save each numbered part separately if you need individual uploads."
  tips:
    - "Match the part size to the limit of the tool you are feeding; many index checkers and submission forms cap input at a few hundred lines."
    - "Split after deduplicating, otherwise the same URL can land in two different parts."
    - "Keep the part markers when you save, so results can be traced back to an exact chunk."
faq:
  - q: "Does the splitter change my data?"
    a: "No. It only inserts part markers and groups your lines. The text itself is untouched."
  - q: "Can I download the parts as separate files?"
    a: "Not directly. Copy the output and save it, or use your editor to split the file you exported. The tool is designed for quick in-browser work."
  - q: "How many parts can it produce?"
    a: "There is no fixed cap; browser memory is the limit. Lists of tens of thousands of lines work comfortably."
related:
  - title: Sort Text Files
    url: /tools/sort-text-files.html
  - title: Remove Duplicate Entries
    url: /tools/remove-duplicate-entries.html
  - title: Duplicate URL Finder
    url: /tools/duplicate-url-finder.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Split Text File</h1><p class="hero-description">Break a large list into smaller parts of a fixed number of lines.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Input</h2>
      <p class="section-desc">Paste the text and choose how many lines go in each part.</p>
      <textarea id="input" class="tool-input" rows="10" placeholder="line 1&#10;line 2&#10;line 3&#10;line 4&#10;line 5"></textarea>
      <label class="field-label" for="size">Lines per part</label>
      <input id="size" class="tool-input" type="number" min="1" value="100" />
      <div class="tool-actions"><button id="run" class="btn-primary">Split</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Parts</h2>
      <p class="section-desc">Each part is separated by a marker line.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="in-count">0</strong> lines</span><span class="meta-item"><strong id="part-count">0</strong> parts</span></div>
      <textarea id="output" class="tool-input" rows="16" readonly placeholder="Split parts will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
document.getElementById('run').addEventListener('click', function () {
  const lines = document.getElementById('input').value.split(/\r?\n/);
  const size = Math.max(1, parseInt(document.getElementById('size').value, 10) || 100);
  const parts = [];
  for (let i = 0; i < lines.length; i += size) parts.push(lines.slice(i, i + size));
  const out = [];
  parts.forEach(function (p, idx) {
    out.push('# Part ' + (idx + 1));
    out.push(p.join('\n'));
    out.push('');
  });
  document.getElementById('output').value = out.join('\n').replace(/\n+$/, '');
  document.getElementById('in-count').textContent = lines.length;
  document.getElementById('part-count').textContent = parts.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = parts.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>

{% include tool-guide.html %}
