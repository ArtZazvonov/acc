export default {
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
    './assets/normalize.css',
    './assets/scss/style.scss'
  ],
  plugins: [
    '@/plugins/globals',
    { src: '@plugins/vee-validate', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      './assets/scss/styleResource/variables.scss'
    ]
  },
  axios: {},
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
