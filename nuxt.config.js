// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://localhost:8000/",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
});
