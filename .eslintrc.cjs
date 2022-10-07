// Basic rules
const basic = {
  // No waiting in for loop (it's very bad for performance)
  'no-await-in-loop': 'warn',

  // No curly braces in default string
  'no-template-curly-in-string': 'error',

  // Require maximum lines in one file
  'max-lines': [
    'error',
    {
      max: 1000,
      skipComments: true,
    },
  ],

  // Maximum parametres in one function
  'max-params': ['error', 3],

  // Restrict alert use
  'no-alert': 'error',

  // Disallow console use
  'no-console': [
    'error',
    {
      allow: ['warn', 'error'],
    },
  ],

  // Bracket spacing
  'array-bracket-spacing': ['error', 'always'],

  // Restrict use of "undefined" in assignment
  'no-undef-init': 'error',

  // Restrict use of async without await in function body
  'require-await': 'error',

  // Dissalow mutli-spaces
  'no-multi-spaces': 'error',

  // Comments spacing
  'lines-around-comment': [
    'warn',
    {
      beforeBlockComment: true,
      beforeLineComment: true,
      allowBlockStart: false,
      allowClassStart: false,
      allowObjectStart: false,
      allowArrayStart: false,
    },
  ],
};

// Typescript ESLint rules
const typescript = {

  // Expliticit return type of a function
  // LINK: https://typescript-eslint.io/rules/explicit-function-return-type
  '@typescript-eslint/explicit-function-return-type': 'error',
};

// Naming conventions for TypeScript and Vue
const namingConventions = {

  // Capitalize every comment first letter
  'capitalized-comments': [
    'warn',
    'always',
    {
      ignoreInlineComments: false,
    },
  ],
  '@typescript-eslint/naming-convention': [
    'error',

    // All typings are PascalCase
    {
      selector: 'typeParameter',
      format: ['PascalCase'],
    },

    // All intereface doesn't start with capital I
    {
      selector: 'interface',
      format: ['PascalCase'],
      custom: {
        regex: '^I[A-Z]',
        match: false,
      },
    },

    // All functions and variables are camelCase
    {
      selector: ['function', 'parameter'],
      format: ['camelCase'],
      leadingUnderscore: 'allow',
    },

    // All variables starts with camelCase or UPPER_CASE
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE'],
    },

    // All private members starts with underscore
    {
      selector: 'memberLike',
      modifiers: ['private'],
      format: ['camelCase'],
      leadingUnderscore: 'require',
    },
  ],
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      '<template>': 'espree',
      js: 'espree',
      ts: '@typescript-eslint/parser',
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
    extraFileExtensions: ['.vue'],
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    "eslint-plugin-tsdoc",
],
  rules: {
    ...basic,
    ...namingConventions,
    ...typescript,
    
    // TSDoc warnings
    "tsdoc/syntax": "warn",
  },
};
