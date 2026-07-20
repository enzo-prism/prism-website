#!/usr/bin/env bash
#
# Create the Stripe products, prices, and Payment Links for Prism's productized
# offers, then print ready-to-paste NEXT_PUBLIC_STRIPE_LINK_* env lines.
#
# Usage:
#   bash scripts/create-stripe-links.sh           # TEST mode (safe dry run)
#   bash scripts/create-stripe-links.sh live      # LIVE mode (real, public links)
#
# Requires the Stripe CLI (https://stripe.com/docs/stripe-cli), logged in to the
# Prism account. Run from the repo root. Re-running creates NEW objects, so run
# once per mode and keep the printed links.
set -euo pipefail

MODE="${1:-test}"
if [ "$MODE" = "live" ]; then
  FLAG="--live"
else
  FLAG="--api-key ${STRIPE_TEST_KEY:-}"
  # Falls back to the CLI's stored test key when STRIPE_TEST_KEY is unset.
  [ -z "${STRIPE_TEST_KEY:-}" ] && FLAG=""
fi

SITE="https://www.design-prism.com"
jid() { python3 -c "import sys,json;print(json.load(sys.stdin)['id'])"; }
jurl() { python3 -c "import sys,json;print(json.load(sys.stdin)['url'])"; }

echo "Creating products ($MODE mode)..." >&2
P_WEB=$(stripe products create $FLAG -d "name=Prism Website" -d "description=A custom website, delivered in 7 days. Infinite iterations until you love it." | jid)
P_CARE=$(stripe products create $FLAG -d "name=Prism Website Care" -d "description=Monthly hosting, updates, and ongoing edits for your Prism website." | jid)
P_COS=$(stripe products create $FLAG -d "name=Prism Content OS" -d "description=AI agents that scale your content and ads across every platform and your website. Three-month implementation." | jid)
P_COSM=$(stripe products create $FLAG -d "name=Prism Content OS — Ongoing" -d "description=Ongoing optimization and management of your Content OS." | jid)
P_INF=$(stripe products create $FLAG -d "name=Prism Infinity" -d "description=Unlimited Prism services — design, web, video, content, ads, and more. One monthly subscription." | jid)

echo "Creating prices..." >&2
PR_WEB=$(stripe prices create $FLAG -d "product=$P_WEB" -d "unit_amount=30000" -d "currency=usd" | jid)
PR_CARE=$(stripe prices create $FLAG -d "product=$P_CARE" -d "unit_amount=10000" -d "currency=usd" -d "recurring[interval]=month" | jid)
PR_COS=$(stripe prices create $FLAG -d "product=$P_COS" -d "unit_amount=500000" -d "currency=usd" | jid)
PR_COSM=$(stripe prices create $FLAG -d "product=$P_COSM" -d "unit_amount=100000" -d "currency=usd" -d "recurring[interval]=month" | jid)
PR_INF=$(stripe prices create $FLAG -d "product=$P_INF" -d "unit_amount=200000" -d "currency=usd" -d "recurring[interval]=month" | jid)

echo "Creating payment links..." >&2
L_WEB=$(stripe payment_links create $FLAG \
  -d "line_items[0][price]=$PR_WEB" -d "line_items[0][quantity]=1" \
  -d "custom_fields[0][key]=brief" -d "custom_fields[0][label][type]=custom" \
  -d "custom_fields[0][label][custom]=Describe the website you want" -d "custom_fields[0][type]=text" -d "custom_fields[0][optional]=true" \
  -d "after_completion[type]=redirect" -d "after_completion[redirect][url]=$SITE/checkout/website/thank-you?session_id={CHECKOUT_SESSION_ID}" | jurl)
L_CARE=$(stripe payment_links create $FLAG \
  -d "line_items[0][price]=$PR_CARE" -d "line_items[0][quantity]=1" \
  -d "after_completion[type]=redirect" -d "after_completion[redirect][url]=$SITE/thank-you?source=website-care" | jurl)
L_COS=$(stripe payment_links create $FLAG \
  -d "line_items[0][price]=$PR_COS" -d "line_items[0][quantity]=1" \
  -d "after_completion[type]=redirect" -d "after_completion[redirect][url]=$SITE/thank-you?source=content-os" | jurl)
L_COSM=$(stripe payment_links create $FLAG \
  -d "line_items[0][price]=$PR_COSM" -d "line_items[0][quantity]=1" \
  -d "after_completion[type]=redirect" -d "after_completion[redirect][url]=$SITE/thank-you?source=content-os-ongoing" | jurl)
L_INF=$(stripe payment_links create $FLAG \
  -d "line_items[0][price]=$PR_INF" -d "line_items[0][quantity]=1" \
  -d "after_completion[type]=redirect" -d "after_completion[redirect][url]=$SITE/thank-you?source=infinity" | jurl)

echo "" >&2
echo "Paste these into Vercel env (or lib/payment-links.ts):" >&2
echo "NEXT_PUBLIC_STRIPE_LINK_WEBSITE=$L_WEB"
echo "NEXT_PUBLIC_STRIPE_LINK_WEBSITE_CARE=$L_CARE"
echo "NEXT_PUBLIC_STRIPE_LINK_CONTENT_OS=$L_COS"
echo "NEXT_PUBLIC_STRIPE_LINK_CONTENT_OS_MONTHLY=$L_COSM"
echo "NEXT_PUBLIC_STRIPE_LINK_INFINITY=$L_INF"
