---
layout: default
title: Legal Page Generator
description: Generate Terms of Service, Privacy Policy, and Affiliate Disclosure text for your site.
---

<div class="page-hero"><div class="shell"><span class="eyebrow">Free browser helper</span><h1>Legal Page Generator</h1><p class="hero-description">Generate ready-to-use Terms of Service, Privacy Policy, and Affiliate Disclosure text from your site details.</p></div></div>

<div class="shell"><div class="content">
  <div class="tool-section">
    <div class="tool-panel">
      <h2 class="section-title">Site details</h2>
      <p class="section-desc">Fill in your information to generate the documents. Empty fields use sensible defaults.</p>

      <label class="field-label" for="f-site">Site name</label>
      <input id="f-site" class="tool-input" placeholder="Light SEO Tools" />

      <label class="field-label" for="f-owner">Owner / company name</label>
      <input id="f-owner" class="tool-input" placeholder="Light SEO Tools" />

      <label class="field-label" for="f-url">Website URL</label>
      <input id="f-url" class="tool-input" placeholder="https://example.com" />

      <label class="field-label" for="f-email">Contact email</label>
      <input id="f-email" class="tool-input" type="email" placeholder="you@example.com" />

      <label class="field-label" for="f-date">Effective date</label>
      <input id="f-date" class="tool-input" type="date" />

      <label class="field-label" for="f-jurisdiction">Governing law / jurisdiction</label>
      <input id="f-jurisdiction" class="tool-input" placeholder="the State of Delaware" />

      <label class="field-label" for="f-service">Short service description</label>
      <input id="f-service" class="tool-input" placeholder="online SEO tools and reports" />

      <div class="tool-actions">
        <button id="gen-btn" class="btn-primary">Generate</button>
        <button id="clear" class="btn-secondary">Clear</button>
      </div>
    </div>

    <div class="tool-panel">
      <h2 class="section-title">Output</h2>
      <p class="section-desc">Switch tabs to view each document.</p>
      <div class="tool-actions" style="margin-top:0;margin-bottom:14px;">
        <button id="tab-terms" class="btn-secondary tab active" type="button">Terms</button>
        <button id="tab-privacy" class="btn-secondary tab" type="button">Privacy Policy</button>
        <button id="tab-disclosure" class="btn-secondary tab" type="button">Disclosure</button>
      </div>
      <textarea id="output" class="tool-input" rows="18" readonly placeholder="Generated document will appear here"></textarea>
      <div class="tool-actions">
        <button id="copy" class="btn-secondary" style="display:none;">Copy</button>
        <button id="download" class="btn-secondary" style="display:none;">Download</button>
      </div>
    </div>
  </div>

  <div class="tool-callout">
    <strong>Disclaimer:</strong> These templates are a starting point and do not constitute legal advice. Review and adapt them to your specific situation, and consult a qualified lawyer for anything important.
  </div>
</div></div>

