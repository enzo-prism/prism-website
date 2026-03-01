#!/usr/bin/env bash
set -euo pipefail

RUNS="${SALES_CHAT_STRESS_RUNS:-20}"
INCLUDE_E2E="${SALES_CHAT_STRESS_INCLUDE_E2E:-false}"

if ! [[ "$RUNS" =~ ^[0-9]+$ ]] || [ "$RUNS" -lt 1 ]; then
  echo "SALES_CHAT_STRESS_RUNS must be a positive integer"
  exit 1
fi

echo "Running sales chat core suite ${RUNS} consecutive times..."
for i in $(seq 1 "$RUNS"); do
  echo "[sales-chat-stress] core run ${i}/${RUNS}"
  pnpm test:sales-chat:core
 done

echo "Running deterministic engine fuzz-focused check..."
pnpm exec jest __tests__/sales-chat/spec-v1-engine.test.ts --runInBand

if [ "$INCLUDE_E2E" = "true" ]; then
  echo "Running sales chat e2e checks..."
  pnpm test:sales-chat:e2e
fi

echo "Sales chat stress suite completed successfully."
