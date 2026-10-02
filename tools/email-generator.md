---
layout: default
title: Email Generator
seo_title: "Email Generator — Free Random Email Address Maker"
description: "Create random email addresses on your own domain for testing. Free browser-based generator for up to 500 addresses per run, with a custom domain option."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Email Generator
  what: "Generate batches of realistic placeholder email addresses on a domain you choose — ideal for populating staging databases, forms and fixtures without touching real inboxes."
  steps:
    - "Enter the domain to use, for example example.com."
    - "Set how many addresses you need, up to 500."
    - "Click Generate Emails."
    - "Copy the list into your test data."
  tips:
    - "Use a domain you own so nothing can be delivered to a real person by accident."
    - "Keep the domain stable between runs so fixtures stay predictable in your test suite."
    - "Pair the output with the Name Generator when you need matching names and addresses."
faq:
  - q: "Do these addresses receive mail?"
    a: "No. They are generated strings only. Nothing is registered and nothing is sent, which is why you should only use domains you control."
  - q: "Can I choose the address format?"
    a: "Addresses use a first.last plus number pattern on the domain you enter, which keeps them realistic while staying unique."
  - q: "How many can I generate at once?"
    a: "Up to 500 per run. Repeat the generation if you need a larger test set."
related:
  - title: Name Generator
    url: /tools/name-generator.html
  - title: Remove Duplicate Entries
    url: /tools/remove-duplicate-entries.html
  - title: Sort Text Files
    url: /tools/sort-text-files.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Email Generator</h1><p class="hero-description">Create a batch of random, realistic email addresses with a custom domain.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Options</h2>
      <p class="section-desc">Set a domain and how many addresses to generate.</p>
      <label class="field-label" for="domain">Domain</label>
      <input id="domain" class="tool-input" value="example.com" placeholder="example.com" />
      <label class="field-label" for="count">Number of emails</label>
      <input id="count" class="tool-input" type="number" min="1" max="500" value="20" />
      <div class="tool-actions"><button id="run" class="btn-primary">Generate Emails</button><button id="clear" class="btn-secondary">Clear</button></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Emails</h2>
      <p class="section-desc">One address per line.</p>
      <textarea id="output" class="tool-input" rows="16" readonly placeholder="Generated emails will appear here"></textarea>
      <div class="tool-actions"><button id="copy" class="btn-secondary" style="display:none;">Copy</button></div>
    </div>
  </div>
</div></div>

<script>
const FIRST = ['ava','liam','mia','noah','zoe','ethan','ivy','lucas','ruby','owen','ella','mason','nora','leo','lily','jack','grace','miles','isla','finn'];
const LAST = ['carter','brooks','hayes','reed','cole','wells','knox','shaw','stone','ford','pierce','vance','drake','marsh','quinn'];
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function slug(s) { return s.replace(/[^a-z0-9]/g, ''); }
document.getElementById('run').addEventListener('click', function () {
  const domain = slug(document.getElementById('domain').value.trim()) || 'example.com';
  const n = Math.max(1, Math.min(500, parseInt(document.getElementById('count').value, 10) || 20));
  const out = [];
  for (let i = 0; i < n; i++) {
    const num = Math.floor(Math.random() * 900 + 100);
    out.push(pick(FIRST) + '.' + pick(LAST) + num + '@' + domain);
  }
  document.getElementById('output').value = out.join('\n');
  document.getElementById('copy').style.display = 'block';
});
document.getElementById('clear').addEventListener('click', function () { document.getElementById('output').value = ''; document.getElementById('copy').style.display = 'none'; });
document.getElementById('copy').addEventListener('click', function () { const el = document.getElementById('output'); el.select(); document.execCommand('copy'); const b = this, o = b.textContent; b.textContent = 'Copied!'; setTimeout(function () { b.textContent = o; }, 2000); });
</script>

{% include tool-guide.html %}
