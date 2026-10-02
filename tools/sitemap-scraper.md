---
layout: default
title: Sitemap Scraper
seo_title: "Sitemap Scraper — Extract All URLs From sitemap.xml Free"
description: "Extract every URL from a sitemap.xml for free. Enter a domain or sitemap URL and the scraper returns a deduplicated list of all loc entries you can copy."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Sitemap Scraper
  what: "Point the scraper at a sitemap file or a bare domain and it pulls every loc entry, removes duplicates and returns a clean URL list — the quickest way to compare what a site claims to have against what search engines actually know about."
  steps:
    - "Enter the sitemap URL, or just the domain and the tool will try /sitemap.xml."
    - "Click Scrape Sitemap."
    - "Review the URL count and the extracted list."
    - "Copy the URLs into your index checker, crawl tool or spreadsheet."
  tips:
    - "Sitemap indexes list child sitemap files rather than pages. If you only get a few .xml URLs back, scrape those children individually."
    - "Compare the sitemap list with crawl output to find orphan pages — URLs in the sitemap that no page links to."
    - "Stay inside the 50,000 URL and 50MB limits per file and reference your sitemap from both robots.txt and any sitemap index."
faq:
  - q: "What is the difference between a sitemap and a sitemap index?"
    a: "A sitemap lists page URLs. A sitemap index lists other sitemap files. If the scraper returns only a handful of .xml URLs, you are looking at an index and should scrape its children."
  - q: "Does the sitemap show which pages are indexed?"
    a: "No. A sitemap only declares the pages you want crawled. To confirm index coverage, use the Google Index Checker or Bing Index Checker report."
  - q: "Why does the fetch fail on some sites?"
    a: "Sites that block cross-origin requests, or that keep the sitemap behind a firewall, cannot be read from the browser. In that case request a processed report."
related:
  - title: Link Extractor
    url: /tools/link-extractor.html
  - title: Google Index Checker
    url: /tools/google-index-checker.html
  - title: Bing Index Checker
    url: /tools/bing-index-checker.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Sitemap Scraper</h1><p class="hero-description">Load a sitemap.xml and extract every <code>&lt;loc&gt;</code> URL it contains.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Sitemap</h2>
      <p class="section-desc">Enter a sitemap URL or a domain (the tool tries <code>/sitemap.xml</code>).</p>
      <label class="field-label" for="input">Sitemap or domain</label>
      <input id="input" class="tool-input" placeholder="https://example.com/sitemap.xml" />
      <div class="tool-actions"><button id="run" class="btn-primary">Scrape Sitemap</button><button id="clear" class="btn-secondary">Clear</button></div>
      <p id="status" class="status-text" style="display:none;"></p>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">URLs</h2>
      <p class="section-desc">All <code>&lt;loc&gt;</code> entries found.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="count">0</strong> URLs</span></div>
      <textarea id="output" class="tool-input" rows="16" readonly placeholder="Extracted URLs will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
function normalize(url) {
  let raw = (url || '').trim();
  if (!raw) return null;
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;
  let u;
  try { u = new URL(raw); } catch (e) { return null; }
  if (u.pathname === '/') u.pathname = '/sitemap.xml';
  return u.toString();
}
async function fetchText(url) {
  try { const r = await fetch(url, { redirect: 'follow' }); if (r.ok) return await r.text(); } catch (e) {}
  const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
  const r = await fetch(proxy);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return await r.text();
}
document.getElementById('run').addEventListener('click', async function () {
  const url = normalize(document.getElementById('input').value);
  const status = document.getElementById('status');
  const btn = this;
  if (!url) { status.textContent = 'Please enter a valid URL or domain.'; status.style.display = 'block'; return; }
  btn.disabled = true;
  status.textContent = 'Fetching ' + url + ' ...';
  status.style.display = 'block';
  try {
    const text = await fetchText(url);
    const doc = new DOMParser().parseFromString(text, 'text/xml');
    const locs = Array.from(doc.querySelectorAll('loc')).map(function (l) { return (l.textContent || '').trim(); }).filter(Boolean);
    const unique = Array.from(new Set(locs));
    document.getElementById('output').value = unique.join('\n');
    document.getElementById('count').textContent = unique.length;
    document.getElementById('meta').style.display = 'flex';
    document.getElementById('copy').style.display = unique.length ? 'block' : 'none';
    status.textContent = 'Found ' + unique.length + ' URLs.';
  } catch (e) {
    status.textContent = 'Error: ' + (e.message || 'Unable to fetch sitemap');
  } finally {
    btn.disabled = false;
  }
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; document.getElementById('status').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>

{% include tool-guide.html %}
