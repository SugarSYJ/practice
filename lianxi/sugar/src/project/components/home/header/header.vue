<template>
    <div id="app">
        <div class="header">
            <h1 class="title">Refresh & Infinite</h1>
        </div>
        <scroller :on-refresh="refresh"
                :on-infinite="infinite"
                style="padding-top: 44px;">
            <div v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">
                {{ item }}
            </div>
        </scroller>
    </div>
</template>

<script type="text/javascript">

    export default {
        data(){
            return{
                items: []
            }
        },
        mounted: function () {
            for (var i = 1; i <= 20; i++) {
                this.items.push(i + ' - keep walking, be 2 with you.');
            }
            this.top = 1;
            this.bottom = 20;
        },

        methods: {
            refresh: function (done) {
                var self = this
                setTimeout(function () {
                    var start = self.top - 1
                    for (var i = start; i > start - 10; i--) {
                        self.items.splice(0, 0, i + ' - keep walking, be 2 with you.');
                    }
                    self.top = self.top - 10;
                    done();
                }, 1500)
            },

            infinite: function (done) {
                var self = this
                setTimeout(function () {
                    var start = self.bottom + 1;
                    for (var i = start; i < start + 10; i++) {
                        self.items.push(i + ' - keep walking, be 2 with you.');
                    }
                    self.bottom = self.bottom + 10;
                    done();
                }, 1500)
            }
          }
    }
</script>
<style lang="scss">
._v-container>._v-content>.pull-to-refresh-layer[data-v-ecaca2b0] {
    width: 100%;
    height: 108px;
    margin-top: -60px;
    text-align: center;
    font-size: 36px;
    color: #aaa;
}

._v-container>._v-content>.loading-layer .spinner-holder .text[data-v-ecaca2b0], ._v-container>._v-content>.pull-to-refresh-layer .spinner-holder .text[data-v-ecaca2b0] {
    display: block;
    margin: 0 auto;
    font-size: 36px;
    line-height: 60px;
    color: #aaa;
}

._v-container>._v-content>.loading-layer .spinner-holder .arrow[data-v-ecaca2b0], ._v-container>._v-content>.pull-to-refresh-layer .spinner-holder .arrow[data-v-ecaca2b0] {
    width: 30px;
    height: 30px;
    margin: 10px auto 0;
    -webkit-transform: translateZ(0) rotate(0deg);
    transform: translateZ(0) rotate(0deg);
    transition: transform .2s linear;
}

.row {
  width: 100%;
  height: 90px;
  padding: 10px 0;
  font-size: 36px;
  line-height: 90px;
  text-align: center;
  color: #444;
  background-color: #fff;
}

.grey-bg {
  background-color: #eee;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 88px;
  width: 100%;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
  background-color: #fff;
  z-index: 1000;
  color: #666;
}

.header > .title {
  font-size: 36px;
  line-height: 88px;
  text-align: center;
  margin: 0 auto;
}
</style>