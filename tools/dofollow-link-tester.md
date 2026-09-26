---
layout: default
title: Dofollow Link Tester
seo_title: "Dofollow Link Tester — Check Link rel Attributes | Light SEO Tools"
description: "Test links for dofollow or nofollow in seconds. Paste HTML or fetch a URL to see every link's rel attribute and count dofollow versus nofollow links for free."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Dofollow Link Tester
  what: "The tester reads every link in a page's HTML, checks its rel attribute and splits the results into dofollow and nofollow, so you can confirm at a glance whether links pass signals."
  steps:
    - "Paste the page source, or enter a URL and click Fetch Source."
    - "Click Test Links."
    - "Review the two groups: links with no restrictive rel, and links carrying nofollow, sponsored or ugc."
    - "Copy the list to document outreach targets or audit your own link policy."
  tips:
    - "nofollow, sponsored and ugc all signal that a link should not pass ranking signals, so check for all three rather than only 'nofollow'."
    - "Some search engines treat these hints loosely, so never assume a dofollow link guarantees ranking equity."
    - "On your own site, mark paid and user-generated links as sponsored or ugc to stay inside search engine guidelines."
faq:
  - q: "What is the difference between dofollow and nofollow?"
    a: "A dofollow link has no restrictive rel attribute, so it may pass signals. A nofollow, sponsored or ugc link tells search engines not to count it for ranking."
  - q: "Can a whole page be nofollow?"
    a: "Yes. A robots meta tag with nofollow, or an X-Robots-Tag header, applies to every link on the page. This tester reads link-level rel attributes, so check the robots tag separately with the Bing Meta Scraper."
  - q: "Are nofollow links useless?"
    a: "No. They still send traffic and they can support discovery and citations. They are simply not intended to pass ranking signals."
related:
  - title: Anchor Text Checker
    url: /tools/anchor-text-checker.html
  - title: Outbound Link Checker
    url: /tools/outbound-link-checker.html
  - title: Bing Meta Scraper
    url: /tools/bing-meta-scraper.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Dofollow Link Tester</h1><p class="hero-description">Classify every link as dofollow or nofollow based on its <code>rel</code> attribute.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">HTML</h2>
      <p class="section-desc">Paste the page source or a snippet containing links.</p>
      <label class="field-label" for="url-input">Or fetch source from a URL</label>
      <div class="tool-actions" style="margin-top:0;margin-bottom:14px;">
        <input id="url-input" class="tool-input" placeholder="https://example.com" style="flex:1;min-width:0;" />
        <button id="fetch-btn" class="btn-secondary">Fetch Source</button>
      </div>
      <p id="status" class="status-text" style="display:none;margin:0 0 10px;"></p>
      <textarea id="input" class="tool-input" rows="14" placeholder="&lt;a href=&quot;https://example.com&quot;&gt;Dofollow&lt;/a&gt;&#10;&lt;a href=&quot;https://example.com&quot; rel=&quot;nofollow&quot;&gt;Nofollow&lt;/a&gt;"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Test Links</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Results</h2>
      <p class="section-desc">Dofollow and nofollow links.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="total">0</strong> links</span><span class="meta-item"><strong id="dofollow">0</strong> dofollow</span><span class="meta-item"><strong id="nofollow">0</strong> nofollow</span></div>
      <div id="results" style="display:none;max-height:360px;overflow-y:auto;margin-bottom:12px;"></div>
      <textarea id="output" class="tool-input" rows="10" readonly placeholder="Copyable list will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<style>
.link-result { border:1px solid var(--line); border-radius:8px; padding:8px 12px; margin-bottom:8px; background:var(--bg); font-size:.85rem; }
.link-result .u { color:var(--muted); word-break:break-all; font-family:monospace; font-size:.78rem; }
.badge { display:inline-block; padding:2px 8px; border-radius:999px; font-size:.7rem; font-weight:800; }
.badge.dofollow { background:#dcfce7; color:#166534; }
.badge.nofollow { background:#fee2e2; color:#991b1b; }
</style>

<script>
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
document.getElementById('run').addEventListener('click', function () {
  const html = document.getElementById('input').value;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const links = Array.from(doc.querySelectorAll('a'));
  const rows = links.map(function (a) {
    const href = a.getAttribute('href') || '';
    const nofollow = /nofollow/i.test(a.getAttribute('rel') || '');
    return { href: href, nofollow: nofollow };
  });
  const dofollowCount = rows.filter(function (r) { return !r.nofollow; }).length;
  const nofollowCount = rows.length - dofollowCount;

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = rows.map(function (r) {
    const badge = r.nofollow ? '<span class="badge nofollow">nofollow</span>' : '<span class="badge dofollow">dofollow</span>';
    return '<div class="link-result"><div class="u">' + badge + ' ' + escapeHtml(r.href) + '</div></div>';
  }).join('');
  resultsDiv.style.display = 'block';

  document.getElementById('output').value = rows.map(function (r) { return (r.nofollow ? 'nofollow' : 'dofollow') + '\t' + r.href; }).join('\n');
  document.getElementById('total').textContent = rows.length;
  document.getElementById('dofollow').textContent = dofollowCount;
  document.getElementById('nofollow').textContent = nofollowCount;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = rows.length ? 'block' : 'none';
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
