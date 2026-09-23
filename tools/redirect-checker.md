---
layout: default
title: Redirect Checker
---

<div class="page-hero">
  <div class="shell">
    <h1>Redirect Checker</h1>
    <p class="hero-description">Check URLs for redirects instantly in your browser. See where each URL lands and its final status.</p>
  </div>
</div>

<div class="shell">
    <div class="content">
      <div class="tool-section">
        <div class="tool-panel">
          <h2 class="section-title">Input URLs</h2>
          <p class="section-desc">Paste one URL per line. The tool will check each URL for redirects.</p>
          <textarea id="input" class="tool-input" rows="12" placeholder="https://example.com/page1&#10;http://example.com&#10;https://redirect.example.com"></textarea>
          <div class="tool-actions">
            <button id="check" class="btn-primary">Check Redirects</button>
            <button id="clear" class="btn-secondary">Clear</button>
          </div>
        </div>

        <div class="tool-panel">
          <h2 class="section-title">Results</h2>
          <p class="section-desc">Final URL and status for each input.</p>
          <div class="result-meta" id="meta" style="display:none;">
            <span class="meta-item"><strong id="checked-count">0</strong> URLs checked</span>
            <span class="meta-item"><strong id="redirect-count">0</strong> redirects found</span>
            <span class="meta-item"><strong id="error-count">0</strong> errors</span>
          </div>
          <div id="results" style="display:none; margin-bottom: 12px; max-height: 400px; overflow-y: auto;">
            <!-- Results will be appended here -->
          </div>
          <textarea id="output" class="tool-input" rows="12" readonly placeholder="Results will appear here"></textarea>
          <button id="copy" class="btn-secondary" style="display:none;">Copy Results</button>
        </div>
      </div>

      <div class="tool-callout">
        <strong>Browser limitation:</strong> Checks run through a public CORS proxy, which follows redirects and reports the final URL and status. It may not expose every intermediate hop (for example 301 vs 302), and the free proxy can be slow or rate-limited. For full redirect-chain analysis, <a href="{{ site.baseurl }}/request.html">request a Scrapebox report</a>.
      </div>
    </div>
</div>

<style>
.redirect-result {
  border-left: 4px solid var(--line);
  padding: 10px 12px;
  margin-bottom: 8px;
  background: var(--bg);
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: monospace;
}

.redirect-result.status-301 {
  border-left-color: #f59e0b;
}

.redirect-result.status-302 {
  border-left-color: #3b82f6;
}

.redirect-result.status-307 {
  border-left-color: #8b5cf6;
}

.redirect-result.status-308 {
  border-left-color: #ec4899;
}

.redirect-result.status-200 {
  border-left-color: #10b981;
}

.redirect-result.status-error {
  border-left-color: #ef4444;
}

.redirect-result-url {
  color: var(--muted);
  word-break: break-all;
  margin-bottom: 4px;
}

.redirect-result-status {
  font-weight: bold;
  color: var(--ink);
  margin-bottom: 4px;
}

.redirect-result-chain {
  color: var(--muted);
  font-size: 0.8rem;
}
</style>

<script>
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function normalizeUrl(u) {
  try {
    const x = new URL(u);
    return (x.protocol + '//' + x.hostname).toLowerCase() + x.pathname.replace(/\/+$/, '');
  } catch (e) { return u; }
}

async function checkUrl(url) {
  const proxy = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
  const r = await fetch(proxy);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const data = await r.json();
  const finalUrl = (data.status && data.status.url) || url;
  const status = (data.status && data.status.http_code) || 0;
  return { finalUrl: finalUrl, status: status, redirected: normalizeUrl(finalUrl) !== normalizeUrl(url) };
}

