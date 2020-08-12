
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
	  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
	  //{ rel: "stylesheet", type: "text/css", href: "fonts/fonts.css" },
	  { rel: "stylesheet", type: "text/css", href: "bootstrap/bootstrap-grid.min.css" }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
	{src: "~/assets/fonts/fonts.css", lang: 'css'},
	{src: "~/assets/images/icons.styl", lang: 'stylus'}
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
	extractCSS: true
  }
}
