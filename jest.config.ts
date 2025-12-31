import type { Config } from 'jest'
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const configDir = path.dirname(fileURLToPath(import.meta.url))

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: pathToFileURL(path.resolve(configDir, "jest-environment.html")).href,
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    'next-mdx-remote/rsc': '<rootDir>/__mocks__/mdxremote.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next-mdx-remote)/)'
  ],
  testPathIgnorePatterns: ['<rootDir>/__tests__/visual/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default config
