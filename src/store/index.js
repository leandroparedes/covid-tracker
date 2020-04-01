import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        bookmark: null,
        chartType: 'linear'
    },
    mutations: {
        bookmark: function (state, bookmarkID) {
            state.bookmark = bookmarkID;
        },
        set_chart_type: function (state, chartType){
            state.chartType = chartType;
        }
    },
    actions: {
        bookmark: function ({ commit }, bookmarkID) {
            const savedBookmark = localStorage.getItem('bookmarkID');

            if (bookmarkID == savedBookmark) {
                commit('bookmark', null);
                localStorage.removeItem('bookmarkID');
            } else {
                commit('bookmark', bookmarkID);
                localStorage.setItem('bookmarkID', bookmarkID);
            }
        }
    }
});