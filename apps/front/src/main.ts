import { createApp } from "vue";
import { createPinia } from "pinia";
import * as Sentry from "@sentry/vue";
import { trackerFront } from "@repairnow/tracker";

import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import "@/main.css";
import App from "./App.vue";

/* import mosha-vue-testify to have styles */
import 'mosha-vue-toastify/dist/style.css';

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

Sentry.init({
    app,
    dsn: "https://ba3a8c2378a54a18ad70b83339b4ed8d@o4505476953931776.ingest.sentry.io/4505476960288769",
    integrations: [
        new Sentry.BrowserTracing({
        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        }),
        new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
