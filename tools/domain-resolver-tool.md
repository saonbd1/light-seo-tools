---
layout: default
title: Domain Resolver Tool
description: Resolve domains to IP addresses and DNS records.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow</span><h1>Domain Resolver Tool</h1><p class="hero-description">Resolve a list of domains to their IP addresses and key DNS records.</p></div></div>

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
      <p class="section-desc">DNS records for each domain.</p>
      <ul class="feature-list"><li>A record (IPv4)</li><li>AAAA record (IPv6)</li><li>Nameservers (NS)</li><li>Mail servers (MX)</li></ul>
    </div>
  </div>
  <div class="tool-callout"><strong>Processing note:</strong> DNS lookups run through an external resolver and are processed offline. <a href="{{ site.baseurl }}/request.html">Request a report</a> to get your results delivered by private link.</div>
</div></div>

<style>.feature-list { margin:0; padding-left:20px; color:var(--muted); }.feature-list li { margin-bottom:8px; }</style>
