---
layout: default
title: Bing Image Grabber
seo_title: "Bing Image Grabber — Extract Image URLs Free | Light SEO Tools"
description: "Collect every image URL from a page for free. Paste HTML or fetch a URL and get a deduplicated list of image sources, including lazy-load attributes."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Bing Image Grabber
  what: "Paste HTML or fetch a page and the grabber collects image source URLs, including common lazy-load attributes such as data-src and data-original, then returns one unique URL per line."
  steps:
    - "Paste the page source, or enter a URL and click Fetch Source."
    - "Click Grab Images."
    - "Review the unique image URL list and the total count."
    - "Copy the list for auditing alt coverage, image sizes or CDN usage."
  tips:
    - "Compare the output with your media library to find images still served from a staging host or a third-party CDN."
    - "Lazy-loaded images often hide in a data attribute, which is why the grabber checks more than the plain src."
    - "Oversized hero images are a common speed problem — check the real transfer size with the Bandwidth Meter."
faq:
  - q: "Does the grabber download the images?"
    a: "No. It only extracts the URLs so you can audit or review them. Nothing is saved to your machine."
  - q: "Why are there fewer images than I can see on the page?"
    a: "Images injected by JavaScript after load may not exist in the raw HTML. Use your browser's element inspector to copy the final markup, then paste that in."
  - q: "Can I get alt text as well?"
    a: "The Article Scraper and Link Extractor give more text-level detail. For a full image inventory across a site, request a processed crawl report."
related:
  - title: Bandwidth Meter
    url: /tools/bandwidth-meter.html
  - title: Article Scraper
    url: /tools/article-scraper.html
  - title: Alive URL Checker
    url: /tools/alive-url-checker.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Bing Image Grabber</h1><p class="hero-description">Collect every image source URL from a page's HTML, deduplicated.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">HTML</h2>
      <p class="section-desc">Paste the page source or a snippet containing <code>&lt;img&gt;</code> tags.</p>
      <label class="field-label" for="url-input">Or fetch source from a URL</label>
      <div class="tool-actions" style="margin-top:0;margin-bottom:14px;">
        <input id="url-input" class="tool-input" placeholder="https://example.com" style="flex:1;min-width:0;" />
        <button id="fetch-btn" class="btn-secondary">Fetch Source</button>
      </div>
      <p id="status" class="status-text" style="display:none;margin:0 0 10px;"></p>
      <textarea id="input" class="tool-input" rows="14" placeholder="&lt;img src=&quot;https://example.com/image.jpg&quot; alt=&quot;...&quot;&gt;"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Grab Images</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Image URLs</h2>
      <p class="section-desc">Unique image source URLs.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="total">0</strong> images</span></div>
      <div id="results" style="display:none;max-height:360px;overflow-y:auto;margin-bottom:12px;"></div>
      <textarea id="output" class="tool-input" rows="10" readonly placeholder="Copyable list will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<style>
.link-result { border:1px solid var(--line); border-radius:8px; padding:8px 12px; margin-bottom:8px; background:var(--bg); font-size:.85rem; }
.link-result .u { color:var(--muted); word-break:break-all; font-family:monospace; font-size:.78rem; }
</style>

<script>
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
document.getElementById('run').addEventListener('click', function () {
  const html = document.getElementById('input').value;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const imgs = Array.from(doc.querySelectorAll('img'));
  const srcs = [];
  imgs.forEach(function (img) {
    const src = img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-original') || '';
    if (src) srcs.push(src);
  });
  const unique = Array.from(new Set(srcs));

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = unique.map(function (s) { return '<div class="link-result"><div class="u">' + escapeHtml(s) + '</div></div>'; }).join('');
  resultsDiv.style.display = 'block';

  document.getElementById('output').value = unique.join('\n');
  document.getElementById('total').textContent = unique.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = unique.length ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('results').innerHTML = ''; document.getElementById('results').style.display = 'none'; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
async function fetchHtml(url) {
  try { const r = await fetch(url); if (r.ok) return await r.text(); } catch (e) {}
  const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
  const r = await fetch(proxy);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return await r.text();
}
async function fetchAndRun() {
  const status = document.getElementById('status');
  const btn = document.getElementById('fetch-btn');
  let url = document.getElementById('url-input').value.trim();
  if (!url) { status.textContent = 'Please enter a URL.'; status.style.display = 'block'; return; }
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  try { new URL(url); } catch (e) { status.textContent = 'Please enter a valid URL.'; status.style.display = 'block'; return; }
  btn.disabled = true;
  status.textContent = 'Fetching source...';
  status.style.display = 'block';
  try {
    const html = await fetchHtml(url);
    document.getElementById('input').value = html;
    status.textContent = 'Fetched ' + html.length + ' characters.';
    document.getElementById('run').click();
  } catch (e) {
    status.textContent = 'Error: ' + (e.message || 'Unable to fetch');
  } finally {
    btn.disabled = false;
  }
}
document.getElementById('fetch-btn').addEventListener('click', fetchAndRun);
document.getElementById('clear').addEventListener('click', function () {
  document.getElementById('url-input').value = '';
  const s = document.getElementById('status'); s.textContent = ''; s.style.display = 'none';
});
</script>

{% include tool-guide.html %}
