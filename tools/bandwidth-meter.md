---
layout: default
title: Bandwidth Meter
description: Measure the download size of a URL or page.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Bandwidth Meter</h1><p class="hero-description">Fetch a URL and estimate its response size in bytes, KB, or MB.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">URL</h2>
      <p class="section-desc">Enter the resource or page URL to measure.</p>
      <input id="input" class="tool-input" placeholder="https://example.com" />
      <div class="tool-actions"><button id="run" class="btn-primary">Measure</button><button id="clear" class="btn-secondary">Clear</button></div>
      <p id="status" class="status-text" style="display:none;"></p>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Result</h2>
      <p class="section-desc">Estimated download size.</p>
      <div class="result-meta" id="meta" style="display:none;"><span class="meta-item"><strong id="size">0</strong> size</span><span class="meta-item"><strong id="type">-</strong> content type</span></div>
      <textarea id="output" class="tool-input" rows="4" readonly placeholder="Size will appear here"></textarea>
    </div>
  </div>
</div></div>

<script>
function format(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}
document.getElementById('run').addEventListener('click', async function () {
  const raw = document.getElementById('input').value.trim();
  const status = document.getElementById('status');
  const btn = this;
  let url = raw;
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  try { new URL(url); } catch (e) { status.textContent = 'Please enter a valid URL.'; status.style.display = 'block'; return; }
  btn.disabled = true;
  status.textContent = 'Measuring ' + url + ' ...';
  status.style.display = 'block';
  try {
    let text;
    let type = 'text/html';
    try {
      const r = await fetch(url, { redirect: 'follow' });
      if (r.ok) { text = await r.text(); type = r.headers.get('content-type') || type; }
    } catch (e) {}
    if (text === undefined) {
      const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
      const r = await fetch(proxy);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      text = await r.text();
      type = r.headers.get('content-type') || type;
    }
    const bytes = new TextEncoder().encode(text).length;
    document.getElementById('size').textContent = format(bytes);
    document.getElementById('type').textContent = type.split(';')[0];
    document.getElementById('output').value = format(bytes) + ' (' + bytes + ' bytes)';
    document.getElementById('meta').style.display = 'flex';
    status.textContent = 'Done.';
  } catch (e) {
    status.textContent = 'Error: ' + (e.message || 'Unable to measure');
  } finally {
    btn.disabled = false;
  }
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('input').value = ''; document.getElementById('output').value = ''; document.getElementById('meta').style.display = 'none'; document.getElementById('status').style.display = 'none'; });
</script>
