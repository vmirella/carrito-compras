module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // "plugin:vue/vue3-recommended",
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  }
}
