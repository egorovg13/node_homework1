module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    'no-extra-semi' : "error",
    'semi': [2, always]
  }
}
