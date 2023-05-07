export default defineI18nConfig(nuxt => ({
  legacy: false,
  locale: 'fr',
  defaultLocale: 'fr',
  messages: {
    en: {
      welcome: 'Welcome'
    },
    fr: {
      welcome: 'Bienvenue'
    }
  }
}))
