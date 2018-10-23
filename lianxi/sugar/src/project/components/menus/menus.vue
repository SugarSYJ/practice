<template>
    <div class="all">
        <div class="main">
            <router-view></router-view>
        </div>
        <ul class="menus">
            <li v-for="obj in menus" :key="obj.path">
                <router-link :to="obj.path" >{{obj.text}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import './menus.scss';

    export default {
        data(){
            return {
                menus:[
                    {path:'/',text:'首页'},
                    {path:'/classification',text:'分类'},
                    {path:'/shoppingCar',text:'购物车'},
                    {path:'/mine',text:'我的'},
                ]
            }
        },
        mounted: function(){
            
        }
    }
</script>