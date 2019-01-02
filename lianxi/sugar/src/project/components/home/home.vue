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
                    <div class="list-box" @touchstart="touchStart" @touchend="touchEnd" >
                        <div class="personnel">{{item.name}}</div>
                        <div class="text">
                            <span class="text_l">{{item.text}}</span>
                            <span @click="use($event)">使用</span>
                        </div>
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
                data: [{name:'新春拜年',id:'111',text:'XXX用和飞信给您拜年啦！祝您新年大吉，阖家安康，和乐融融~'},{name:'节日祝福',id:'112',text:'2019年，祝大家新的一年一飞冲天，开工大吉！'},{name:'会议通知',id:'113',text:'XXX会议通知：计划在XXX上午XX点，XX会议室召开会议，会议主题为：XXX，请准时参加'},{name:'推荐和飞信',id:'114',text:'我最近迷上【和飞信】，可以免费发短信、免费打电话、免流量聊天，新人还送300分钟电话时长，福利多多，还不快来一起玩转和飞信？！http://feixin.10086.cn/'}],
                startX : 0,
                endX : 0
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
            //滑动开始
            touchStart(e){
            // 记录初始位置
                this.startX = e.touches[0].clientX;
            },
            //滑动结束
            touchEnd(e){
                // 当前滑动的父级元素
                let parentElement = e.currentTarget.parentElement;
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                // 左滑
                if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
                    this.rest();
                    parentElement.dataset.type = 1;
                }
                // 右滑
                if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
                    this.rest();
                    parentElement.dataset.type = 0;
                }
                this.startX = 0;
                this.endX = 0;
            },
            //重置
            rest() {
                let listitems = document.querySelectorAll('.list-item');
                for (let i = 0; i < listitems.length; i++) {
                    listitems[i].dataset.type = 0;
                }
            },
            //删除
            deletefunction(index,item) {
                console.log(index,item.id)
                //this.data.splice(index,1);
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
            },
            //点击复制
            use(e) {
                //定义函数
                window.Clipboard = (function(window, document, navigator) {
                    var textArea,copy;
                    // 判断是不是ios端
                    function isOS() {
                        return navigator.userAgent.match(/ipad|iphone/i);
                    }
                    //创建文本元素
                    function createTextArea(text) {
                        textArea = document.createElement('textArea');
                        textArea.value = text;
                        document.body.appendChild(textArea);
                    }
                    //选择内容
                    function selectText() {
                        var range,selection;
                        if (isOS()) {
                            range = document.createRange();
                            range.selectNodeContents(textArea);
                            selection = window.getSelection();
                            selection.removeAllRanges();
                            selection.addRange(range);
                            textArea.setSelectionRange(0, 999999);
                        } else {
                            textArea.select();
                        }
                    }
                    //复制到剪贴板
                    function copyToClipboard() {        
                        try{
                            if(document.execCommand("Copy")){
                                alert("复制成功！");  
                            }else{
                                alert("复制失败！请手动复制！");
                            }
                        }catch(err){
                            alert("复制错误！请手动复制！")
                        }
                        document.body.removeChild(textArea);
                    }
                    copy = function(text) {
                        createTextArea(text);
                        selectText();
                        copyToClipboard();
                    };
                    return {
                        copy: copy
                    };
                })(window, document, navigator);
                var  val = e.target.previousElementSibling.innerText;;
                Clipboard.copy(val);
            }
        }
    }
</script>
<style lang="scss">
#group {
    ul {
        width: 100%;
        overflow: hidden;
        list-style-type: none;
        padding-left: 0;
        margin:0;
        .list-item {
            position: relative;
            width: 100%;
            transition: all 0.2s;
            -ms-transition: all 0.2s;
            -moz-transition: all 0.2s;
            -o-transition: all 0.2s;
            -webkit-transition: all 0.2s ease-in-out;
            background-color: #fff;
            .list-box {
                width: 100%;
                height: 100%;
                font-size: 0.14rem;
                padding-left: 0.48rem;
                font-size: 0.533333rem;
                .personnel {
                    height: 0.84rem;
                    width: 2rem;
                    line-height: 0.84rem;
                    font-size: 0.32rem;
                    color: #2a2a2a;
                    padding-left: 0.28rem;
                    margin: auto 0;
                }
                .text{
                    display: -webkit-flex;
                    display: flex;
                    justify-content: flex-start;
                    span{
                        font-size:40px;
                    }
                    .text_l{
                        width: 80%;
                        padding-right: 0.133333rem;
                    }
                }
            }
            .delete {
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
    }
}
</style>