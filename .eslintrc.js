module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus' : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len' : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-expressions' : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-shadow' : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
