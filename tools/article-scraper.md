---
layout: default
title: Article Scraper
seo_title: "Article Scraper — Free Readable Text Extractor Tool | Light SEO Tools"
description: "Extract readable article text from any page for free. Paste HTML or fetch a URL and the scraper strips navigation, scripts and styles, then counts the words."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Article Scraper
  what: "Fetch a page or paste its HTML and the scraper removes scripts, styles, navigation, headers, footers and forms, then returns the readable text with word and character counts."
  steps:
    - "Paste the page HTML, or enter a URL and click Fetch Source."
    - "Click Scrape Text."
    - "Review the cleaned text and the word and character counters."
    - "Copy the text into a content brief, keyword analysis or editor."
  tips:
    - "The scraper prefers an article element when the page has one, so results are cleanest on well-structured blogs and news sites."
    - "Use the word count as a quick depth check when comparing your page with the pages already ranking for the same term."
    - "If you only need the links, use Extract URL Links instead of cleaning the whole document."
faq:
  - q: "Does the scraper remove ads and sidebars?"
    a: "It removes common non-article elements such as scripts, styles, navigation, asides, forms, headers and footers. Ads inside the article container can still appear, so skim the output before reusing it."
  - q: "Why is the fetched text empty on some sites?"
    a: "Pages that render their content with JavaScript return little or no readable text. Copy the HTML from your browser's developer tools and paste it in instead."
  - q: "Can I republish the extracted text?"
    a: "The tool gives you the text, not the rights to it. Always respect the source site's licence and terms before republishing."
related:
  - title: Extract URL Links
    url: /tools/extract-url-links.html
  - title: Bing Meta Scraper
    url: /tools/bing-meta-scraper.html
  - title: Bandwidth Meter
    url: /tools/bandwidth-meter.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Article Scraper</h1><p class="hero-description">Pull the readable text out of a page's HTML, stripping navigation, scripts, and styles.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">HTML</h2>
      <p class="section-desc">Paste the full page source or the article's HTML.</p>
      <label class="field-label" for="url-input">Or fetch source from a URL</label>
      <div class="tool-actions" style="margin-top:0;margin-bottom:14px;">
        <input id="url-input" class="tool-input" placeholder="https://example.com" style="flex:1;min-width:0;" />
        <button id="fetch-btn" class="btn-secondary">Fetch Source</button>
      </div>
      <p id="status" class="status-text" style="display:none;margin:0 0 10px;"></p>
      <textarea id="input" class="tool-input" rows="16" placeholder="&lt;html&gt;&lt;body&gt;&lt;article&gt;Your article text here...&lt;/article&gt;&lt;/body&gt;&lt;/html&gt;"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Scrape Text</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Article Text</h2>
      <p class="section-desc">Cleaned plain text.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="words">0</strong> words</span><span class="meta-item"><strong id="chars">0</strong> characters</span></div>
      <textarea id="output" class="tool-input" rows="16" readonly placeholder="Extracted text will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
document.getElementById('run').addEventListener('click', function () {
  const html = document.getElementById('input').value;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  Array.from(doc.querySelectorAll('script, style, noscript, nav, footer, header, aside, form')).forEach(function (el) { el.remove(); });
  const target = doc.querySelector('article') || doc.body;
  let text = (target && (target.innerText || target.textContent)) || '';
  text = text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n\n').trim();
  const words = text ? text.split(/\s+/).length : 0;
  document.getElementById('output').value = text;
  document.getElementById('words').textContent = words;
  document.getElementById('chars').textContent = text.length;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = text ? 'block' : 'none';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; });
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
