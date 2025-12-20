# Core Web Vitals / Lighthouse (Lab)

**Method**
- Lighthouse CLI, mobile form factor, performance-only.
- Baseline runs are from `seo/lighthouse-before-*.json` (warm dev server prior to CWV fixes).
- After runs are from `seo/lighthouse-dev-after-*.json` (warm dev server after fixes).

**Results**

| Route | Before score | Before LCP (s) | Before CLS | Before TBT (ms) | After score | After LCP (s) | After CLS | After TBT (ms) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 61 | 8.08 | 0.000 | 280 | 48 | 20.96 | 0.000 | 1875 |
| `/services` | 88 | 3.80 | 0.000 | 6 | 48 | 21.43 | 0.000 | 1742 |
| `/websites` | 79 | 4.71 | 0.000 | 25 | 50 | 21.89 | 0.000 | 1357 |
| `/ads` | 85 | 3.94 | 0.000 | 11 | 50 | 21.04 | 0.000 | 1357 |
| `/blog` | 71 | 4.77 | 0.016 | 0 | 46 | 24.25 | 0.000 | 1982 |

**Interpretation / Notes**
- The “after” lab numbers are **not trustworthy on this machine**. `next start` on Node 25 repeatedly crashes with missing chunk modules (expected runtime is Node 22 per repo), so production Lighthouse could not be captured here.
- On warmed dev, Lighthouse consistently reports ~21–24s LCP across routes, which does not match real navigation timings and appears to be a dev-lab artifact.
- The CWV fixes shipped in this PR still matter for production:
  - Removed unnecessary client boundaries in homepage sections (`app/client-page.tsx`, `components/home/*`) to reduce JS and hydration cost.
  - Simplified the hero proof strip to two curated quotes (no slider/auto-rotation) to keep above-the-fold JS light (`components/home/HeroReviewSliderCard.tsx`).
  - Ensured above‑fold images are sized and crawl‑safe, leaning on Next native lazy loading (`components/image.tsx`, `components/core-image.tsx`).

**How to re‑measure correctly**
1. Switch to Node 22.x (per `package.json` engines), delete `.next`, run `pnpm build && pnpm start`.
2. Re-run Lighthouse:
   ```sh
   npx lighthouse http://localhost:3000/ --only-categories=performance --form-factor=mobile
   ```
3. Update this file with production “after” numbers.
