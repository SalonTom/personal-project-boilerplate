import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { traductions } from './i18n/traductions';

import './main.css';

const pinia = createPinia();

const i18n = createI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    messages : traductions
});

const vueApp = createApp(App);

vueApp.use(router);
vueApp.use(pinia);
vueApp.use(i18n);

vueApp.mount('#app');
