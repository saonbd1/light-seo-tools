/*
 * Light SEO Tools — shared sign-in helper (Supabase Auth).
 *
 * Jekyll only generates static files, so there is no server to authenticate
 * against. This script keeps the sign-in experience (session storage,
 * redirects, sign-out) in the browser while Supabase Auth performs the actual
 * credential check. Anything that must stay private also needs to be
 * protected on the data side (Row Level Security, verify_jwt) — see
 * INSTRUCTIONS.md, section 8.
 *
 * Pages must load this file plus the meta tags from _layouts/default.html,
 * then call:
 *   LSTAuth.guard({ redirectTo: LSTAuth.loginUrl("/admin.html") })
 *   LSTAuth.bindNav()
 */
(function () {
  "use strict";

  var SUPABASE_JS_URL = "https://esm.sh/@supabase/supabase-js@2";
  var clientPromise = null;

  function metaContent(name) {
    var tag = document.querySelector('meta[name="' + name + '"]');
    return tag ? (tag.getAttribute("content") || "").trim() : "";
  }

  function baseurl() {
    var value = metaContent("site-baseurl");
    if (!value || value === "/") return "";
    return value.replace(/\/+$/, "");
  }

  function path(pathname) {
    var clean = String(pathname || "").replace(/^\/+/, "");
    return clean ? baseurl() + "/" + clean : baseurl() + "/";
  }

  function loginUrl(next) {
    var target = next ? path(next) : window.location.pathname;
    return path("/login.html") + "?next=" + encodeURIComponent(target);
  }

  function isConfigured() {
    return metaContent("supabase-url").indexOf("https://") === 0 && metaContent("supabase-anon-key").length > 0;
  }

  function client() {
    if (!clientPromise) {
      clientPromise = import(SUPABASE_JS_URL).then(function (mod) {
        return mod.createClient(metaContent("supabase-url"), metaContent("supabase-anon-key"), {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
      });
    }
    return clientPromise;
  }

  async function getSession() {
    if (!isConfigured()) return null;
    var supabase = await client();
    var result = await supabase.auth.getSession();
    return result.error ? null : result.data.session || null;
  }

  async function signInWithPassword(email, password) {
    var supabase = await client();
    var result = await supabase.auth.signInWithPassword({ email: email, password: password });
    if (result.error) throw result.error;
    return result.data.session || null;
  }

  async function sendSignInLink(email, redirectTo) {
    var supabase = await client();
    var result = await supabase.auth.signInWithOtp({
      email: email,
      options: { emailRedirectTo: redirectTo || window.location.href }
    });
    if (result.error) throw result.error;
    return true;
  }

  async function signOut() {
    if (!isConfigured()) return;
    var supabase = await client();
    await supabase.auth.signOut();
  }

  /*
   * Returns the active session when the visitor is signed in, otherwise calls
   * onUnauthorized and (optionally) sends them to the login page. Callers
   * decide what "signed in" means for their page.
   */
  async function guard(options) {
    options = options || {};
    var session = await getSession();
    if (session) {
      if (options.onAuthorized) options.onAuthorized(session);
      return session;
    }
    if (options.onUnauthorized) options.onUnauthorized();
    if (options.redirectTo) window.location.replace(options.redirectTo);
    return null;
  }

  /* Turns the header "Sign in" link into a "Sign out" action once a session exists. */
  async function bindNav() {
    var link = document.getElementById("nav-auth");
    if (!link || !isConfigured() || link.dataset.authBound === "true") return;
    var session = await getSession();
    if (!session) return;
    link.dataset.authBound = "true";
    link.textContent = "Sign out";
    link.setAttribute("href", "#");
    link.addEventListener("click", function (event) {
      event.preventDefault();
      signOut().then(function () {
        window.location.href = path("/");
      });
    });
  }

  window.LSTAuth = {
    baseurl: baseurl,
    path: path,
    loginUrl: loginUrl,
    isConfigured: isConfigured,
    getSession: getSession,
    signInWithPassword: signInWithPassword,
    sendSignInLink: sendSignInLink,
    signOut: signOut,
    guard: guard,
    bindNav: bindNav
  };
})();
