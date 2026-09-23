---
layout: default
title: Sitemap Scraper
description: Fetch a sitemap.xml and extract all listed URLs.
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
