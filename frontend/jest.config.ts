// Jest configuration file
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ["<rootDir>/jestTests/**/*.test.{js,jsx,ts,tsx}"],
    setupFilesAfterEnv: ["<rootDir>/src/jestSetup.tsx"],
    transform: {
        // This is a regular expression that tells Jest to use ts-jest to transform TypeScript files
        "^.+\\.(js|jsx|ts|tsx)$": "ts-jest"},
    //transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"],
    moduleNameMapper: {
        '^@testing-library/jest-dom/extend-expect$': '<rootDir>/node_modules/@testing-library/jest-dom/',
    },
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/src/.+\\.css$" // Exclude .css files inside src directory from coverage reports
  ],
};

export default config;