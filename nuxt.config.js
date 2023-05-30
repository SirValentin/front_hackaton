// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://localhost:8000/infojobs/",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
});
