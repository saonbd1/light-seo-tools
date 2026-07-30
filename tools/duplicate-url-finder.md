---
layout: default
title: Duplicate URL Finder
---

# Duplicate URL Finder

Paste a list of URLs and this page will help remove duplicates in your browser. For very large lists or cross-source duplicate detection, request a Scrapebox report.

<textarea id="input" rows="10" style="width:100%" placeholder="Paste URLs, one per line"></textarea>
<button id="remove">Remove Duplicates</button>

<h3>Results</h3>
<textarea id="output" rows="10" style="width:100%"></textarea>

<script>
document.getElementById('remove').addEventListener('click', function(){
  const input = document.getElementById('input').value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  const seen = new Set();
  const out = [];
  for(const u of input){
    if(!seen.has(u)) { seen.add(u); out.push(u); }
  }
  document.getElementById('output').value = out.join('\n');
});
</script>