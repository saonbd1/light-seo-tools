---
layout: default
title: Trim URL to First Folder
seo_title: "Trim URL to First Folder — Group URLs by Section Free"
description: "Group long URL lists by their top-level folder for free. Paste your URLs and keep only the origin plus the first path segment, ready to copy and deduplicate."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Trim URL to First Folder
  what: "Paste URLs and the trimmer keeps the origin plus the first path segment, so https://example.com/blog/post/42 becomes https://example.com/blog. It is the quickest way to see which sections a list is concentrated in."
  steps:
    - "Paste one URL per line. Invalid entries are skipped."
    - "Click Trim to First Folder."
    - "Check the counters and scan the resulting section list."
    - "Copy the result and deduplicate to count how many URLs each section holds."
  tips:
    - "Run the output through Remove Duplicate Entries to turn a huge crawl into a short list of sections."
    - "Sections with thousands of URLs and no internal links pointing at them deserve a closer look."
    - "Keep the mode consistent when comparing a crawl against a sitemap, so both lists group the same way."
faq:
  - q: "What counts as the first folder?"
    a: "The first non-empty path segment after the domain, for example /blog/ in https://example.com/blog/post/42. URLs that sit on the domain root are returned unchanged."
  - q: "Are query strings removed?"
    a: "Yes. Only the origin and the first folder survive, which is what makes the grouping useful."
  - q: "Can I keep two levels of folders?"
    a: "Not with this helper. Export the full URLs and use a spreadsheet formula for deeper grouping, or request a report with custom column mapping."
related:
  - title: Trim URL to Root
    url: /tools/trim-url-to-root.html
  - title: Trim URL to Domain
    url: /tools/trim-url-to-domain.html
  - title: Remove Duplicate Entries
    url: /tools/remove-duplicate-entries.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Trim URL to First Folder</h1><p class="hero-description">Keep the origin and the first path segment, dropping deeper folders and query strings.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Input URLs</h2>
      <p class="section-desc">Paste one URL per line. Invalid entries are skipped.</p>
      <textarea id="input" class="tool-input" rows="12" placeholder="https://example.com/blog/post/42?x=1&#10;https://example.com/shop"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Trim to First Folder</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Results</h2>
      <p class="section-desc">One trimmed URL per line.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="in-count">0</strong> URLs</span><span class="meta-item"><strong id="out-count">0</strong> results</span></div>
      <textarea id="output" class="tool-input" rows="12" readonly placeholder="Results will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
function firstFolder(u) {
  try {
    const x = new URL(u);
    const seg = x.pathname.split('/').filter(Boolean)[0];
    return x.origin + (seg ? '/' + seg : '');
  } catch (e) { return null; }
}
document.getElementById('run').addEventListener('click', function () {
  const lines = document.getElementById('input').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  const out = [];
  lines.forEach(function (l) { const r = firstFolder(l); if (r) out.push(r); });
  document.getElementById('output').value = out.join('\n');
  document.getElementById('in-count').textContent = lines.length;
  document.getElementById('out-count').textContent = out.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = out.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>

{% include tool-guide.html %}
