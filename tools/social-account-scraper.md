---
layout: default
title: Social Account Scraper
seo_title: "Social Account Scraper — Find Profiles by Domain | Light SEO Tools"
description: "Find the social profiles linked to a list of websites. Send a domain list and get Facebook, X, LinkedIn, Instagram and YouTube profiles in one report."
guide:
  eyebrow: Scrapebox workflow
  heading: Social Account Scraper
  what: "Send a list of domains and we look for the social profiles each site links to, returning the platform and profile URL per domain so you can build or clean a contact list."
  steps:
    - "Prepare a plain-text list with one domain per line."
    - "Submit the list through the report request form."
    - "We scan for profile links offline and group results by domain and platform."
    - "The report is delivered as CSV or XLSX by private link."
  tips:
    - "Bare domains work best; deep paths rarely change which profiles are found."
    - "Review the results before outreach, because sites sometimes link to an old or unrelated profile."
    - "Combine this with the Whois Scraper when you need registrant context alongside social profiles."
faq:
  - q: "Which platforms are checked?"
    a: "Facebook, X (Twitter), LinkedIn, Instagram and YouTube are the standard set. Mention any others you need and we will confirm availability."
  - q: "Will every domain return a profile?"
    a: "No. Sites that do not link their profiles, or that load navigation with JavaScript only, may return empty rows."
  - q: "Can I use the output for outreach?"
    a: "Yes, but keep it compliant: respect platform terms, anti-spam rules and applicable privacy law when you contact anyone."
related:
  - title: Vanity Name Checker
    url: /tools/vanity-name-checker.html
  - title: Whois Scraper
    url: /tools/whois-scraper.html
  - title: Alexa Rank Checker
    url: /tools/alexa-rank-checker.html
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Scrapebox workflow</span><h1>Social Account Scraper</h1><p class="hero-description">Discover the social profiles connected to a list of websites.</p></div></div>

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
      <p class="section-desc">Profiles found for each domain.</p>
      <ul class="feature-list"><li>Facebook</li><li>Twitter / X</li><li>LinkedIn</li><li>Instagram &amp; YouTube</li></ul>
    </div>
  </div>
  <div class="tool-callout"><strong>Processing note:</strong> Social profiles are discovered through external lookups and processed offline. <a href="{{ site.baseurl }}/request.html">Request a report</a> to get your results delivered by private link.</div>
</div></div>

{% include tool-guide.html %}

<style>.feature-list { margin:0; padding-left:20px; color:var(--muted); }.feature-list li { margin-bottom:8px; }</style>
