<template>
    <div class="home">
        <!--<div class="header">
            <dheader></dheader>
        </div>-->
        <week-slider @dateClick="dateClickhandler" :showYear="true"></week-slider>
        <!--<vue-lazy-load-img 
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
        <div id="group">
            <ul>
                <li class= "list-item" data-type= "0" v-for= " (item,index) in data" :key="index">
                    <div class="list-box"  @touchstart.stop.prevent="touchStart"  @touchend="touchEnd">
                        <div class="personnel">{{item.name}}</div>
                    </div>
                    <div class="delete" @click="deletefunction(index,item)" :data-index='index'> 
                        删除
                    </div>
                </li>
            </ul>
            <ul>
                <li class= "list-item" data-type= "0" v-for= " (item,index) in data" :key="index">
                    <div class="list-box" @touchstart.prevent="touchin" @touchend.prevent="cleartime">
                        <div class="personnel" :id="item.id">{{item.name}}</div>
                    </div>
                </li>
            </ul>
        </div>
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
                data: [{name:'121321313',id:'111'},{name:'121321314',id:'112'},{name:'121321315',id:'113'}]
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
            },
            //滑动事件
            touchStart(e) {
                [this.startX, this.startY] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
                this.rest();
            },
            touchEnd(e) {
                [this.endX, this.endY, this.parentElement] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY, e.target.parentElement];
                this.parentElement.dataset.type == 0 && (Math.abs(this.endX - this.startX) - Math.abs(this.endY - this.startY)) > 0 ? this.movefunctions(e) : this.parentElement.dataset.type == undefined && (Math.abs(this.endX - this.startX) - Math.abs(this.endY - this.startY)) > 0 ? this.movefunctionss(e) : '';
            },
            //若是子级选择器滑动处理
            movefunctions(e) {
                if (this.endX - this.startX > 20) {
                    this.parentElement.dataset.type = 0;
                    //向右滑动
                } else if (this.startX - this.endX > 20) {
                    //向左滑动
                    this.parentElement.dataset.type = 1;
                }
            },
            // 若是孙子级选择器滑动处理
            movefunctionss() {
                let grandfather = this.parentElement.parentElement;
                if (this.endX - this.startX > 20) {
                    //向右滑动
                    grandfather.dataset.type = 0;
                } else if (this.startX - this.endX > 20) {
                    //向左滑动
                    grandfather.dataset.type = 1;
                }
            },
            //重置
            rest() {
                let listitems = document.querySelectorAll('.list-item');
                for (let i = 0; i < listitems.length; i++) {
                    listitems[i].dataset.type = 0;
                }
            },
            //删除
            deletefunction(index, item) {
                console.log(index,item)
                this.rest();
            },
            //长按弹出删除
            touchin(id) {
                clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
                this.Loop = setTimeout(function() {
                    console.log(id.path[0].id)
                    alert('是否确认删除')
                }.bind(this), 1000);
            },
            cleartime(id) {
                // 这个方法主要是用来将每次手指移出之后将计时器清零
                clearInterval(this.Loop);
            }
        }
    }
</script>
<style lang="scss">
#group {
    padding-top: 0.2rem;
    ul {
        width: 100%;
        overflow: hidden;
        list-style-type: none;
        padding-left: 0;
    }
    .list-item {
        position: relative;
        width: 100%;
        height: 1.32rem;
        line-height: 1.32rem;
        transition: all 0.2s;
        -ms-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -o-transition: all 0.2s;
        -webkit-transition: all 0.2s ease-in-out;
        background-color: #fff;
    }
    .list-item[data-type="0"] {
        transform: translate3d(0, 0, 0);
        -ms-transform:  translate3d(0, 0, 0);
        -moz-transform:  translate3d(0, 0, 0);
        -webkit-transform:  translate3d(0, 0, 0);
        -o-transform:  translate3d(0, 0, 0);
    }
    .list-item[data-type="1"] {
        transform: translate3d(-1.35rem, 0, 0);
        -ms-transform:  translate3d(-1.35rem, 0, 0);
        -moz-transform:  translate3d(-1.35rem, 0, 0);
        -webkit-transform:  translate3d(-1.35rem, 0, 0);
        -o-transform:  translate3d(-1.35rem, 0, 0);
    }
    .list-box {
        width: 100%;
        height: 100%;
        font-size: 0.14rem;
        display: -webkit-flex;
        display: flex;
        justify-content: flex-start;
        padding-left: 0.48rem;
  
    }
    .list-item .list-box .headImg {
        height: 0.84rem;
        margin: auto 0;
        width: 0.84rem;
        line-height: 0.84rem;
        border-radius: 50%;
        font-size: 0.26rem;
        color: #fff;
        text-align: center;
        /* background-color: rgb(53, 32, 32); */
    }
    .list-item .list-box .personnel {
        height: 0.84rem;
        width: 2rem;
        line-height: 0.84rem;
        font-size: 0.32rem;
        color: #2a2a2a;
        padding-left: 0.28rem;
        /* background: #ff4949; */
        margin: auto 0;
    }
    .list-item .delete {
        width: 1.35rem;
        height: 1.32rem;
        background: #FF3A30;
        font-size: 17px;
        color: #fff;
        text-align: center;
        line-height: 1.32rem;
        position: absolute;
        top: 0;
        right: -1.35rem;
    }
    .concat_line{
        height:0.02rem;
        margin-left: 0.48rem;
        background:rgba(241,241,241,1);
        margin-top: -0.02rem;
    }
}
</style>