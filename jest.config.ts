import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'https://www.design-prism.com/',
  },
  moduleNameMapper: {
    '^@/(.*)\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    'next-mdx-remote/rsc': '<rootDir>/__mocks__/mdxremote.js',
    '^@vercel/analytics$': '<rootDir>/__mocks__/vercel-analytics.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(next-mdx-remote)/)'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/visual/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default config
