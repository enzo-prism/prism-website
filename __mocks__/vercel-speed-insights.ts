// Jest stub for @vercel/speed-insights/next (its ESM build can't be parsed in
// jsdom). The real component only injects a script on Vercel at runtime.
export const SpeedInsights = () => null
