/* eslint-disable nuxt/no-cjs-in-config */
require('dotenv').config()
module.exports = {
  // server: {
  //   port: 3000,
  //   host: '172.16.82.7'
  // },
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
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/scss/style.scss'
  ],
  plugins: [
    '@/plugins/globals',
    '@/plugins/axios',
    { src: '@plugins/vee-validate', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
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
    scss: []
  },
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    transpile: ['vee-validate/dist/rules', /^element-ui/]
  }
}
