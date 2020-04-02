import Vue from 'vue';
import VueRouter from 'vue-router';
import Global from '@/views/Global.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/global'
    },
    {
        path: '/global',
        name: 'Global',
        component: Global
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
