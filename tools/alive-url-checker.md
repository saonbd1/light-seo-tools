---
layout: default
title: Alive URL Checker
description: Check which URLs in a list are still reachable.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Alive URL Checker</h1><p class="hero-description">Test each URL in a list and flag which ones respond.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Input URLs</h2>
      <p class="section-desc">Paste one URL per line.</p>
      <textarea id="input" class="tool-input" rows="14" placeholder="https://example.com&#10;https://example.com/missing"></textarea>
      <div class="tool-actions"><button id="run" class="btn-primary">Check URLs</button><button id="clear" class="btn-secondary">Clear</button></div>
      <p id="status" class="status-text" style="display:none;"></p>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Results</h2>
      <p class="section-desc">Alive vs. unreachable.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="total">0</strong> checked</span><span class="meta-item"><strong id="alive">0</strong> alive</span><span class="meta-item"><strong id="dead">0</strong> unreachable</span></div>
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
.badge.alive { background:#dcfce7; color:#166534; }
.badge.dead { background:#fee2e2; color:#991b1b; }
</style>

<script>
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
async function isAlive(url) {
  try { const r = await fetch(url, { redirect: 'follow' }); if (r.ok) return true; } catch (e) {}
  try {
    const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
    const r = await fetch(proxy);
    return r.ok;
  } catch (e) { return false; }
}
document.getElementById('run').addEventListener('click', async function () {
  const urls = document.getElementById('input').value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  const status = document.getElementById('status');
  const resultsDiv = document.getElementById('results');
  const btn = this;
  if (!urls.length) { status.textContent = 'Please enter at least one URL.'; status.style.display = 'block'; return; }
  btn.disabled = true;
  resultsDiv.innerHTML = '';
  status.textContent = 'Checking ' + urls.length + ' URLs...';
  status.style.display = 'block';

  let alive = 0;
  const rows = [];
  for (const url of urls) {
    const ok = await isAlive(url);
    if (ok) alive++;
    rows.push({ url: url, ok: ok });
    const badge = ok ? '<span class="badge alive">alive</span>' : '<span class="badge dead">dead</span>';
    const item = document.createElement('div');
    item.className = 'link-result';
    item.innerHTML = '<div class="u">' + badge + ' ' + escapeHtml(url) + '</div>';
    resultsDiv.appendChild(item);
    resultsDiv.style.display = 'block';
  }
  document.getElementById('output').value = rows.map(function (r) { return (r.ok ? 'alive' : 'dead') + '\t' + r.url; }).join('\n');
  document.getElementById('total').textContent = rows.length;
  document.getElementById('alive').textContent = alive;
  document.getElementById('dead').textContent = rows.length - alive;
  document.getElementById('meta').style.display = 'flex';
  document.getElementById('copy').style.display = rows.length ? 'block' : 'none';
  status.textContent = 'Done: ' + alive + ' alive, ' + (rows.length - alive) + ' unreachable.';
  btn.disabled = false;
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('results').innerHTML = ''; document.getElementById('results').style.display = 'none'; document.getElementById('meta').style.display = 'none'; document.getElementById('copy').style.display = 'none'; document.getElementById('status').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>
