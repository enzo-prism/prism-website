# Search appearance notes

**Favicon**
- Icons are declared via Next.js metadata in `app/layout.tsx`.
- `rel="icon"` points to `/favicon-rounded.png` with sizes `32x32` and `192x192`, plus Apple touch icon `180x180`.
- Files live in `public/` and are crawlable at `https://www.design-prism.com/favicon-rounded.png`.

**Site name + brand signals**
- Global JSON‑LD lives in `components/schema-markup.tsx` (`GlobalSchemaGraph`) and is rendered in `app/layout.tsx`.
- Includes `Organization` + `WebSite` nodes using the canonical origin `https://www.design-prism.com` and the social profiles shown in the footer.

**How to validate**
1. Open the homepage source and confirm favicon links and a JSON‑LD script exist.
2. Run Google Rich Results Test on `https://www.design-prism.com/` and confirm `Organization` / `WebSite` are detected without warnings.
3. In Search Console → Appearance, watch for correct favicon + “Prism” site name as pages recrawl.

