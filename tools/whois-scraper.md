---
layout: default
title: Whois Scraper
description: Extract WHOIS registration details for domains.
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

<style>.feature-list { margin:0; padding-left:20px; color:var(--muted); }.feature-list li { margin-bottom:8px; }</style>
