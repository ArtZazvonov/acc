module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'eslint-disable vue/html-indent': 'off',
    'no-tabs': 0,
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 15,
        allowFirstLine: true
      },
      multiline: {
        max: 15,
        allowFirstLine: true
      }
    }],
    'vue/valid-v-slot': ['error', {
      allowModifiers: true
    }]
  }
}
