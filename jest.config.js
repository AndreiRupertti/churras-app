
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})
const customConfig = {
  'clearMocks': true,
  'coverageDirectory': '.coverage',
  'setupFilesAfterEnv': ['./jest.setup.js'],
  'testEnvironment': 'jsdom',
  'globals': { fetch },
  "transform": {
    "^.+\\.svg$": "jest-transformer-svg"
  },
  'moduleNameMapper': {
      "^@app(|/.*)$": ["<rootDir>/src/app/$1"],
      "^@public(|/.*)$": ["<rootDir>/public/$1"],
      "^@components(|/.*)$": ["<rootDir>/src/components/$1"],
      "^@utils(|/.*)$": ["<rootDir>/src/utils/$1"],
      "^@globals(|/.*)$": ["<rootDir>/src/globals/$1"],
      "^@http(|/.*)$": ["<rootDir>/src/http/$1"],
      "^@enums(|/.*)$": ["<rootDir>/src/enums/$1"],
      "^@server(|/.*)$": ["<rootDir>/src/server/$1"],
  }
}

module.exports = createJestConfig(customConfig)