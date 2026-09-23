---
layout: default
title: Redirect Checker
---

<div class="page-hero">
  <div class="shell">
    <h1>Redirect Checker</h1>
    <p class="hero-description">Check URLs for redirects instantly in your browser. See status codes, follow chains, and detect 301, 302, and other redirect types.</p>
  </div>
</div>

<div class="shell">
    <div class="content">
      <div class="tool-section">
        <div class="tool-panel">
          <h2 class="section-title">Input URLs</h2>
          <p class="section-desc">Paste one URL per line. The tool will check each URL for redirect responses.</p>
          <textarea id="input" class="tool-input" rows="12" placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://redirect.example.com"></textarea>
          <div class="tool-actions">
            <button id="check" class="btn-primary">Check Redirects</button>
            <button id="clear" class="btn-secondary">Clear</button>
          </div>
        </div>

        <div class="tool-panel">
          <h2 class="section-title">Results</h2>
          <p class="section-desc">Status codes, redirect chains, and final URLs for each input.</p>
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
        <strong>How it works:</strong> URL checks are run through a server-side proxy so redirect status codes and headers are visible regardless of the target site's CORS policy. For comprehensive redirect analysis across large lists, <a href="{{ site.baseurl }}/request.html">request a Scrapebox report</a>.
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

.redirect-chain-step {
  padding: 3px 0 3px 12px;
  border-left: 2px solid var(--line);
  margin: 3px 0 3px 4px;
}

.redirect-chain-step strong {
  color: var(--ink);
}
</style>

<script>
const PROXY_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:54321/functions/v1/redirect-checker'
  : 'https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/redirect-checker';

const PROXY_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw'
};

document.getElementById('check').addEventListener('click', async function(){
  const input = document.getElementById('input').value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const resultsDiv = document.getElementById('results');
  const outputArea = document.getElementById('output');

  if (input.length === 0) {
    outputArea.value = 'Please enter at least one URL.';
    return;
  }

  if (input.length > 25) {
    outputArea.value = 'Please limit to 25 URLs per check.';
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

  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: PROXY_HEADERS,
      body: JSON.stringify({ urls: input })
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => response.statusText);
      throw new Error('Proxy returned ' + response.status + ': ' + errText);
    }

    const data = await response.json();
    const items = data.results || [];

    for (const item of items) {
      checkedCount++;

      if (item.error) {
        errorCount++;
        const resultDiv = document.createElement('div');
        resultDiv.className = 'redirect-result status-error';
        resultDiv.innerHTML = '<div class="redirect-result-url"><strong>URL:</strong> ' + escapeHtml(item.url) + '</div><div class="redirect-result-status">\u274C Error: ' + escapeHtml(item.error) + '</div>';
        resultsDiv.appendChild(resultDiv);
        results.push(item.url + ' \u2192 ERROR: ' + item.error);
        continue;
      }

      const statusCode = item.finalStatus;
      const isRedirect = item.redirected;

      if (isRedirect) {
        redirectCount++;
        const resultDiv = document.createElement('div');
        const lastHop = item.chain[item.chain.length - 1];
        const statusClass = 'status-' + (lastHop ? lastHop.status : 'error');
        resultDiv.className = 'redirect-result ' + statusClass;

        let html = '<div class="redirect-result-url"><strong>URL:</strong> ' + escapeHtml(item.url) + '</div>';
        html += '<div class="redirect-result-status">\u2197 ' + item.chain.length + ' hop' + (item.chain.length === 1 ? '' : 's') + ' \u2192 ' + statusCode + '</div>';
        html += '<div class="redirect-result-chain"><strong>Final URL:</strong> ' + escapeHtml(item.finalUrl) + '</div>';

        if (item.chain.length > 1) {
          html += '<div class="redirect-result-chain" style="margin-top:6px;"><strong>Chain:</strong></div>';
          item.chain.forEach(function(step, idx) {
            html += '<div class="redirect-chain-step"><strong>' + (idx + 1) + '.</strong> ' + step.status + ' \u2192 ' + escapeHtml(step.url) + (step.location ? '<br>&nbsp;&nbsp;&nbsp;\u2192 ' + escapeHtml(step.location) : '') + '</div>';
          });
        }

        resultDiv.innerHTML = html;
        resultsDiv.appendChild(resultDiv);
        results.push(item.url + ' \u2192 ' + item.chain.map(function(s){ return s.status; }).join(' \u2192 ') + ' \u2192 ' + item.finalUrl);
      } else {
        const resultDiv = document.createElement('div');
        const statusClass = statusCode < 400 ? 'status-200' : 'status-error';
        resultDiv.className = 'redirect-result ' + statusClass;
        const statusIcon = statusCode < 400 ? '\u2713' : '\u2717';
        resultDiv.innerHTML = '<div class="redirect-result-url"><strong>URL:</strong> ' + escapeHtml(item.url) + '</div><div class="redirect-result-status">' + statusIcon + ' ' + statusCode + ' No redirect</div>';
        resultsDiv.appendChild(resultDiv);
        results.push(item.url + ' \u2192 ' + statusCode + ' (No redirect)');
      }
    }
  } catch (error) {
    errorCount++;
    const resultDiv = document.createElement('div');
    resultDiv.className = 'redirect-result status-error';
    const errorMsg = error.message || 'Unknown error';
    resultDiv.innerHTML = '<div class="redirect-result-status">\u274C Request failed: ' + escapeHtml(errorMsg) + '</div><div class="redirect-result-chain">The redirect checker proxy could not be reached. Please try again.</div>';
    resultsDiv.appendChild(resultDiv);
    results.push('Proxy error: ' + errorMsg);
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
  setTimeout(() => { btn.textContent = orig; }, 2000);
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
</script>
