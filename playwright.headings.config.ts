import { defineConfig } from '@playwright/test'

import animationsConfig from './playwright.animations.config'

export default defineConfig({
  ...animationsConfig,
  testMatch: ['heading-descenders.spec.ts'],
})
