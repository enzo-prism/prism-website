# Public data verification — October 4, 2026

This refresh supersedes the current claims in the August 30 snapshot. Historical evidence remains in that dated document. Sources were read on October 4, 2026 Pacific; source reporting windows differ.

## Client traffic

**5,310 GA4 new users recorded across 16 measured client sites in September 2026.** Each report filters the listed domain's production apex and www hostnames. One property per client excludes duplicate properties, localhost, staging and preview traffic. This is a sum of GA4 new users, not deduplicated people across sites or a claim that Prism caused all acquisition. All reports use America/Los_Angeles and reported no sampling or other-row data loss.

This newly documented cohort is not comparable with the old 16,882/17-site July claim, whose exact membership was not recoverable. Eight case-study clients were excluded for missing accessible matching production data or no website URL: Laguna Beach Dental Arts, sr4 Partners, Infobell IT Solutions, Canary Foundation, We Are Saplings, Mataria Dental Group, Waikiki Dental, Sacramento Dental Medicine.

| Client                         | Production domain                | September new users |
| ------------------------------ | -------------------------------- | ------------------: |
| Dr. Christopher B. Wong        | chriswongdds.com                 |                 230 |
| Exquisite Dentistry            | exquisitedentistryla.com         |                  46 |
| Olympic Bootworks              | olympicbootworks.com             |                 139 |
| Family First Smile Care        | famfirstsmile.com                |                   0 |
| Town Centre Dental             | towncentredental.net             |                 134 |
| Grace Dental Santa Rosa        | tingjenjidds.com                 |                 193 |
| Roseville Dental Academy       | rosevilledentalacademy.com       |               3,348 |
| Rebellious Aging               | rebelwithsuz.com                 |                 180 |
| Wine Country Root Canal        | winecountryrootcanal.com         |                 292 |
| Belize Kids                    | belizekids.org                   |                  35 |
| Canary Cove                    | canarycove.com                   |                 187 |
| Coast Periodontics             | coastperiodontics.com            |                 213 |
| Practice Transitions Institute | practicetransitionsinstitute.com |                  28 |
| Leadership Retreat             | dentistretreat.com               |                   1 |
| Dental Strategies              | michaelnjodds.com                |                   5 |
| Saorsa Growth Partners         | saorsapartners.com               |                 279 |

Family First reports zero new users and one session; that is a coverage warning, not evidence of no real visitors.

## Case-study claims

| Client                   | Verified result                                          | Exact source window                               |
| ------------------------ | -------------------------------------------------------- | ------------------------------------------------- |
| Dr. Christopher B. Wong  | 21,426 vs 14,411 impressions, +49% YoY                   | GSC July 5–October 2, 2026 vs 2025                |
| Dr. Christopher B. Wong  | 6,287 vs 6,114 impressions, +2.8% YoY                    | GSC September 2026 vs 2025                        |
| Olympic Bootworks        | 8,040 vs 14,129 impressions, −43% YoY; 455 vs 604 clicks | GSC July 5–October 2, 2026 vs 2025                |
| Olympic Bootworks        | 2,554 sessions, 2,255 new users                          | GA4 July 6–October 3, 2026; production hosts only |
| Belize Kids              | 2,490 vs 1,555 impressions, +60% YoY                     | GSC July 5–October 2, 2026 vs 2025                |
| Roseville Dental Academy | 704 clicks, 24,110 impressions                           | GSC September 2026                                |
| Saorsa Growth Partners   | 24 vs 10 clicks, 2.4×; 1,411 vs 505 impressions, +179%   | GSC September vs January 2026                     |

GSC values were read from authenticated Search Console with exact impressions, not rounded display abbreviations. Saorsa compares calendar-month totals of different lengths (30 and 31 days), not equal-length windows. Olympic's old growth claim is replaced with its measured decline. Rolling GSC and GA4 dates differ because of source availability. October 3 GA4 may still undergo normal processing.

## Social channels

