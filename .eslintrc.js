module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'explicit-module-boundary-types': 0,
    'no-explicit-any': 0,
  },
};
