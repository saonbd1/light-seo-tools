---
layout: default
title: Check Unregistered Domain
seo_title: "Check Unregistered Domain — Bulk Availability Report"
description: "Find which domains are still available to register. Send a domain list and get a registered or unregistered status plus suggested alternatives in one report."
guide:
  eyebrow: Scrapebox workflow
  heading: Check Unregistered Domain
  what: "Send a list of domains and we check registration status through a registrar API, returning a registered or unregistered verdict per domain plus suggestions when your first choice is taken."
  steps:
    - "Prepare a plain-text list with one domain per line, including the extension."
    - "Submit the list through the report request form."
    - "We check availability offline and flag the domains that are still open."
    - "The report arrives as CSV or XLSX through a private link."
  tips:
    - "Check matching social handles with the Vanity Name Checker so the brand works everywhere."
    - "Availability changes minute by minute, so confirm at a registrar before you announce anything."
    - "Add spelling variants and common TLDs to the same list to widen your options in one pass."
faq:
  - q: "Does an available result mean I can register it?"
    a: "It means no registration record was found at the time of the check. Premium pricing, reserved names and registry holds can still apply, so confirm at the registrar."
  - q: "Can I spot domains that are about to expire?"
    a: "Use the Whois Scraper to review expiry dates and treat near-expiry domains as a watchlist, since they may be renewed before they drop."
  - q: "How large a list can you process?"
    a: "Large lists are batched to respect API limits. Tell us the volume with your request and we will confirm the turnaround."
related:
  - title: Vanity Name Checker
    url: /tools/vanity-name-checker.html
  - title: Whois Scraper
    url: /tools/whois-scraper.html
  - title: Tdname Scrapper
    url: /tools/tdname-scrapper.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow</span><h1>Check Unregistered Domain</h1><p class="hero-description">Check a list of domains and flag which ones are still available to register.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Submit your list</h2>
      <p class="section-desc">Paste one domain per line.</p>
      <label class="field-label" for="input">Domains</label>
      <textarea id="input" class="tool-input" rows="10" placeholder="example.com&#10;mybrand.io"></textarea>
      <div class="tool-actions"><a class="button" href="{{ site.baseurl }}/request.html">Request a report</a></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">What you get</h2>
      <p class="section-desc">Availability status per domain.</p>
      <ul class="feature-list"><li>Domain</li><li>Registered / unregistered</li><li>Suggested alternatives</li></ul>
    </div>
  </div>
  <div class="tool-callout"><strong>Processing note:</strong> Domain availability is checked through a registrar API and processed offline. <a href="{{ site.baseurl }}/request.html">Request a report</a> to get your results delivered by private link.</div>
</div></div>

{% include tool-guide.html %}

<style>.feature-list { margin:0; padding-left:20px; color:var(--muted); }.feature-list li { margin-bottom:8px; }</style>
