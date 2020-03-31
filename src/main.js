import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

Vue.filter('formatNumber', function (value) {
    return new Intl.NumberFormat('de-DE').format(value);
});

Vue.filter('percentage', function (value) {
    return value + '%';
});

Vue.mixin({
    methods: {
        percentageDifference: function (value_a, value_b, toFixed) {
            return ((value_b * 100) / value_a).toFixed(toFixed || 5);
        },
        sort: function (o) {
            return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
        },
        translateCountryName: function (country) {
            if (country) {
                switch (this.$vuetify.lang.current) {
                    case 'es': return country.name_es || country.name; break;
                    case 'en': return country.name; break;
                    default: return country.name;
                }
            } else {
                return '';
            }
        }
    }
  })

const moment = require('moment');
 
Vue.use(require('vue-moment'), {
    moment
});

new Vue({
    router,
    vuetify,
    store,
    render: function (h) { return h(App) }
}).$mount('#app');
