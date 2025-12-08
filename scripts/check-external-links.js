/**
 * Quick external link health check for fragile outbound URLs.
 * Uses native fetch (Node 22) to detect obvious 4xx/5xx responses.
 */

const targets = [
  {
    name: "dentiphoto dslr kit",
    url: "https://dentiphoto.com/products/dentiphoto-set-phototography"
  },
  {
    name: "dentiphoto macro lens",
    url: "https://dentiphoto.com/products/120mm-macro-lens"
  },
  {
    name: "azdentall led lamp",
    url: "https://wholesale.azdentall.com/products/dental-oral-photography-led-lamp-flash-light-with-three-foot-bracket"
  }
];

async function main() {
  let failures = 0;

  for (const target of targets) {
    try {
      const res = await fetch(target.url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(12000)
      });

      if (!res.ok) {
        failures += 1;
        console.error(`❌ ${target.name}: ${target.url} -> ${res.status} ${res.statusText}`);
      } else {
        console.log(`✅ ${target.name}: ${target.url} -> ${res.status}`);
      }
    } catch (error) {
      failures += 1;
      console.error(`❌ ${target.name}: ${target.url} -> ${error.message}`);
    }
  }

  if (failures > 0) {
    process.exitCode = 1;
  }
}

main();
