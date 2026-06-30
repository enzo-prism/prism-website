#!/usr/bin/env bash
#
# Create the live Stripe product + $300 price + Payment Link for the website
# design offer, then print the buy.stripe.com URL to paste into
# lib/payment-links.ts (LIVE_LINKS.website) or NEXT_PUBLIC_STRIPE_LINK_WEBSITE.
#
# Run from anywhere:  bash scripts/create-website-link.sh
# Requires the Stripe CLI, logged in to the Prism account.
set -euo pipefail
SITE="https://www.design-prism.com"

# Robust JSON field extraction (tolerates any non-JSON noise around the object).
field() {
  python3 -c "import sys,json; s=sys.stdin.read(); o=json.loads(s[s.index('{'):s.rindex('}')+1]); print(o['$1'])"
}

echo "Creating product…" >&2
PROD=$(stripe products create --live \
  -d "name=Prism Website Design" \
  -d "description=A custom website, delivered in 7 days. Infinite iterations until you love it." | field id)

echo "Creating \$300 one-time price…" >&2
PRICE=$(stripe prices create --live \
  -d "product=$PROD" -d "unit_amount=30000" -d "currency=usd" | field id)

echo "Creating payment link…" >&2
URL=$(stripe payment_links create --live \
  -d "line_items[0][price]=$PRICE" -d "line_items[0][quantity]=1" \
  -d "custom_fields[0][key]=brief" \
  -d "custom_fields[0][label][type]=custom" \
  -d "custom_fields[0][label][custom]=Describe the website you want" \
  -d "custom_fields[0][type]=text" \
  -d "custom_fields[0][optional]=true" \
  -d "after_completion[type]=redirect" \
  -d "after_completion[redirect][url]=$SITE/thank-you?source=website-order" | field url)

echo "" >&2
echo "✅ Created. Product=$PROD  Price=$PRICE" >&2
echo "Paste this URL into lib/payment-links.ts → LIVE_LINKS.website:" >&2
echo "$URL"
