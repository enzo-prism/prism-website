/* eslint-disable no-console */
const DEFAULT_ORIGIN = "https://www.design-prism.com";
const DEFAULT_PATHS = [
  "/",
  "/services",
  "/websites",
  "/ads",
  "/local-listings",
  "/pricing",
  "/case-studies",
  "/blog",
];

type RedirectHop = { url: string; status: number };

function getArgValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function extractCanonical(html: string): string | null {
  const linkMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!linkMatch) return null;
  const hrefMatch = linkMatch[0].match(/href=["']([^"']+)["']/i);
  return hrefMatch?.[1] ?? null;
}

async function fetchRedirectChain(startUrl: string, maxHops = 10) {
  const chain: RedirectHop[] = [];
  let currentUrl = startUrl;

  for (let i = 0; i < maxHops; i += 1) {
    const response = await fetch(currentUrl, { redirect: "manual" });
    chain.push({ url: currentUrl, status: response.status });

    if (
      response.status >= 300 &&
      response.status < 400 &&
      response.headers.get("location")
    ) {
      const location = response.headers.get("location")!;
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }

    const contentType = response.headers.get("content-type") ?? "";
    let canonical: string | null = null;

    if (contentType.includes("text/html")) {
      const html = await response.text();
      canonical = extractCanonical(html);
    }

    return {
      chain,
      finalUrl: currentUrl,
      canonical,
    };
  }

  return {
    chain,
    finalUrl: currentUrl,
    canonical: null,
  };
}

async function main() {
  const origin = getArgValue("--origin") ?? DEFAULT_ORIGIN;
  const pathsArg = getArgValue("--paths");
  const paths =
    pathsArg?.split(",").map((p) => p.trim()).filter(Boolean) ?? DEFAULT_PATHS;

  console.log(`Origin: ${origin}`);
  console.log("");

  for (const path of paths) {
    const startUrl = new URL(path, origin).toString();
    try {
      const result = await fetchRedirectChain(startUrl);
      const chainText = result.chain
        .map((hop) => `${hop.status} ${hop.url}`)
        .join(" -> ");
      console.log(`${path}`);
      console.log(`  chain: ${chainText}`);
      console.log(`  final: ${result.finalUrl}`);
      console.log(`  canonical: ${result.canonical ?? "none"}`);
      console.log("");
    } catch (error) {
      console.log(`${path}`);
      console.log(`  error: ${(error as Error).message}`);
      console.log("");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

