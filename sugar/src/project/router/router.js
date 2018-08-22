import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomeComponent from '../components/home/home.vue';

const router = new VueRouter({
    routes:[
        {path:'/',component:HomeComponent}
    ]
})

export default router;