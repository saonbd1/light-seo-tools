---
layout: default
title: Vanity Name Checker
seo_title: "Vanity Name Checker — Username Availability Report"
description: "Check whether a brand or username is available across Instagram, X, YouTube, GitHub and TikTok. Send a name list and get a platform-by-platform report."
guide:
  eyebrow: Scrapebox workflow
  heading: Vanity Name Checker
  what: "Send a list of brand or personal names and we check each platform for availability, so you can pick a handle that works everywhere before committing to a domain or logo."
  steps:
    - "Paste one name or username per line."
    - "Submit the list and note which platforms matter to you."
    - "We check availability offline and record a status per platform."
    - "The report arrives as a private link in CSV or XLSX form."
  tips:
    - "Check the variants people actually type: no spaces, no hyphens and with a number suffix."
    - "Availability changes hourly on busy platforms, so act quickly once a name looks free."
    - "Check the matching domain with Check Unregistered Domain before you launch the brand."
faq:
  - q: "Which platforms are checked?"
    a: "Instagram, X (Twitter), YouTube, GitHub and TikTok are the standard set. Mention others you need and we will confirm whether they can be included."
  - q: "Is the availability result final?"
    a: "It reflects the moment of the check. Names are released and taken constantly, so re-check immediately before registering."
  - q: "Can I check hundreds of names?"
    a: "Yes. Send the list as a plain-text file; large lists are batched to respect platform rate limits."
related:
  - title: Check Unregistered Domain
    url: /tools/check-unregistered-domain.html
  - title: Social Account Scraper
    url: /tools/social-account-scraper.html
  - title: Whois Scraper
    url: /tools/whois-scraper.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow</span><h1>Vanity Name Checker</h1><p class="hero-description">See where a username or brand name is still available across platforms.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Submit your list</h2>
      <p class="section-desc">Paste one name or username per line.</p>
      <label class="field-label" for="input">Names</label>
      <textarea id="input" class="tool-input" rows="10" placeholder="mybrand&#10;johndoe"></textarea>
      <div class="tool-actions"><a class="button" href="{{ site.baseurl }}/request.html">Request a report</a></div>
    </div>
    <div class="tool-panel">
      <h2 class="section-title">What you get</h2>
      <p class="section-desc">Availability status per platform.</p>
      <ul class="feature-list"><li>Instagram</li><li>Twitter / X</li><li>YouTube</li><li>GitHub &amp; TikTok</li></ul>
    </div>
  </div>
  <div class="tool-callout"><strong>Processing note:</strong> Username availability is checked through external lookups and processed offline. <a href="{{ site.baseurl }}/request.html">Request a report</a> to get your results delivered by private link.</div>
</div></div>

{% include tool-guide.html %}

<style>.feature-list { margin:0; padding-left:20px; color:var(--muted); }.feature-list li { margin-bottom:8px; }</style>
