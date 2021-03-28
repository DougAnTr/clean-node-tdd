module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    '@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
