/* eslint-disable nuxt/no-cjs-in-config */
require('dotenv').config()
module.exports = {
  telemetry: false,
  publicRuntimeConfig: {
    baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000'
  },
  head: {
    title: 'aps',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Application processing system' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/normalize.css',
    '@/assets/scss/style.scss'
  ],
  plugins: [
    '@/plugins/globals',
    '@/plugins/axios',
    { src: '@plugins/vee-validate', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  axios: {},
  dotenv: {
    systemvars: true
  },
  styleResources: {
    scss: [
      '@/assets/scss/styleResource/variables.scss'
    ]
  },
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    transpile: ['vee-validate/dist/rules']
  }
}
