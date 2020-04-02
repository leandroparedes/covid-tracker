import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        global: {
            loading: false,
            totals: {},
            historical: {}
        },
        countries: {
            loading: false,
            data: []
        },
        country: {
            loading: false,
            info: {},
            historical: {}
        }
    },
    mutations: {
        set_global_loading (state, loading) {
            state.global.loading = loading;
        },
        set_global_totals (state, totals) {
            state.global.totals = totals;
        },
        set_global_historical (state, historical) {
            state.global.historical = historical;
        },

        set_countries_loading (state, loading) {
            state.countries.loading = loading;
        },
        set_countries_data (state, data) {
            state.countries.data = data;
        },

        set_country_loading (state, loading) {
            state.country.loading = loading;
        },
        set_country_info (state, info) {
            state.country.info = info;
        },
        set_country_historical (state, historical) {
            state.country.historical = historical;
        }
    },
    actions: {
        fetch_global_data ({commit}) {
            commit('set_global_loading', true);

            const totalsUrl = Vue.axios.get('https://corona.lmao.ninja/all');
            const historicalUrl = Vue.axios.get('https://corona.lmao.ninja/v2/historical/all');

            Vue.axios.all([totalsUrl, historicalUrl]).then(Vue.axios.spread((totals, historical) => {
                commit('set_global_totals', totals.data);
                commit('set_global_historical', historical.data);
            })).finally(() => {
                commit('set_global_loading', false);
            });
        },

        fetch_countries_data ({commit}) {
            commit('set_countries_loading', true);

            const countriesUrl = 'https://corona.lmao.ninja/countries';

            Vue.axios.get(countriesUrl).then(res => {
                commit('set_countries_data', res.data);
            }).finally(() => {
                commit('set_countries_loading', false);
            });
        },

        fetch_country_data ({commit}, countryCode) {
            commit('set_country_loading', true);

            const infoUrl = Vue.axios.get(`https://corona.lmao.ninja/countries/${countryCode}`);
            const historicalUrl =  Vue.axios.get(`https://corona.lmao.ninja/v2/historical/${countryCode}`);

            Vue.axios.all([infoUrl, historicalUrl]).then(Vue.axios.spread((info, historical) => {
                commit('set_country_info', info.data);
                commit('set_country_historical', historical.data);
            })).finally(() => {
                commit('set_country_loading', false);
            });
        }
    },
    modules: {
    }
});
