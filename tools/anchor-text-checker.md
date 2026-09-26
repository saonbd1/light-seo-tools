---
layout: default
title: Anchor Text Checker
seo_title: "Anchor Text Checker — Free Internal Link Audit Tool | Light SEO Tools"
description: "Audit anchor text for free. Paste page HTML or fetch a URL and see every link with its anchor text, target URL and empty-anchor warnings."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Anchor Text Checker
  what: "Parse a page's HTML and list every link with the exact anchor text a reader would click, plus a count of links with no text at all — the fastest way to catch image-only and empty anchors."
  steps:
    - "Paste the page source, or enter a URL and click Fetch Source to load it for you."
    - "Click Check Anchors to parse every link in the HTML."
    - "Review the anchor text, target URLs and the empty-text counter."
    - "Copy the plain-text result into a spreadsheet for a wider link audit."
  tips:
    - "Descriptive anchor text helps people and search engines understand the destination. Replace 'click here' and bare URLs with the topic of the target page."
    - "Empty anchors usually mean the link wraps an image. Add an alt attribute or visible text so the link keeps its meaning."
    - "Re-run the check after template changes — navigation and footer links are where generic anchor text creeps back in."
faq:
  - q: "What is anchor text?"
    a: "It is the visible, clickable words of a link. Search engines use it as a signal about the destination page, so it should describe the target page."
  - q: "Why are some anchors counted as empty?"
    a: "The link contained no text — usually an image with no alt text, an icon font, or markup the parser could not read. Those links tell search engines nothing."
  - q: "Can I audit anchors across a whole site?"
    a: "Yes. Send a URL list as a report request to get anchor text, rel attributes and target URLs for every page in one export."
related:
  - title: Dofollow Link Tester
    url: /tools/dofollow-link-tester.html
  - title: Outbound Link Checker
    url: /tools/outbound-link-checker.html
  - title: Bulk Anchor Text Creator
    url: /tools/bulk-anchor-text-creator.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Anchor Text Checker</h1><p class="hero-description">Parse a page's HTML and list every link with its anchor text and target URL.</p></div></div>

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
      <textarea id="input" class="tool-input" rows="14" placeholder="&lt;a href=&quot;https://example.com&quot;&gt;Example&lt;/a&gt;"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Check Anchors</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Links</h2>
      <p class="section-desc">Anchor text with its target URL.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="total">0</strong> links</span><span class="meta-item"><strong id="empty">0</strong> empty text</span></div>
      <div id="results" style="display:none;max-height:360px;overflow-y:auto;margin-bottom:12px;"></div>
      <textarea id="output" class="tool-input" rows="10" readonly placeholder="Copyable list will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<style>
.link-result { border:1px solid var(--line); border-radius:8px; padding:8px 12px; margin-bottom:8px; background:var(--bg); font-size:.85rem; }
.link-result .t { font-weight:700; color:var(--ink); word-break:break-all; }
.link-result .u { color:var(--muted); word-break:break-all; font-family:monospace; font-size:.78rem; }
.badge { display:inline-block; padding:2px 8px; border-radius:999px; font-size:.7rem; font-weight:800; margin-left:6px; }
.badge.empty { background:#fee2e2; color:#991b1b; }
</style>

<script>
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
document.getElementById('run').addEventListener('click', function () {
  const html = document.getElementById('input').value;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const links = Array.from(doc.querySelectorAll('a'));
  const results = links.map(function (a) {
    const text = (a.textContent || '').trim();
    const href = a.getAttribute('href') || '';
    return { text: text, href: href };
  });
  const emptyCount = results.filter(function (r) { return !r.text; }).length;

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = results.map(function (r) {
    const badge = r.text ? '' : '<span class="badge empty">empty</span>';
    return '<div class="link-result"><div class="t">' + escapeHtml(r.text || '(no text)') + badge + '</div><div class="u">' + escapeHtml(r.href) + '</div></div>';
  }).join('');
  resultsDiv.style.display = 'block';

  document.getElementById('output').value = results.map(function (r) { return (r.text || '(no text)') + '\t' + r.href; }).join('\n');
  document.getElementById('total').textContent = results.length;
  document.getElementById('empty').textContent = emptyCount;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = results.length ? 'block' : 'none';
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
