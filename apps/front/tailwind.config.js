// import type { Config } from 'tailwindcss'
/** @type {import('tailwindcss').Config} */

export default {
	prefix: "tw-",
	content: ["./src/**/*.{vue,js,ts,jsx,tsx}", "./index.html"],
	theme: {
		extend: {
			colors: {
				primary: "#4D908E",
				"primary-darken-1": "#577590",
				secondary: "#F8961E",
				"secondary-darken-1": "#F9844A",
			},
			fontFamily: {
				sans: ["Noto Sans", "sans-serif"],
				serif: ["Merriweather", "serif"],
			},
		},
	},
	// override vuetify styles when using tailwind on the same item
	important: true,
	plugins: [],
};
