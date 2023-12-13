// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxtjs/supabase','nuxt-icon', '@nuxt/ui','@nuxt/image','@nuxtjs/turnstile' ],
  turnstile: {
    siteKey: '0x4AAAAAAAOh0ElLw7IKT8-D',
  },

  runtimeConfig: {
    turnstile: {
      // This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
      // environment variable.
      secretKey: '0x4AAAAAAAOh0MJ-qeYPGKSOk2jCUNLfzUg',
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
