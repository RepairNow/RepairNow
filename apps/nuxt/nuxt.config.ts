// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["vuetify/lib/styles/main.sass", '~/assets/css/main.css',],
    build: {
        transpile: ["vuetify"],
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
    modules: ["@nuxtjs/i18n", "@pinia/nuxt", '@nuxt/devtools',],
    i18n: {
        vueI18n: "./i18n.config.ts", // if you are using custom path, default
    },
});