<style>
.tab.active, .tab.active:hover { background: var(--blue); color: #fff; }
</style>

<script>
const docs = { terms: '', privacy: '', disclosure: '' };
let activeTab = 'terms';
const FILENAMES = { terms: 'terms-of-service.txt', privacy: 'privacy-policy.txt', disclosure: 'affiliate-disclosure.txt' };

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function collectData() {
  return {
    site: document.getElementById('f-site').value.trim() || 'Your Website',
    owner: document.getElementById('f-owner').value.trim() || 'Your Company',
    url: document.getElementById('f-url').value.trim() || 'https://example.com',
    email: document.getElementById('f-email').value.trim() || 'you@example.com',
    date: formatDate(document.getElementById('f-date').value),
    jurisdiction: document.getElementById('f-jurisdiction').value.trim() || 'your jurisdiction',
    service: document.getElementById('f-service').value.trim() || 'online tools and services'
  };
}

function buildTerms(d) {
  return [
    'TERMS OF SERVICE',
    '',
    'Last updated: ' + d.date,
    '',
    '1. Acceptance of Terms',
    'By accessing or using ' + d.site + ' ("the Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.',
    '',
    '2. Description of Service',
    d.site + ' provides ' + d.service + '.',
    '',
    '3. Use of the Site',
    'You agree to use the Site only for lawful purposes and in accordance with these Terms.',
    '',
    '4. User Responsibilities',
    'You are responsible for any content you submit and for ensuring it does not violate applicable law or the rights of any third party.',
    '',
    '5. Intellectual Property',
    'All content and materials on the Site are owned by ' + d.owner + ' and its licensors. You may not copy, modify, or redistribute them without prior written permission.',
    '',
    '6. Disclaimer of Warranties',
    'The Site is provided "as is" and "as available" without warranties of any kind, whether express or implied.',
    '',
    '7. Limitation of Liability',
    'To the maximum extent permitted by law, ' + d.owner + ' shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site.',
    '',
    '8. Third-Party Services',
    'The Site may rely on third-party services. We are not responsible for their availability or how they handle data.',
    '',
    '9. Governing Law',
    'These Terms are governed by and construed in accordance with the laws of ' + d.jurisdiction + '.',
    '',
    '10. Changes to These Terms',
    'We may update these Terms from time to time. Your continued use of the Site after changes are posted constitutes acceptance of the revised Terms.',
    '',
    '11. Contact',
    'Questions about these Terms? Contact us at ' + d.email + '.'
  ].join('\n');
}

function buildPrivacy(d) {
  return [
    'PRIVACY POLICY',
    '',
    'Last updated: ' + d.date,
    '',
    '1. Overview',
    d.site + ' ("we", "us", or "our") respects your privacy. This policy explains what information we collect and how we use it.',
    '',
    '2. Information We Collect',
    '- Information you provide directly, such as your name and email address when you contact us or submit a form.',
    '- Information collected automatically, such as usage data, device information, and cookies.',
    '',
    '3. How We Use Information',
    'We use the information we collect to operate, maintain, and improve the Site, and to respond to your inquiries.',
    '',
    '4. Sharing of Information',
    'We do not sell your personal information. We may share it with trusted third-party service providers as necessary to operate the Site.',
    '',
    '5. Data Retention',
    'We retain personal information only as long as necessary for the purposes described in this policy.',
    '',
    '6. Cookies',
    'The Site may use cookies and similar technologies to improve your experience. You can control cookies through your browser settings.',
    '',
    '7. Your Rights',
    'You may request access to, correction of, or deletion of your personal information by contacting us at ' + d.email + '.',
    '',
    '8. Children\'s Privacy',
    'The Site is not directed at children under 13, and we do not knowingly collect personal information from children.',
    '',
    '9. Changes to This Policy',
    'We may update this Privacy Policy from time to time. Changes will be posted on this page.',
    '',
    '10. Contact',
    'Questions about this policy? Contact us at ' + d.email + '.'
  ].join('\n');
}

function buildDisclosure(d) {
  return [
    'AFFILIATE DISCLOSURE',
    '',
    'Last updated: ' + d.date,
    '',
    '1. Affiliate Relationships',
    d.site + ' may participate in affiliate marketing programs. This means we may earn a commission when you click certain links and make a purchase, at no additional cost to you.',
    '',
    '2. Sponsored Content',
    'Any sponsored or paid content will be clearly identified as such.',
    '',
    '3. Honesty',
    'Our recommendations are based on our genuine assessment and are not influenced by any affiliate relationships.',
    '',
    '4. No Endorsement',
    'Mention of a third-party product or service does not constitute a formal endorsement or guarantee of that product or service.',
    '',
    '5. Contact',
    'Questions about this disclosure? Contact us at ' + d.email + '.'
  ].join('\n');
}

function showDoc(tab) {
  activeTab = tab;
  document.getElementById('output').value = docs[tab] || '';
  ['terms', 'privacy', 'disclosure'].forEach(function (key) {
    document.getElementById('tab-' + key).classList.toggle('active', key === tab);
  });
}

document.getElementById('gen-btn').addEventListener('click', function () {
  const d = collectData();
  docs.terms = buildTerms(d);
  docs.privacy = buildPrivacy(d);
  docs.disclosure = buildDisclosure(d);
  showDoc(activeTab);
  document.getElementById('copy').style.display = 'block';
  document.getElementById('download').style.display = 'block';
});

document.getElementById('tab-terms').addEventListener('click', function () { showDoc('terms'); });
document.getElementById('tab-privacy').addEventListener('click', function () { showDoc('privacy'); });
document.getElementById('tab-disclosure').addEventListener('click', function () { showDoc('disclosure'); });

document.getElementById('clear').addEventListener('click', function () {
  ['f-site', 'f-owner', 'f-url', 'f-email', 'f-date', 'f-jurisdiction', 'f-service'].forEach(function (id) { document.getElementById(id).value = ''; });
  docs.terms = docs.privacy = docs.disclosure = '';
  showDoc('terms');
  document.getElementById('copy').style.display = 'none';
  document.getElementById('download').style.display = 'none';
});

document.getElementById('copy').addEventListener('click', function () {
  const el = document.getElementById('output');
  el.select();
  document.execCommand('copy');
  const b = this, o = b.textContent;
  b.textContent = 'Copied!';
  setTimeout(function () { b.textContent = o; }, 2000);
});

document.getElementById('download').addEventListener('click', function () {
  const text = docs[activeTab] || '';
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = FILENAMES[activeTab];
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
});

document.getElementById('f-date').value = new Date().toISOString().split('T')[0];
</script>
