const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const REDIRECT_CODES = new Set([301, 302, 303, 307, 308]);
const MAX_HOPS = 10;

interface ChainStep {
  url: string;
  status: number;
  location: string | null;
}

interface CheckResult {
  url: string;
  finalStatus: number;
  redirected: boolean;
  chain: ChainStep[];
  finalUrl: string;
  error: string | null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Use POST." }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const body = await req.json();
    const urls: string[] = Array.isArray(body?.urls) ? body.urls : [];

    if (urls.length === 0) {
      return new Response(
        JSON.stringify({ error: "No URLs provided. Send { \"urls\": [\"https://...\"] }" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (urls.length > 25) {
      return new Response(
        JSON.stringify({ error: "Too many URLs. Maximum 25 per request." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const results: CheckResult[] = [];

    for (const rawUrl of urls) {
      const trimmed = String(rawUrl).trim();
      const result: CheckResult = {
        url: trimmed,
        finalStatus: 0,
        redirected: false,
        chain: [],
        finalUrl: trimmed,
        error: null,
      };

      try {
        let parsed = new URL(trimmed);
        let currentUrl = parsed.toString();
        let hops = 0;

        while (hops < MAX_HOPS) {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 12000);

          let response: Response;
          try {
            response = await fetch(currentUrl, {
              redirect: "manual",
              signal: controller.signal,
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36 LightSEOTools/1.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
              },
            });
          } finally {
            clearTimeout(timeout);
          }

          const status = response.status;
          const locationHeader = response.headers.get("location");
          const step: ChainStep = {
            url: currentUrl,
            status,
            location: locationHeader,
          };
          result.chain.push(step);

          if (REDIRECT_CODES.has(status) && locationHeader) {
            result.redirected = true;
            parsed = new URL(locationHeader, currentUrl);
            currentUrl = parsed.toString();
            hops++;
            continue;
          }

          result.finalStatus = status;
          result.finalUrl = currentUrl;
          break;
        }

        if (hops >= MAX_HOPS) {
          result.error = `Redirect chain exceeded ${MAX_HOPS} hops (possible loop).`;
          result.finalStatus = result.chain[result.chain.length - 1]?.status ?? 0;
          result.finalUrl = currentUrl;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (message.includes("aborted")) {
          result.error = "Request timed out after 12s";
        } else {
          result.error = message;
        }
      }

      results.push(result);
    }

    return new Response(
      JSON.stringify({ results }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
