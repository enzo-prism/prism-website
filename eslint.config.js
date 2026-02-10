const nextConfig = require("eslint-config-next/core-web-vitals")

module.exports = [
  // Ignore generated build output and scratch artifacts that can contain
  // transformed code which doesn't follow our source lint rules.
  {
    ignores: [".next/**", ".vercel/**", "out/**", "build/**", "output/**", "tmp/**"],
  },
  ...nextConfig,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react-hooks/static-components": "off",
      "react-hooks/use-memo": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/next-script-for-ga": "off",
    },
  },
]
