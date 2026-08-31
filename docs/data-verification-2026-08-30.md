# Public data verification — August 30, 2026

This snapshot records the sources and measurement windows used for the August
30, 2026 site-wide data refresh. It intentionally excludes credentials,
person-level analytics, and private account identifiers.

## Analytics proof

| Surface                  |                                              Published value | Window                           | Source                         |
| ------------------------ | -----------------------------------------------------------: | -------------------------------- | ------------------------------ |
| Connected client traffic |                  16,882 new users across 17 production sites | July 2026, latest complete month | GA4, production hostnames only |
| Dr. Christopher B. Wong  |                       22,660 vs 8,704 impressions, +160% YoY | May 31–August 28, 2026 vs 2025   | Google Search Console          |
| Olympic Bootworks        |                         10,129 vs 9,373 impressions, +8% YoY | May 31–August 28, 2026 vs 2025   | Google Search Console          |
| Olympic Bootworks        |                         10,709 sessions and 10,151 new users | May 31–August 28, 2026           | GA4                            |
| Belize Kids              |                        2,903 vs 1,313 impressions, +121% YoY | May 31–August 28, 2026 vs 2025   | Google Search Console          |
| Roseville Dental Academy |                            701 clicks and 17,506 impressions | July 2026, latest complete month | Google Search Console          |
| Saorsa Growth Partners   | 19 vs 10 monthly clicks and 1,080 vs 505 monthly impressions | January–July 2026                | Google Search Console          |

Rolling 90-day comparisons must always publish exact dates. Do not copy an old
percentage forward when the window changes.

## Public social profiles

| Channel   |      Public count |                               Other public or authenticated proof | Checked         |
| --------- | ----------------: | ----------------------------------------------------------------: | --------------- |
| YouTube   | 24.7K subscribers |                                                 5.8M public views | August 30, 2026 |
| Instagram |     37K followers |                                                  644 public posts | August 30, 2026 |
| TikTok    |   11.4K followers | 1.2M views in the authenticated 60-day snapshot checked August 21 | August 30, 2026 |

The rounded combined audience is `73K+`.

## Client and route corrections

- Family First Smile Care: Dr. Tim J. Chuang is the current founder, owner, and lead dentist.
- Coast Periodontics: Dr. Bryce Chun leads the current practice in San Luis Obispo.
- sr4 Partners: Todd “Ish” Israelite is the founding partner; use Evanston, Illinois.
- Infobell IT Solutions: current positioning is AI, HPC, cloud, product engineering, and software products; corporate office is Bengaluru.
- Belize Kids: Don Listwin is the founder; use the current `Belize Kids` brand.
- We Are Saplings: children’s emotional learning through storytelling, mindfulness, and play; founded by Clare Frattarola.
- Practice Transitions Institute: founded by Dr. Michael Njo.
- Leadership Retreat: Thompson Savannah, Savannah, Georgia, June 4–6, 2026.
- Exquisite Dentistry: Los Angeles, California.
- Canary Cove: fully staffed private beachfront estate on Ambergris Caye.
- Olympic e-bikes: link to the current Olympic Bootworks e-bike catalog and inquiry flow.
- Laguna Beach Dental Arts: suppress outbound live-site links while the client destination returns HTTP 500.

## Platform guidance

- Google Workspace HIPAA included functionality was checked against Google’s
  [May 14, 2026 list](https://workspace.google.com/terms/2015/1/hipaa_functionality/).
- Google Local Services copy uses the current
  [Google Verified badge](https://support.google.com/localservices/answer/16498018)
  and does not advertise the discontinued Google Guarantee.
- OpenAI capabilities use durable, model-agnostic wording. Current model names
  should only be added when a page needs them and should be checked against the
  [official model catalog](https://developers.openai.com/api/docs/models).

## Integrity rules

- Shared social proof lives in `lib/proof-metrics.ts`.
- Shared case data lives in `lib/case-study-data.ts`.
- Machine-readable public proof in `public/ai-data.json` and `public/llms.txt`
  must be updated in the same change.
- The Wall of Love contains 242 unique author-and-comment pairs after duplicate
  removal.
- Broken client destinations are never presented as live-site calls to action.
