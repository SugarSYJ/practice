<template>
    <div class="home">
        <div class="header">
            <dheader></dheader>
        </div>
        <!--<week-slider @dateClick="dateClickhandler" :showYear="true"></week-slider>
        <vue-lazy-load-img 
            mode="diy"
            :time="300"
            :done="true"
            :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
            :diy="{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }"
            @before="before" 
            @success="success" 
            @error="error">
            <ul>
                <li v-for="num in 21">
                    <img :src="'./images/default.png'" :data-src="'./images/' + num + '.jpg'" class="img">
                </li>
            </ul>
        </vue-lazy-load-img>-->
    </div>
</template>

<script>
    import './home.scss';
    import dheader from './header/header.vue';

    export default {
        components:{
            dheader
        },
        name: 'app',
        data () {
            return {
            }
        },
        methods: {
            dateClickhandler (date) {
                console.log(date);
            },
            before: function () { // 图片加载之前执行方法
            },
            success: function (el) { // 图片加载成功执行方法
                el.classList.add('success')
            },
            error: function (el) { // 图片加载失败执行方法
                el.src = '../../images/error.png'
            }
        }
    }
</script>