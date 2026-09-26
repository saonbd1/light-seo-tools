---
layout: default
title: Whois Scraper
seo_title: "Whois Scraper — Bulk Domain Registration Report"
description: "Extract WHOIS data for a list of domains. Send a domain list and get registrar, creation date, expiry date and nameservers in one private report."
guide:
  eyebrow: Scrapebox workflow
  heading: Whois Scraper
  what: "Send a list of domains and we pull registrar, creation date, expiry date and nameserver records into one table — useful for due diligence, drop lists and expiry monitoring."
  steps:
    - "Prepare a plain-text list with one domain per line."
    - "Submit the list through the report request form."
    - "We query the records offline and flag privacy-protected or non-resolving domains."
    - "The report is delivered as CSV or XLSX through a private link."
  tips:
    - "Sort by expiry date to build a renewal watchlist for domains you are tracking."
    - "Creation dates help separate long-standing sites from recently registered ones when scoring a list."
    - "Many registrars mask personal data for privacy, so expect empty registrant fields — that is normal, not a failed lookup."
faq:
  - q: "Is WHOIS data public?"
    a: "Basic registration data is public for most extensions, though privacy services often redact registrant name, address and contact details."
  - q: "Why are some domains missing from the report?"
    a: "Domains that do not resolve, or that use an extension without a public WHOIS service, return no data. Those rows are flagged so you can decide how to handle them."
  - q: "Can I use this to find expiring domains?"
    a: "Yes. Filter the report by expiry date and treat it as a watchlist. Expiry dates shift when owners renew, so re-run before acting on it."
related:
  - title: Check Unregistered Domain
    url: /tools/check-unregistered-domain.html
  - title: Domain Resolver Tool
    url: /tools/domain-resolver-tool.html
  - title: Bulk Nameserver Extractor
    url: /tools/bulk-nameserver-extractor.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow</span><h1>Whois Scraper</h1><p class="hero-description">Pull registrar and registration details for a list of domains.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Submit your list</h2>
      <p class="section-desc">Paste one domain per line.</p>
      <label class="field-label" for="input">Domains</label>
      <textarea id="input" class="tool-input" rows="10" placeholder="example.com&#10;example.org"></textarea>
      <div class="tool-actions"><a class="button" href="{{ site.baseurl }}/request.html">Request a report</a></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">What you get</h2>
      <p class="section-desc">WHOIS data for each domain.</p>
      <ul class="feature-list"><li>Registrar</li><li>Creation date</li><li>Expiry date</li><li>Nameservers</li></ul>
    </div>
  </div>
  <div class="tool-callout"><strong>Processing note:</strong> WHOIS records are queried through a registrar API and processed offline. <a href="{{ site.baseurl }}/request.html">Request a report</a> to get your results delivered by private link.</div>
</div></div>

{% include tool-guide.html %}

<style>.feature-list { margin:0; padding-left:20px; color:var(--muted); }.feature-list li { margin-bottom:8px; }</style>
