import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomeComponent from '../components/home/home.vue';
import ClassificationComponent from '../components/classification/classificat.vue';
import ShoppingCarComponent from '../components/shoppingCar/shoppingCar.vue';
import MineComponent from '../components/mine/mine.vue';

const router = new VueRouter({
    routes:[
        {path:'/',component:HomeComponent,name:'home'},
        {path:'/classification',component:ClassificationComponent,name:'classification'},
        {path:'/shoppingCar',component:ShoppingCarComponent,name:'shoppingCar'},
        {path:'/mine',component:MineComponent,name:'mine'},
    ]
})

export default router;