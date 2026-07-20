#!/usr/bin/env bash
#
# Point the LIVE $300 "Website by Prism" Payment Link at the on-site purchase
# confirmation page, so a completed payment can be measured.
#
# WHY THIS EXISTS
# The live link was created with `after_completion[type]=hosted_confirmation`,
# which ends the buyer's journey on Stripe's own confirmation page. They never
# return to design-prism.com, so no purchase event can fire, and GA4's
# `purchase` key event was structurally impossible to record.
#
# WHY NOT JUST RE-RUN create-website-link.sh
# That script CREATES. Re-running it would mint a duplicate product, price, and
# payment link, leaving the URL hard-coded in lib/payment-links.ts pointing at
# the old, still-broken one. This script UPDATES the existing link in place, so
# the URL already live on the site keeps working and simply starts redirecting.
#
# Usage:
#   ./scripts/update-website-payment-link.sh            # dry run: show current + planned
#   ./scripts/update-website-payment-link.sh --apply    # perform the live update
#
set -euo pipefail

PLINK="${STRIPE_WEBSITE_PLINK:-plink_1To6KGKoSN7Q6Za2ZEKgDf2p}"
SITE="${SITE_URL:-https://www.design-prism.com}"
# {CHECKOUT_SESSION_ID} is substituted by Stripe at redirect time. It is what
# makes the purchase conversion trustworthy: it proves the visitor came through
# checkout, and gives GA4 and Google Ads a stable de-duplication key.
REDIRECT_URL="$SITE/checkout/website/thank-you?session_id={CHECKOUT_SESSION_ID}"

if ! command -v stripe >/dev/null 2>&1; then
  echo "error: the Stripe CLI is not installed or not on PATH." >&2
  exit 1
fi

echo "Payment link : $PLINK"
echo "Redirect to  : $REDIRECT_URL"
echo

echo "Current live configuration:"
stripe payment_links retrieve "$PLINK" --live \
  | python3 -c "
import json, sys
link = json.load(sys.stdin)
print('  active          :', link.get('active'))
print('  url             :', link.get('url'))
print('  after_completion:', json.dumps(link.get('after_completion'), indent=2).replace('\n', '\n  '))
"
echo

if [[ "${1:-}" != "--apply" ]]; then
  cat <<EOF
Dry run only — nothing was changed.

Re-run with --apply to update the live link:

  ./scripts/update-website-payment-link.sh --apply

After applying, place one real \$300 test purchase (or use a Stripe test-mode
link) and confirm that:
  1. Stripe redirects to $SITE/checkout/website/thank-you?session_id=cs_live_...
  2. GA4 DebugView shows one 'purchase' event with that session id as transaction_id
  3. A second visit to the same URL fires nothing (de-duplication works)
EOF
  exit 0
fi

echo "Applying live update…"
stripe payment_links update "$PLINK" --live \
  -d "after_completion[type]=redirect" \
  -d "after_completion[redirect][url]=$REDIRECT_URL" >/dev/null

echo "Verifying:"
stripe payment_links retrieve "$PLINK" --live \
  | python3 -c "
import json, sys
link = json.load(sys.stdin)
completion = link.get('after_completion') or {}
url = (completion.get('redirect') or {}).get('url')
ok = completion.get('type') == 'redirect' and url and '/checkout/website/thank-you' in url
print('  after_completion type:', completion.get('type'))
print('  redirect url         :', url)
print()
print('✅ Updated. Purchases now return to the site and can be measured.' if ok
      else '❌ Update did not take effect — inspect the link in the Stripe dashboard.')
sys.exit(0 if ok else 1)
"
