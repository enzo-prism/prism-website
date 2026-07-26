const nextConfig = require("eslint-config-next/core-web-vitals")

module.exports = [
  // Ignore generated build output and scratch artifacts that can contain
  // transformed code which doesn't follow our source lint rules.
  {
    ignores: [
      ".next/**",
      ".vercel/**",
      ".claude/**",
      "out/**",
      "build/**",
      "output/**",
      "tmp/**",
    ],
  },
  ...nextConfig,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "react/no-unescaped-entities": "off",

      // The react-hooks family is the only automated defence this codebase has
      // against stale-closure and effect-loop bugs, and roughly three quarters
      // of `components/` is client-side. It was switched fully off, so `pnpm
      // lint` reported a clean run while ~80 real violations sat unreported.
      //
      // These are "warn", not "error", on purpose: CI runs plain `pnpm lint`
      // (no --max-warnings 0), so violations are visible in every local run and
      // CI log without blocking a deploy on pre-existing debt. Fix them down to
      // zero, then promote the family to "error" so new ones cannot land.
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/use-memo": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/next-script-for-ga": "off",
    },
  },
]
