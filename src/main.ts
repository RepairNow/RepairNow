import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n'
import './style.css'
import 'virtual:windi.css';
import App from './App.vue';

const i18n = createI18n({});
const pinia = createPinia();

const app = createApp(App);

app.use(i18n);
app.use(pinia);
app.mount('#app')