document.getElementById('check').addEventListener('click', async function(){
  const input = document.getElementById('input').value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const resultsDiv = document.getElementById('results');
  const outputArea = document.getElementById('output');

  if (input.length === 0) {
    outputArea.value = 'Please enter at least one URL.';
    return;
  }

  const checkBtn = this;
  checkBtn.disabled = true;
  checkBtn.textContent = 'Checking...';
  resultsDiv.innerHTML = '';
  outputArea.value = 'Checking redirects...';

  let checkedCount = 0;
  let redirectCount = 0;
  let errorCount = 0;
  const results = [];

  for (const url of input) {
    try {
      new URL(url);
    } catch (e) {
      checkedCount++; errorCount++;
      const div = document.createElement('div');
      div.className = 'redirect-result status-error';
      div.innerHTML = '<div class="redirect-result-url"><strong>URL:</strong> ' + escapeHtml(url) + '</div><div class="redirect-result-status">\u274C Invalid URL</div>';
      resultsDiv.appendChild(div);
      results.push(url + ' \u2192 ERROR: Invalid URL');
      continue;
    }

    try {
      const info = await checkUrl(url);
      checkedCount++;

      if (info.redirected) {
        redirectCount++;
        const div = document.createElement('div');
        div.className = 'redirect-result status-301';
        div.innerHTML = '<div class="redirect-result-url"><strong>URL:</strong> ' + escapeHtml(url) + '</div><div class="redirect-result-status">\u2197 Redirect detected</div><div class="redirect-result-chain"><strong>Final URL:</strong> ' + escapeHtml(info.finalUrl) + ' <span>(status ' + info.status + ')</span></div>';
        resultsDiv.appendChild(div);
        results.push(url + ' \u2192 ' + info.status + ' \u2192 ' + info.finalUrl);
      } else {
        const cls = (info.status && info.status < 400) ? 'status-200' : 'status-error';
        const icon = (info.status && info.status < 400) ? '\u2713' : '\u2717';
        const div = document.createElement('div');
        div.className = 'redirect-result ' + cls;
        div.innerHTML = '<div class="redirect-result-url"><strong>URL:</strong> ' + escapeHtml(url) + '</div><div class="redirect-result-status">' + icon + ' ' + info.status + ' No redirect</div>';
        resultsDiv.appendChild(div);
        results.push(url + ' \u2192 ' + info.status + ' (No redirect)');
      }
    } catch (error) {
      checkedCount++; errorCount++;
      const div = document.createElement('div');
      div.className = 'redirect-result status-error';
      const msg = error.message || 'Unknown error';
      div.innerHTML = '<div class="redirect-result-url"><strong>URL:</strong> ' + escapeHtml(url) + '</div><div class="redirect-result-status">\u274C Error: ' + escapeHtml(msg) + '</div><div class="redirect-result-chain">The URL could not be checked (proxy or network failure).</div>';
      resultsDiv.appendChild(div);
      results.push(url + ' \u2192 ERROR: ' + msg);
    }
  }

  resultsDiv.style.display = 'block';
  outputArea.value = results.join('\n');

  document.getElementById('checked-count').textContent = checkedCount;
  document.getElementById('redirect-count').textContent = redirectCount;
  document.getElementById('error-count').textContent = errorCount;
  document.getElementById('meta').style.display = checkedCount > 0 ? 'flex' : 'none';
  document.getElementById('copy').style.display = results.length > 0 ? 'block' : 'none';

  checkBtn.disabled = false;
  checkBtn.textContent = 'Check Redirects';
});

document.getElementById('clear').addEventListener('click', function(){
  document.getElementById('input').value = '';
  document.getElementById('output').value = '';
  document.getElementById('results').innerHTML = '';
  document.getElementById('results').style.display = 'none';
  document.getElementById('meta').style.display = 'none';
  document.getElementById('copy').style.display = 'none';
});

document.getElementById('copy').addEventListener('click', function(){
  document.getElementById('output').select();
  document.execCommand('copy');
  const btn = this;
  const orig = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(function(){ btn.textContent = orig; }, 2000);
});
</script>
