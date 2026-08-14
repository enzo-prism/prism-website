#!/usr/bin/env bash
# Per-boot Cloud Agent startup. Do not install packages or start the Next.js
# server here — install owns dependencies, and terminals owns `pnpm dev`.
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env.local ]]; then
  echo "[cloud-start] Seeding .env.local from .env.example"
  cp .env.example .env.local
fi

echo "[cloud-start] Ready"
