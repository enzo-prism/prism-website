#!/usr/bin/env node

const BASE_URL = process.env.SEO_BASE_URL || "https://www.design-prism.com";

const KEY_ROUTES = [
  "/",
  "/services",
  "/websites",
  "/ads",
  "/local-listings",
  "/seo",
  "/blog",
  "/case-studies",
  "/contact",
  "/get-started",
];

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" });
  const text = await res.text();
  return { res, text };
}

function hasCanonical(text) {
  return /<link[^>]+rel=["']canonical["'][^>]*>/i.test(text);
}

function hasNoindex(text) {
  return /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(text)
    || /<meta[^>]+name=["']googlebot["'][^>]+noindex/i.test(text);
}

function summarize(result) {
  const icon = result.ok ? "✅" : "❌";
  return `${icon} ${result.path}  status=${result.status} canonical=${result.canonical ? "yes" : "no"} noindex=${result.noindex ? "yes" : "no"}`;
}

(async function main() {
  const results = [];

  for (const path of KEY_ROUTES) {
    const url = `${BASE_URL}${path}`;
    try {
      const { res, text } = await fetchText(url);
      const status = res.status;
      const canonical = hasCanonical(text);
      const noindex = hasNoindex(text);
      const ok = status === 200 && canonical && !noindex;

      results.push({ path, status, canonical, noindex, ok });
    } catch (error) {
      results.push({ path, status: "ERR", canonical: false, noindex: false, ok: false, error: String(error) });
    }
  }

  const { res: robotsRes, text: robotsText } = await fetchText(`${BASE_URL}/robots.txt`);
  const { res: sitemapRes, text: sitemapText } = await fetchText(`${BASE_URL}/sitemap.xml`);

  console.log(`\nSEO P0 check :: ${BASE_URL}`);
  console.log(`robots.txt status=${robotsRes.status}`);
  console.log(`sitemap.xml status=${sitemapRes.status}`);

  const robotsOk = robotsRes.status === 200 && /Sitemap:\s*https:\/\/www\.design-prism\.com\/sitemap\.xml/i.test(robotsText);
  const sitemapOk = sitemapRes.status === 200 && /<urlset|<sitemapindex/i.test(sitemapText);

  console.log(`robots sitemap line=${robotsOk ? "yes" : "no"}`);
  console.log(`sitemap parseable=${sitemapOk ? "yes" : "no"}\n`);

  results.forEach((r) => console.log(summarize(r)));

  const failed = results.filter((r) => !r.ok);
  const pass = failed.length === 0 && robotsOk && sitemapOk;

  console.log(`\nResult: ${pass ? "PASS" : "FAIL"} (${results.length - failed.length}/${results.length} routes healthy)`);

  if (!pass) {
    if (!robotsOk) console.log("- robots.txt check failed");
    if (!sitemapOk) console.log("- sitemap.xml check failed");
    failed.forEach((f) => console.log(`- route failed: ${f.path}`));
    process.exit(1);
  }
})();