| Channel   |                  Verified audience |                                Activity | Source/window                                                                  |
| --------- | ---------------------------------: | --------------------------------------: | ------------------------------------------------------------------------------ |
| YouTube   | 24,718 subscribers (24.7K display) | 5,839,447 lifetime views (5.8M display) | Native YouTube Studio, correct Prism channel; lifetime through October 3, 2026 |
| Instagram |     37,019 followers (37K display) |                               645 posts | Ayrshare account analytics, October 4, 2026                                    |
| TikTok    |   11,728 followers (11.7K display) |                            1,100 videos | Ayrshare; latest valid follower snapshot October 3, retrieved October 4        |

Combined subscriptions/followers: 73,465, conservatively displayed as **73K+**. This is not deduplicated people. TikTok's October 4 zero-filled row was incomplete. Ayrshare's views period label conflicts with its daily-array range, so the stale 1.2M/60-day claim is removed in favor of verified followers and videos. YouTube API was rate-limited; native Studio supplied the verification. YouTube lifetime views since June 5, 2013 include legacy gaming content and public/private/unlisted/deleted videos; they are not agency campaign views or current reach.

## Synchronization and reporting

- Canonical shared proof: `lib/proof-metrics.ts`; case-study results: `lib/case-study-data.ts`.
- Roseville's custom cards describe delivered admissions capabilities; its source measurements remain in this audit.
- Homepage shows the traffic month and TikTok follower date. Machine-readable `public/ai-data.json` and `public/llms.txt` carry the same values/windows.
- `pnpm seo:ai-report` defaults to Prism Website GA4 property 508295014, with optional `GA4_PROPERTY_ID` override. Retrieval failures now stop the script instead of being represented as no traffic. Local gog authentication was unavailable; live GA4 evidence used the authenticated connector.
- Vercel Analytics uses a separate visitor/pageview model; its dashboard data was used in the accompanying analysis and is not added to GA4 or used to replace these client-traffic claims.


## Prism website performance and measurement follow-up

These are Prism's own website results, separate from the 16-client portfolio headline:

- GA4 property **508295014**, production hostnames, September 6–October 3 versus August 9–September 5: **414 vs 604 users, 461 vs 684 sessions, 828 vs 1,123 views**. Sessions declined 32.6%; Direct accounted for 180 of the 223-session net decline. The old property 383270357 returned no rows for this period.
- GSC `sc-domain:design-prism.com`, Web (text), September 5–October 2 versus August 8–September 4: **20 vs 26 clicks, 2,123 vs 2,360 impressions**, average position 11 vs 14.7. Its window ends one day before the GA4/Vercel window.
- Vercel Production, September 6–October 3 Pacific: **531 visitors, 933 pageviews**, with dashboard-displayed declines of 30% and 33%. The connector returned 404; the authenticated dashboard supplied these values. An API error must never become a zero-traffic claim.
- GA4 recorded **0 vs 20 key events**. The last `generate_lead` was September 5, and the public sales funnel changed to an at-capacity waitlist on September 14. Review accepted form submissions and waitlist completion instrumentation before interpreting this as a decline in actual business leads. Analytics events alone do not prove accepted leads.
- GSC reported 58 indexed URLs and 478 not indexed, including 376 crawled/not indexed, 40 discovered/not indexed, 36 noindex, 15 not found, 8 redirects, 2 alternate canonicals, and 1 duplicate without a selected canonical. Reconcile with the intentional search-visibility policy before changing indexability.

## Validation and release

