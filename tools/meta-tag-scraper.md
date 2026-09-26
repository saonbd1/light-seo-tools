---
layout: default
title: Meta Tag Scraper Report
seo_title: "Meta Tag Scraper Report — Bulk Titles & Descriptions"
description: "Extract titles and meta descriptions for a whole URL list. Send a plain-text file and get URL, title and description columns as CSV or XLSX by private link."
guide:
  eyebrow: Scrapebox workflow
  heading: Meta Tag Scraper Report
  what: "Send a URL list and Scrapebox Page Analyzer extracts the title and meta description for every page, so you can audit metadata across a site without opening each page by hand."
  steps:
    - "Prepare a plain-text .txt file with one URL per line."
    - "Submit the file and mention any extra fields you need, such as headings or word counts."
    - "We analyse the pages offline and check for missing or duplicated values."
    - "The report arrives as HTML, TXT, CSV or XLSX through a private download link."
  tips:
    - "Empty description cells are valid results — they mark pages you need to fix."
    - "Sort the finished report by title to surface duplicate titles across a large site instantly."
    - "Fix your highest-traffic URLs first: a weak description costs most where the impressions are."
faq:
  - q: "What columns does the report include?"
    a: "Url, Title and Description by default, with optional extra page fields such as headings when you ask for them."
  - q: "Why is the description empty for some rows?"
    a: "Those pages have no meta description tag. An empty cell is a valid result and a clear to-do item."
  - q: "Do blocked pages break the report?"
    a: "No. Pages that refuse requests are flagged in the output so you can see exactly which URLs could not be analysed."
related:
  - title: Meta Tag Generator
    url: /tools/meta-tag-generator.html
  - title: Bing Meta Scraper
    url: /tools/bing-meta-scraper.html
  - title: Google Index Checker
    url: /tools/google-index-checker.html
---

<section class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow · Bulk</span><h1>Meta Tag Scraper Report</h1><p class="hero-description">Submit a plain-text URL list for offline Scrapebox Page Analyzer processing and receive the title and meta description for every page as CSV, XLSX, HTML or TXT.</p></div></section>

<section class="content"><div class="shell">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Workflow preview</h2>
      <p class="section-desc">Four steps from upload to private download link.</p>
      <ol class="guide-steps">
        <li>Submit a <code>.txt</code> file with one URL per line.</li>
        <li>Scrapebox Page Analyzer loads each page and reads its metadata.</li>
        <li>The result is exported as HTML, TXT, CSV or XLSX.</li>
        <li>The finished report is delivered through a private download link.</li>
      </ol>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Example CSV result</h2>
      <p class="section-desc">Url, Title and Description columns, one row per page.</p>
      <pre>Url,Title,Description
http://example.com/,Example Domain,
</pre>
      <div class="tool-actions"><a class="button" href="{{ site.baseurl }}/request.html">Request a Meta Tag Scraper Report</a></div>
    </div>
  </div>
  <div class="tool-callout"><strong>Empty fields are findings:</strong> an empty Description cell means the page has no meta description tag, which is one of the fastest on-page wins in most audits.</div>
</div></section>

{% include tool-guide.html %}
