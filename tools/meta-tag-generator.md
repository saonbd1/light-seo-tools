---
layout: default
title: Meta Tag Generator
---

# Meta Tag Generator

Enter a title and description to generate basic meta tags for HTML.

<label>Title</label>
<input id="title" style="width:100%" placeholder="Page title">
<label>Description</label>
<textarea id="desc" rows="4" style="width:100%" placeholder="Page description"></textarea>
<button id="gen">Generate Meta Tags</button>

<h3>Output</h3>
<pre id="out"></pre>

<script>
document.getElementById('gen').addEventListener('click', function(){
  const t = document.getElementById('title').value;
  const d = document.getElementById('desc').value;
  const html = `<title>${t}</title>\n<meta name="description" content="${d}">`;
  document.getElementById('out').innerText = html;
});
</script>