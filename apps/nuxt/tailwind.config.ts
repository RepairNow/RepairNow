import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  prefix: 'tw-',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4D908E',
        'primary-darken-1': '#577590',
        'secondary': '#F8961E',
        'secondary-darken-1': '#F9844A'
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}
