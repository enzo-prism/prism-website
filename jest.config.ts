import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    'next-mdx-remote/rsc': '<rootDir>/__mocks__/mdxremote.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next-mdx-remote)/)'
  ],
  testPathIgnorePatterns: ['<rootDir>/__tests__/visual/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
}

export default config
