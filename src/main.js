import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

Vue.filter('formatNumber', function (value) {
    return new Intl.NumberFormat('es-ES').format(value);
});

Vue.filter('percentage', function (value) {
    return value + '%';
});

new Vue({
    router,
    vuetify,
    render: function (h) { return h(App) }
}).$mount('#app');
