module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  globals: {
    liff: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2015
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  overrides: [
    {
      files: [
        'tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      },
      excludedFiles: "cypress/**/*.{j,t}s"
    }
  ]
}
