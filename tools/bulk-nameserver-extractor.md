---
layout: default
title: Bulk Nameserver Extractor
description: Extract nameservers for a list of domains.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow</span><h1>Bulk Nameserver Extractor</h1><p class="hero-description">Get the nameservers for a large list of domains in one report.</p></div></div>

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
      <p class="section-desc">Nameservers for each domain.</p>
      <ul class="feature-list"><li>Domain</li><li>Primary nameserver</li><li>Secondary nameserver</li></ul>
    </div>
  </div>
  <div class="tool-callout"><strong>Processing note:</strong> Nameservers are resolved through DNS lookups and processed offline. <a href="{{ site.baseurl }}/request.html">Request a report</a> to get your results delivered by private link.</div>
</div></div>

<style>.feature-list { margin:0; padding-left:20px; color:var(--muted); }.feature-list li { margin-bottom:8px; }</style>
