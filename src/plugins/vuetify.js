import Vue from 'vue';
import Vuetify from 'vuetify/lib';

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
    }
});
