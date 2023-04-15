module.exports = {
  roots: ["<rootDir>"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/pages/",
    "<rootDir>/src/modules/scripts/",
  ],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.{services,type}.ts"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  reporters: ["default", "jest-junit"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
};
