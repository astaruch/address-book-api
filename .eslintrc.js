'use strict'

// Put this file to the directory where your node.js code is located. This could be the root
// directory, or a subdirectory if your project consists of both node.js and browser code.
module.exports = {
  extends: [
    '@strv/eslint-config-node/v10',
    '@strv/eslint-config-node/optional',
    '@strv/eslint-config-typescript',
    '@strv/eslint-config-typescript/style',
  ],
  overrides: [{
    files: [
      'src/**/*.ts'
    ],
    rules: {
      'node/no-unsupported-features/es-syntax': 'off',
    }
  }]
}
