import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Compare from '@/views/Compare.vue';
import Timeline from '@/views/Timeline.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/compare',
        name: 'Compare',
        component: Compare
    },
    {
        path: '/timeline',
        name: 'Timeline',
        component: Timeline
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
