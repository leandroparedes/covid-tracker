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
    },
    modules: {
    }
});
