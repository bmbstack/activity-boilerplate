/*
 * https://github.com/vuejs/vue-router/blob/dev/docs/LANGS.md
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import containers from '../components/containers';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: containers.welcome },
];

const router = new VueRouter({
    routes
});

export default router;
