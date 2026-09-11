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
        <strong>Browser limitation:</strong> Some websites block browser requests or hide redirect headers due to CORS restrictions. Status codes shown are from the browser's perspective. For comprehensive redirect analysis across all sites, <a href="{{ site.baseurl }}/request.html">request a Scrapebox report</a>.
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
  resultsDiv.innerHTML = '';
  outputArea.value = 'Checking redirects...';
  
  let checkedCount = 0;
  let redirectCount = 0;
  let errorCount = 0;
  const results = [];
  
  for (const url of input) {
    // Validate URL
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch (e) {
      const resultDiv = document.createElement('div');
      resultDiv.className = 'redirect-result status-error';
      resultDiv.innerHTML = `<div class="redirect-result-url"><strong>URL:</strong> ${escapeHtml(url)}</div><div class="redirect-result-status">❌ Invalid URL</div>`;
      resultsDiv.appendChild(resultDiv);
      results.push(`${url} → ERROR: Invalid URL`);
      errorCount++;
      checkedCount++;
      continue;
    }
    
    try {
      const response = await fetch(url, { 
        mode: 'cors',
        redirect: 'manual',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      checkedCount++;
      const statusCode = response.status;
      const isRedirect = [301, 302, 303, 307, 308].includes(statusCode);
      
      if (isRedirect) {
        redirectCount++;
        const location = response.headers.get('location');
        const resultDiv = document.createElement('div');
        const statusClass = 'status-' + statusCode;
        resultDiv.className = 'redirect-result ' + statusClass;
        resultDiv.innerHTML = `<div class="redirect-result-url"><strong>URL:</strong> ${escapeHtml(url)}</div><div class="redirect-result-status">↗ ${statusCode} Redirect</div><div class="redirect-result-chain"><strong>Redirects to:</strong> ${location ? escapeHtml(location) : 'Unknown'}</div>`;
        resultsDiv.appendChild(resultDiv);
        results.push(`${url} → ${statusCode} → ${location || 'Unknown'}`);
      } else {
        const resultDiv = document.createElement('div');
        const statusClass = statusCode < 400 ? 'status-200' : 'status-error';
        resultDiv.className = 'redirect-result ' + statusClass;
        const statusIcon = statusCode < 400 ? '✓' : '✗';
        resultDiv.innerHTML = `<div class="redirect-result-url"><strong>URL:</strong> ${escapeHtml(url)}</div><div class="redirect-result-status">${statusIcon} ${statusCode} No redirect</div>`;
        resultsDiv.appendChild(resultDiv);
        results.push(`${url} → ${statusCode} (No redirect)`);
      }
    } catch (error) {
      checkedCount++;
      errorCount++;
      const resultDiv = document.createElement('div');
      resultDiv.className = 'redirect-result status-error';
      const errorMsg = error.message || 'Unknown error';
      resultDiv.innerHTML = `<div class="redirect-result-url"><strong>URL:</strong> ${escapeHtml(url)}</div><div class="redirect-result-status">❌ Error: ${escapeHtml(errorMsg)}</div><div class="redirect-result-chain">This could be due to CORS restrictions or the site being unreachable.</div>`;
      resultsDiv.appendChild(resultDiv);
      results.push(`${url} → ERROR: ${errorMsg}`);
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

// Escape HTML to prevent injection
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
</script>