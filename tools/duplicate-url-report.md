---
layout: default
title: Duplicate URL Report
seo_title: "Duplicate URL Report — Bulk URL Dedupe Service | Light SEO Tools"
description: "Send a plain-text URL list and get a cleaned unique-URL export back. Scrapebox removes repeated entries and returns HTML, TXT, CSV or XLSX by private link."
guide:
  eyebrow: Scrapebox workflow
  heading: Duplicate URL Report
  what: "Upload a URL list and Scrapebox removes repeated entries, returning the cleaned unique list with the original and unique counts recorded so you can prove exactly what changed."
  steps:
    - "Prepare a plain-text .txt file with one URL per line."
    - "Submit the file through the report request form and choose the export format you want."
    - "We run the dedupe process offline, then check counts and structure."
    - "You receive the cleaned list — HTML, TXT, CSV or XLSX — through a private download link."
  tips:
    - "Send the raw list rather than a pre-cleaned one, so the before-and-after counts stay meaningful."
    - "If your list mixes protocols or trailing slashes, ask for normalisation in the same pass."
    - "For a quick spot check on a single list, the free Duplicate URL Finder does the same job in your browser."
faq:
  - q: "Which export formats are available?"
    a: "HTML, TXT, CSV and XLSX. Pick one when you submit, or ask for a second format if you need it."
  - q: "How big can my list be?"
    a: "Scrapebox handles very large lists. Tell us the line count with your request so we can confirm the turnaround."
  - q: "Do you keep my data?"
    a: "Reports are stored only as long as needed to deliver them, and access is limited to the private link you receive."
related:
  - title: Duplicate URL Finder
    url: /tools/duplicate-url-finder.html
  - title: Merge Duplicate Links
    url: /tools/merge-duplicate-links.html
  - title: Meta Tag Scraper Report
    url: /tools/meta-tag-scraper.html
---

<section class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow · Bulk</span><h1>Duplicate URL Report</h1><p class="hero-description">Upload a plain-text URL list and Scrapebox removes repeated entries, returning a cleaned unique-URL export in HTML, TXT, CSV or XLSX by private link.</p></div></section>

<section class="content"><div class="shell">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Workflow preview</h2>
      <p class="section-desc">Four steps from upload to private download link.</p>
      <ol class="guide-steps">
        <li>Submit a <code>.txt</code> file with one URL per line.</li>
        <li>Scrapebox removes duplicate entries from the list.</li>
        <li>The result is exported as HTML, TXT, CSV or XLSX.</li>
        <li>The finished report is delivered through a private download link.</li>
      </ol>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">Example result</h2>
      <p class="section-desc">The cleaned unique URL list the customer receives.</p>
      <pre>http://example.com/page1
http://example.com/page2
http://example.com/page3</pre>
      <div class="tool-actions"><a class="button" href="{{ site.baseurl }}/request.html">Request a Duplicate URL Report</a></div>
    </div>
  </div>
  <div class="tool-callout"><strong>Counting note:</strong> the original input count and the unique count are recorded alongside the report, so the before-and-after result is auditable.</div>
</div></section>

{% include tool-guide.html %}