The refresh is tracked in [PR #194](https://github.com/enzo-prism/prism-website/pull/194). The reviewed implementation passed:

- 107 Jest suites / 542 tests.
- 23 locked visual checks, with 7 intentional skips and unchanged screenshot baselines.
- Typecheck and pricing consistency checks.
- Lint with zero errors; 71 existing warnings remained, while touched files were clean.
- Independent metric arithmetic, source-window, and duplicate-copy review.
- GitHub PR CI and both Vercel preview deployments; the hosted preview was read back in Chrome.

Production publication was explicitly authorized on October 4, 2026. Merge through `main` and use the existing `Deploy to Vercel` workflow, including its blocking UI-lock and mobile-navbar checks. Completion requires a successful production run plus live-domain readback of the homepage, changed case studies, `ai-data.json`, and `llms.txt`; preview success alone is not production verification.

## Case-study editorial policy

Public case studies select only clearly favorable, verified proof with its source and full comparison window. They are portfolio highlights, not comprehensive analytics reports. Declines, marginal gains, small-base multipliers, and raw counts without a meaningful benchmark are omitted rather than reframed as growth. When no strong metric qualifies, describe the delivered capabilities without implying measured growth. Retain the full source findings above for operational review.

The October 4 editorial follow-up retains Wong +49% and Belize +60% year-over-year impressions. It removes Wong +2.8%, all Olympic metrics, Roseville raw counts, and Saorsa small-base comparisons from case-study cards, narratives, related marketing copy, and AI summaries. Existing favorable client review ratings remain reputation evidence, not results attributed to Prism.

The full case-study mobile check also exposed a long-domain overflow on PTI. The shared visual hero now constrains its mobile grid to one flexible column. Existing Prism tokens and component styles are preserved; no design tokens were added.

## TikTok homepage activity update

At the account owner’s request, the TikTok secondary homepage stat now shows **421.3K likes** instead of 1,100 videos. The rounded current profile count was supplied by the owner on October 4, 2026; it is not represented as an exact API count. Follower data and the combined audience total are unchanged. Shared proof data and the AI-readable snapshot use the same likes label and value.

## Social-only refresh — October 17, 2026

This section supersedes the social snapshot above. Client traffic, case-study metrics, and dated Reel screenshots were not refreshed. Authenticated Ayrshare `/user` confirmed `the_design_prism` on Instagram and TikTok, and YouTube channel `UCeCUgNesbfaRG2E_ps6gGbw` (`@the_design_prism`). Separate read-only `/analytics/social` requests returned success for all three platforms on October 17 Pacific (October 18 around 06:17 UTC).

| Channel | API audience | Activity | Website display |
| --- | ---: | ---: | --- |
| Instagram | 36,884 followers | 647 posts | 36.9K followers; 647 posts |
| TikTok | 12,300 followers | 436,991 likes | 12.3K followers; 437K likes |
| YouTube | 24,700 subscribers, API-rounded | 5,807,904 channel views | 24.7K subscribers; 5.8M channel views |

API audience sum: **73,884**, conservatively displayed as **73K+**. This sum includes YouTube's rounded subscriber count and is not an exact or deduplicated audience count. TikTok's response explicitly backfilled from `2026-10-17T17:00:49.304Z`; its valid nonzero snapshot is dated October 17. No rolling-period view or reach claim was added.

YouTube's `viewCount` is a channel total, distinct from the prior YouTube Studio lifetime measurement. The new figure is not evidence of a decline against that older figure. It includes earlier channel content, including legacy gaming, and is not client campaign performance or current reach. The old assertion that the count includes every private, unlisted, and deleted video is removed. [YouTube's channel documentation](https://developers.google.com/youtube/v3/docs/channels/) explains subscriber rounding; [Ayrshare's analytics overview](https://app.ayrshare.com/docs/apis/analytics/overview) describes account analytics.

`SOCIAL_PROOF_VERIFIED_AT` separately dates social proof; `PROOF_METRICS_VERIFIED_AT` and the full-audit `last_verified` remain October 4. `public/ai-data.json` has a social-specific verification date and labels rounded values without claiming exactness. Public pages read the shared social snapshot. The stripped-down social link hubs remain free of stats.

Raw authenticated responses are retained locally in `work/social-stats-2026-10-17/` and are not release files. The user explicitly authorized updating project docs, pushing to `main`, and publishing production in the October 17 session. Use the existing GitHub Actions `Deploy to Vercel` workflow; verify the exact pushed commit, successful run, and live-domain stats before calling the release complete.

Local validation: 51 relevant Jest tests passed; typecheck, production build, pricing consistency, and diff checks passed. Lint completed with 0 errors and 20 warnings outside the changed files. Visual run: 45 passed, 6 skipped, and one mobile synthetic heading negative-control failure; the isolated unchanged test passed on retry (1 passed). No screenshot baselines were changed. These are local checks; release completion is established separately by the production workflow and live readback.

Release preflight: all 95 Jest suites / 561 tests passed. `pnpm design:check` completed with zero errors and existing token-usage warnings; generated tokens did not change. Project README, page overview, and design contract now document Ayrshare channel-view semantics. Raw local evidence remains excluded from Git.
