module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  testPathIgnorePatterns: ['/node_modules/', '/dist'],
  collectCoverage: true,
  verbose: true,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(s?css|less)$': 'identity-obj-proxy',
  },
};
