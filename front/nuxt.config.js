export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'matcha',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script:
    [
      {
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB4Io5BFJ2alGrKIY6n5WHAXjpcGfQl13E&libraries=places"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    // ['vuejs-google-maps/nuxt', {apiKey: 'AIzaSyB4Io5BFJ2alGrKIY6n5WHAXjpcGfQl13E', libraries: [/* rest of libraries */]}]
  ],

  axios: {
    baseURL: 'http://localhost', // Used as fallback if no runtime config is provided
  },

  toast:
  {
      position: 'top-center',
      action :
      {
        text : 'Close',
        onClick : (e, toastObject) =>
        {
          toastObject.goAway(0);
        }
      },
      register: []
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
