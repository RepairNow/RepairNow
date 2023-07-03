import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [vue()],
		optimizeDeps: {
			include: ["vue", "vue-router", "pinia", "axios"],
		},
		build: {
			target: "modules",
			sourcemap: true,
		},
		server: {
			proxy: env.VITE_BACKEND_URL,
			host: env.BASE_URL_FRONT,
			port: 5173,
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				"@components": path.resolve(__dirname, "./src/components"),
			},
		},
	}
});
