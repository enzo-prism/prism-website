#!/usr/bin/env bash
# Durable Cloud Agent bootstrap. Runs during environment builds after checkout.
# Must stay idempotent: later builds may reuse prepared disk state.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "[cloud-install] Enabling Corepack and pinning pnpm 10.0.0"
corepack enable
corepack prepare pnpm@10.0.0 --activate

echo "[cloud-install] Installing repository dependencies from the lockfile"
pnpm install --frozen-lockfile

if [[ ! -f .env.local ]]; then
  echo "[cloud-install] Seeding .env.local from .env.example"
  cp .env.example .env.local
fi

echo "[cloud-install] Installing Playwright browsers used by visual suites"
pnpm exec playwright install --with-deps chromium firefox webkit

echo "[cloud-install] Toolchain"
node -v
pnpm -v
pnpm exec playwright --version
echo "[cloud-install] Complete"
