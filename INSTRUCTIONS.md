INSTRUCTIONS — SEO Tools site (light-seo-tools)

This document explains how to configure the form backend (Formspree), run an end-to-end test, generate reports with Scrapebox, upload reports to private storage, and secure admin access.

1) Configure Formspree
- Create a Formspree account: https://formspree.io/
- Create a new form and copy the form endpoint (looks like: https://formspree.io/f/your-id)
- Update _config.yml formspree_endpoint with the new URL, OR edit request.html/contact.html to set the action directly.
- Test the form by submitting a sample request from the Request a Report page.

Form fields to collect (recommended):
- email (required)
- report_type (select)
- url_file (optional file upload, .txt/.csv)
- notes (optional)

2) End-to-end test workflow
- Submit a test request using a known email you control and a small URL file.
- On the admin machine (where Scrapebox is installed):
  - Open Scrapebox, import the uploaded URL list (or paste test URLs).
  - Run the required plugin/workflow (e.g., Remove duplicates, Page Analyzer, Link Checker).
  - Export the results to CSV/HTML (use the sample report formats in sample-reports/ as templates).
- Upload the generated report to private storage (see below) and copy a share link.
- Reply to the requester (the email they provided) with the private download link.

3) Recommended private report storage options
- Dropbox (easy):
  - Upload generated report to a Dropbox folder.
  - Create a share link with an expiration (Dropbox Professional/Business support expire links). If you have only Basic/Plus, consider expiring by manual deletion.
- Google Drive:
  - Upload the report, set link sharing to 'Anyone with the link', and optionally protect access via a second-level password sent by email.
  - Use Drive link expiration features if available in your account type.
- AWS S3:
  - Upload report and create a pre-signed URL (recommended for automation). Pre-signed URLs can have short expirations (e.g., 24 hours).

Security notes:
- Do NOT store real client reports in a public repo. Use private cloud storage or a private GitHub repo for real client data.
- Remove or rotate shared links after the retention period.
- Consider adding a simple admin-only page (not public) that lists pending requests and allows attaching a report link to a request.

4) Securing admin access to Scrapebox machine
- Use Chrome Remote Desktop, AnyDesk, or AnyDesk with strong passwords. For more secure setups:
  - Place the Windows host behind a VPN and only allow access from known IPs.
  - Use Apache Guacamole + VPN for browser-based remote desktop access.
- Document the admin login steps, backup credentials, and a list of who can run reports.

5) Automating future steps (optional)
- Build an admin panel (small Flask/Express app) to store incoming requests, upload report links, and email users automatically.
- Use the Formspree webhook to notify the admin system when a new request arrives.
- If volume increases, automate Scrapebox export ingestion into a script that uploads directly to S3 and triggers an email.

6) Sample reports
- sample-reports/ contains example CSVs to mirror the expected output format. Use them as templates for formatting and naming.

7) Testing checklist
- Submit test request and confirm Formspree email is received.
- Run Scrapebox to generate a sample report matching the sample CSV format.
- Upload report to chosen storage and confirm download link works.
- Send link to test email and confirm access.

If you want, I can:
- Replace the formspree_endpoint value in _config.yml with the real endpoint (when you provide it).
- Add a simple admin CSV/Google Sheet tracking example and a sample email template for delivery.
- Create a small script or instructions to generate pre-signed S3 links from the command line (if you use S3).
