---
layout: default
title: Meta Tag Generator
---

<section class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Meta Tag Generator</h1><p>Generate basic title and description tags for HTML.</p></div></section>
<section class="content"><div class="shell tool-page"><div class="card tool-form">
  <label for="title">Title</label>
  <input id="title" class="tool-input" placeholder="Page title">
  <label for="desc">Description</label>
  <textarea id="desc" class="tool-input" rows="4" placeholder="Page description"></textarea>
  <button class="button" id="gen">Generate Meta Tags</button>
  <h3>Output</h3>
  <pre id="out"></pre>
</div></div></section>

<script>
document.getElementById('gen').addEventListener('click', function(){
  const t = document.getElementById('title').value;
  const d = document.getElementById('desc').value;
  const html = `<title>${t}</title>\n<meta name="description" content="${d}">`;
  document.getElementById('out').innerText = html;
});
</script>