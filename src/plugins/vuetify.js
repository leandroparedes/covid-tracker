import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify);

import en from './i18n/vuetify/en.js';
import es from './i18n/vuetify/es.js';

export default new Vuetify({
    theme: {
        dark: true
    },
    lang: {
        locales: { en, es },
        current: 'en'
    },
    icons: {
        iconFont: ['fa', 'mdi']
    }
});
