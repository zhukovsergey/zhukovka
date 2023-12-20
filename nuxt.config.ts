// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxtjs/supabase','nuxt-icon', '@nuxt/ui','@nuxt/image','@nuxtjs/turnstile' ],
  turnstile: {
    siteKey: '0x4AAAAAAAOw5q0u_Cu6I7kP',
  },

  runtimeConfig: {
    turnstile: {
      // This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
      // environment variable.
      secretKey: '0x4AAAAAAAOw5jqDveg-Cf1fVjtWyLEgQZw',
    },
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  supabase: {
    redirect : false
  },
})
