---
layout: default
title: Trim URL to Root
seo_title: "Trim URL to Root — Get Scheme and Host From URLs Free"
description: "Strip a URL list down to scheme and host for free. Paste your URLs and get the origin of each, with paths, folders and query strings removed in one click."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Trim URL to Root
  what: "Paste full URLs and the trimmer keeps only the scheme and host — the origin — so https://example.com/blog/post?x=1 becomes https://example.com. Useful for grouping a mixed list by site."
  steps:
    - "Paste one URL per line. Invalid entries are skipped."
    - "Click Trim to Root."
    - "Check the counters for input URLs and output roots."
    - "Copy the roots and deduplicate them for a clean list of origins."
  tips:
    - "Use roots to count how many URLs a crawl covers per host, which quickly shows how spread out a scraping run is."
    - "The www prefix is preserved here, so normalise www and non-www afterwards if you need them merged."
    - "For hostname-only output that strips www, use Trim URL to Domain instead."
faq:
  - q: "What is a URL origin?"
    a: "The scheme plus the host, for example https://www.example.com. Everything after the host — path, query and fragment — is dropped."
  - q: "Does this keep the www prefix?"
    a: "Yes. The host you paste is preserved exactly, including www, subdomains and port numbers."
  - q: "How is this different from Trim URL to Domain?"
    a: "This tool keeps the scheme and any www prefix. Trim URL to Domain returns only the hostname and removes www for consistency."
related:
  - title: Trim URL to Domain
    url: /tools/trim-url-to-domain.html
  - title: Trim URL to First Folder
    url: /tools/trim-url-to-first-folder.html
  - title: Extract URL Links
    url: /tools/extract-url-links.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Trim URL to Root</h1><p class="hero-description">Keep only the scheme and host of each URL, dropping paths and query strings.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Input URLs</h2>
      <p class="section-desc">Paste one URL per line. Invalid entries are skipped.</p>
      <textarea id="input" class="tool-input" rows="12" placeholder="https://example.com/one/two?x=1&#10;http://sub.example.org/page"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Trim to Root</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Roots</h2>
      <p class="section-desc">One root URL per line.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="in-count">0</strong> URLs</span><span class="meta-item"><strong id="out-count">0</strong> roots</span></div>
      <textarea id="output" class="tool-input" rows="12" readonly placeholder="Roots will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
function rootOf(u) {
  try { return new URL(u).origin; } catch (e) { return null; }
}
document.getElementById('run').addEventListener('click', function () {
  const lines = document.getElementById('input').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  const out = [];
  lines.forEach(function (l) { const r = rootOf(l); if (r) out.push(r); });
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
