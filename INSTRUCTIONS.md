INSTRUCTIONS — SEO Tools site (light-seo-tools)

This document explains the Supabase Auth setup for the static admin dashboard and
the generic contact form configuration.

1) Configure the contact form
- Create a Formspree account: https://formspree.io/
- Create a form and copy its endpoint (for example, https://formspree.io/f/your-id).
- Set formspree_endpoint in _config.yml, or edit the action in contact.html.
- Submit a test message from the Contact page and confirm it arrives.

2) Admin login page (Supabase Auth)
Why: Jekyll only generates static files, so there is no server-side login.
login.html signs users in to Supabase Auth in the browser, and admin.html keeps
its dashboard hidden until a session exists. Hiding a page is a user-experience
gate, not protection on its own — the data has to be protected too.

Setup:
- Supabase dashboard → Authentication → Users → Add user (email + password), or invite by email.
- Authentication → URL Configuration → Redirect URLs: add
  https://saonbd1.github.io/light-seo-tools/login.html and
  http://localhost:4000/light-seo-tools/login.html
  (required for the one-time email sign-in links).
- Project Settings → API → copy the anon public key into _config.yml →
  supabase_anon_key, then commit and push. The project URL is already set from
  supabase/config.toml.
- Enable Row Level Security on every table and add policies that check
  auth.uid() (or a role claim). Without policies the anon key can read everything.
- Edge functions that return private data must run with verify_jwt = true in
  supabase/config.toml (redirect-checker is public, so it stays false).
- Do not put secrets in admin.html: the page markup is still public, only the
  data behind it should be protected.

Testing the login flow:
- Visit /light-seo-tools/login.html, sign in with a real user, and confirm the
  redirect to /light-seo-tools/admin.html.
- Visit /light-seo-tools/admin.html in a private window and confirm it sends you
  to the login page.
- Click Sign out and confirm the session is cleared on reload.

Files: login.html (form), admin.html (dashboard), assets/auth.js (LSTAuth helper), the meta tags in
_layouts/default.html, and _config.yml (supabase_url, supabase_anon_key).
