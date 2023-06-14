import { createApp } from "vue";
import { createPinia } from "pinia";
import { trackerFront } from "@repairnow/tracker";

import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import "@/main.css";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)

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
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");
