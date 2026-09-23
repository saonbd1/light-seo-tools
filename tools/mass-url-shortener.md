---
layout: default
title: Mass URL Shortener
description: Shorten a list of URLs in bulk.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow</span><h1>Mass URL Shortener</h1><p class="hero-description">Turn a long list of URLs into short links in a single processed pass.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Submit your list</h2>
      <p class="section-desc">Paste one URL per line.</p>
      <label class="field-label" for="input">URLs</label>
      <textarea id="input" class="tool-input" rows="10" placeholder="https://example.com/very/long/path&#10;https://another.org/page"></textarea>
      <div class="tool-actions"><a class="button" href="{{ site.baseurl }}/request.html">Request a report</a></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">What you get</h2>
      <p class="section-desc">A shortened URL for each input.</p>
      <ul class="feature-list"><li>Original URL</li><li>Shortened URL</li><li>Shortener service used</li></ul>
    </div>
  </div>
  <div class="tool-callout"><strong>Processing note:</strong> Shortening is performed through a URL-shortening API and processed offline. <a href="{{ site.baseurl }}/request.html">Request a report</a> to get your results delivered by private link.</div>
</div></div>

<style>.feature-list { margin:0; padding-left:20px; color:var(--muted); }.feature-list li { margin-bottom:8px; }</style>
