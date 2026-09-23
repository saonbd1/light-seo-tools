---
layout: default
title: Alexa Rank Checker
description: Check global and country Alexa ranking for a list of domains.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow</span><h1>Alexa Rank Checker</h1><p class="hero-description">Get the Alexa global and country rank for a list of domains in one processed report.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Submit your list</h2>
      <p class="section-desc">Paste one domain per line.</p>
      <label class="field-label" for="input">Domains</label>
      <textarea id="input" class="tool-input" rows="10" placeholder="example.com&#10;another-site.org"></textarea>
      <div class="tool-actions"><a class="button" href="{{ site.baseurl }}/request.html">Request a report</a></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">What you get</h2>
      <p class="section-desc">Rank data for each domain.</p>
      <ul class="feature-list"><li>Global rank</li><li>Country rank</li><li>Estimated monthly visitors</li><li>Top referring sites</li></ul>
    </div>
  </div>
  <div class="tool-callout"><strong>Processing note:</strong> Alexa rank data is fetched through an external API and processed offline. <a href="{{ site.baseurl }}/request.html">Request a report</a> to get your results delivered by private link.</div>
</div></div>

<style>.feature-list { margin:0; padding-left:20px; color:var(--muted); }.feature-list li { margin-bottom:8px; }</style>
