---
layout: default
title: Link Extractor
permalink: /tools/link-extractor.html
seo_title: "Free Link Extractor — Crawl Site Links 3 Levels Deep | Light SEO Tools"
description: "Crawl a website in your browser and export every internal link up to three levels deep. Free internal link extractor for quick site maps and orphan page checks."
tool: true
guide:
  eyebrow: Free crawl helper
  heading: Link Extractor
  what: "Enter a starting URL and the crawler follows same-origin links level by level, building a de-duplicated list of internal URLs. It is the fastest way to see the shape of a site without installing anything."
  steps:
    - "Paste the starting URL — usually the homepage or a section hub."
    - "Choose a crawl depth. One level scans only the start page, three levels builds a deeper internal map."
    - "Click Extract links and watch the status line as each level is fetched."
    - "Copy the unique URLs into your spreadsheet, crawler or index-submission tool."
  tips:
    - "Depth 2 is usually enough to capture main navigation and section pages; depth 3 adds long-tail articles."
    - "Compare the output with your sitemap.xml to find pages that exist but are never linked internally."
    - "If a site blocks browser requests you will see only a handful of URLs — that is CORS, not an empty site."
faq:
  - q: "Why does the crawl stop after a few pages?"
    a: "Almost always because the site blocks cross-origin browser requests or renders links with JavaScript. The browser can only read pages the site is willing to share."
  - q: "Is crawling a site from my browser safe?"
    a: "Requests come from your own browser and your own connection, and the tool only follows internal links at the depth you choose. Keep depth modest and respect the target site's terms."
  - q: "Can I crawl a very large website?"
    a: "For protected, JavaScript-heavy or very large sites, request a processed crawl report. The offline workflow supports adjustable depth and much larger page budgets."
related:
  - title: Sitemap Scraper
    url: /tools/sitemap-scraper.html
  - title: Alive URL Checker
    url: /tools/alive-url-checker.html
  - title: Anchor Text Checker
    url: /tools/anchor-text-checker.html
---

<section class="page-hero"><div class="shell"><span class="eyebrow">Crawl helper</span><h1>Extract links up to 3 levels deep.</h1><p class="hero-description">Map the internal links connected to a starting page without uploading your site. Choose a crawl depth, then export the unique URLs found.</p></div></section>

<div class="shell"><div class="content"><div class="tool-section"><div class="tool-panel"><h2 class="section-title">Start a crawl</h2><p class="section-desc">This browser-based helper follows same-origin links from your starting URL.</p><label class="field-label" for="start-url">Starting URL</label><input id="start-url" class="tool-input" type="url" placeholder="https://example.com" autocomplete="url"><label class="field-label" for="depth">Crawl depth</label><select id="depth" class="tool-input"><option value="1">1 level — starting page only</option><option value="2">2 levels — pages linked from level 1</option><option value="3" selected>3 levels — deeper site map</option></select><div class="tool-actions"><button id="extract" class="btn-primary">Extract links</button><button id="clear" class="btn-secondary">Reset</button></div><p id="status" class="status-text" role="status">Ready to crawl.</p></div><div class="tool-panel"><div class="result-heading"><div><h2 class="section-title">Extracted URLs</h2><p class="section-desc">Unique internal links found by the crawl.</p></div><button id="copy" class="btn-secondary" style="display:none">Copy</button></div><div id="stats" class="result-meta" style="display:none"><span class="meta-item"><strong id="url-count">0</strong> URLs</span><span class="meta-item"><strong id="page-count">0</strong> pages scanned</span></div><textarea id="output" class="tool-input" rows="14" readonly placeholder="Your extracted links will appear here"></textarea></div></div><div class="tool-callout"><strong>Browser limitation:</strong> some websites block browser requests with CORS. For protected or large sites, <a href="{{ site.baseurl }}/request.html">request a processed crawl report</a>.</div></div></div>

<script>
(function(){
  const input=document.getElementById('start-url'), depth=document.getElementById('depth'), output=document.getElementById('output'), status=document.getElementById('status'), stats=document.getElementById('stats'), copy=document.getElementById('copy'), extract=document.getElementById('extract'), clear=document.getElementById('clear');
  const normalize=(url,origin)=>{try{const u=new URL(url,origin);u.hash='';return u.href.replace(/\/$/,'')||u.origin}catch{return null}};
  extract.addEventListener('click',async()=>{let start=normalize(input.value);if(!start){status.textContent='Enter a valid starting URL first.';return}const root=new URL(start).origin;const max=Number(depth.value);const queue=[{url:start,level:0}], seen=new Set([start]), links=new Set();let scanned=0;extract.disabled=true;status.textContent='Crawling level 1…';while(queue.length){const item=queue.shift();if(item.level>=max)continue;try{const response=await fetch(item.url,{mode:'cors'});if(!response.ok)continue;const html=await response.text();scanned++;const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelectorAll('a[href]').forEach(anchor=>{const found=normalize(anchor.href, item.url);if(!found||!found.startsWith(root)||found.startsWith('mailto:')||found.startsWith('tel:'))return;links.add(found);if(!seen.has(found)){seen.add(found);queue.push({url:found,level:item.level+1})}});status.textContent='Crawling level '+Math.min(item.level+2,max)+'…'}catch(error){if(scanned===0)status.textContent='Could not access this page. The site may block browser requests.'}}output.value=Array.from(links).sort().join('\n');document.getElementById('url-count').textContent=links.size;document.getElementById('page-count').textContent=scanned;stats.style.display='flex';copy.style.display=links.size?'block':'none';status.textContent='Finished. Found '+links.size+' unique internal link'+(links.size===1?'':'s')+'.';extract.disabled=false});
  clear.addEventListener('click',()=>{input.value='';output.value='';stats.style.display='none';copy.style.display='none';status.textContent='Ready to crawl.'});
  copy.addEventListener('click',async()=>{await navigator.clipboard.writeText(output.value);copy.textContent='Copied';setTimeout(()=>copy.textContent='Copy',1500)});
})();
</script>

{% include tool-guide.html %}
