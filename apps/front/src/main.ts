import { createApp } from "vue";
import { createPinia } from "pinia";
import { trackerFront } from "@repairnow/tracker";

import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import "@/main.css";
import App from "./App.vue";

const pinia = createPinia();

const app = createApp(App);

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(trackerFront, {
	APP_ID: "front-app",
	//router
});
app.mount("#app");
