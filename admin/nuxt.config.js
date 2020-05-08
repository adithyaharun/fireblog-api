
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: (title) => title ? `${title} | FireBlog` : 'FireBlog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "node_modules/easymde/dist/easymde.min.css"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/icons"
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://asia-east2-fireball-c9a02.cloudfunctions.net/admin' : 'http://localhost:5000/fireball-c9a02/asia-east2/admin'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
