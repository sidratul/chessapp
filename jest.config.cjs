module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/__tests__/**/*.ts"],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\.{1,2}/.*)\.js$': '$1',
  },
  transform: {
    '^.+\.ts$': ['ts-jest', {
      useESM: true,
    }],
  },
};