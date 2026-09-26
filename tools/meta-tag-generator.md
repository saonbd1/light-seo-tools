---
layout: default
title: Meta Tag Generator
seo_title: "Meta Tag Generator — Free Title & Description Tool | Light SEO Tools"
description: "Generate title and meta description tags for any page in seconds. Free browser-based generator that outputs a copy-ready HTML snippet."
tool: true
guide:
  eyebrow: Free browser helper
  heading: Meta Tag Generator
  what: "Type a page title and description and the generator returns ready-to-paste title and meta description HTML, so you can draft the snippet before you touch your template or CMS."
  steps:
    - "Enter the page title you plan to publish. Aim for roughly 50-60 characters so search results show it in full."
    - "Enter the meta description — about 150-160 characters that summarise the page and give searchers a reason to click."
    - "Click Generate Meta Tags."
    - "Copy the snippet into the head section of your template or CMS SEO field."
  tips:
    - "Keep titles unique across your site. Near-identical titles compete with each other in search results."
    - "Write the description for people first: the main keyword in natural language, then the benefit."
    - "Audit existing pages with the Meta Tag Scraper report to find missing, duplicated or over-long descriptions in bulk."
faq:
  - q: "Does the generator store what I type?"
    a: "No. Everything is generated locally in your browser and nothing is saved or sent anywhere."
  - q: "How long should a meta description be?"
    a: "Aim for 150-160 characters. Much longer text is usually truncated in search results, and much shorter text wastes the space Google gives you."
  - q: "Can I create meta tags for many pages at once?"
    a: "This helper handles one page at a time by design. For hundreds of URLs, use the Meta Tag Scraper report to export titles and descriptions as CSV or XLSX."
related:
  - title: Meta Tag Scraper Report
    url: /tools/meta-tag-scraper.html
  - title: Bing Meta Scraper
    url: /tools/bing-meta-scraper.html
  - title: Robots.txt Checker & Generator
    url: /tools/robots-txt-checker-generator.html
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

{% include tool-guide.html %}