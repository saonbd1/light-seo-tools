---
layout: default
title: Bing Index Checker
description: Check whether URLs are indexed by Bing.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow</span><h1>Bing Index Checker</h1><p class="hero-description">Find out which of your URLs are indexed in Bing search results.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Submit your list</h2>
      <p class="section-desc">Paste one URL per line.</p>
      <label class="field-label" for="input">URLs</label>
      <textarea id="input" class="tool-input" rows="10" placeholder="https://example.com/page-1&#10;https://example.com/page-2"></textarea>
      <div class="tool-actions"><a class="button" href="{{ site.baseurl }}/request.html">Request a report</a></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">What you get</h2>
      <p class="section-desc">Index status for each URL.</p>
      <ul class="feature-list"><li>URL</li><li>Indexed (yes/no)</li><li>Matched result URL</li></ul>
    </div>
  </div>
  <div class="tool-callout"><strong>Processing note:</strong> Index status is checked through search lookups and processed offline. <a href="{{ site.baseurl }}/request.html">Request a report</a> to get your results delivered by private link.</div>
</div></div>

<style>.feature-list { margin:0; padding-left:20px; color:var(--muted); }.feature-list li { margin-bottom:8px; }</style>
