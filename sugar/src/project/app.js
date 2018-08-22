import Vue from 'vue';
import HomeComponent from './components/home/home.vue';
import HeadComponent from './components/home/header/header.vue';
import store from './vuex/store.js';

import router from './router/router';
import weekSlider from 'v-week-slider';
import VueLazyLoadImg from 'vue-lazy-load-img';
import VueScroller from 'vue-scroller';

Vue.use(VueScroller);
Vue.use(weekSlider);
Vue.use(VueLazyLoadImg);

new Vue({
    el:'#app',
    router,
    store,
    render:h => h(HeadComponent)
})