<template>
  <div id="big-screen-data-box">
    <div class="flex-m-sb header-box">
      
    </div>
    <div class="flex content-box">
      <div class="content-left">
        <div class="chart-item-box">
          <div class="chart-title-box">
            <div class="chart-title">今日天气</div>
          </div>
          <div class="live-data-chart-box" style="margin-top: 0px;">
            
          </div>
        </div>
        <div class="chart-item-box">
          <div class="chart-title-box chart-title-margin">
            <div class="chart-title">今日体温异常提醒</div>
          </div>
          <div class="live-data-chart-box" style="margin-top: -20px;">
            
          </div>
        </div>
        <div class="chart-item-box">
          <div class="chart-title-box chart-title-margin">
            <div class="chart-title">消息通知</div>
          </div>
          <div class="live-data-chart-box" style="margin-top: -20px;">
            
          </div>
        </div>
      </div>
      <div class="content-center">
        <div class="flex-m-c content-title">

        </div>
        <div class="total-wrapper pr">
          <div class="flex-m">
            <div class="card-item">
              <div class="num">{{'totalData'}}</div>
              <div class="title">{{'v.name'}}</div>
              <div
                v-for="item in cardBorderSquareList"
                :key="item"
                :class="['card-border-square', item]"
              ></div>
            </div>
          </div>
        </div>
        <div class="goods-rank-box">
          <div class="goods-rank">
            <div class="chart-title-box">
              <div class="chart-title" style="height:32px;">
                商品排行榜
              </div>
            </div>
            <div class="table-chart-box">
              
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="chart-item-box">
          <div class="chart-title-box">
            <div class="chart-title">入园人员平均体温统计</div>
          </div>
          <div class="live-data-chart-box" style="margin-top: 0px;">
            <!-- <LineChart
              chartId="order-data"
              :legend="orderData.legend"
              :xAxis="orderData.xAxis"
              :series="orderData.series"
            /> -->
          </div>
        </div>
        <div class="chart-item-box">
          <div class="chart-title-box chart-title-margin">
            <div class="chart-title">学生入园人数统计</div>
          </div>
          <div class="live-data-chart-box" style="margin-top: -20px;">
            <!-- <LineChart
              chartId="realtime-people"
              :legend="realTime.legend"
              :xAxis="realTime.xAxis"
              :series="realTime.series"
            /> -->
          </div>
        </div>
        <div class="chart-item-box">
          <div class="chart-title-box chart-title-margin">
            <div class="chart-title">教师入园人数统计</div>
          </div>
          <div class="live-data-chart-box" style="margin-top: -20px;">
            <!-- <LineChart
              chartId="realtime-people"
              :legend="realTime.legend"
              :xAxis="realTime.xAxis"
              :series="realTime.series"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardBorderSquareList: [
        'left-top',
        'right-top',
        'right-bottom',
        'left-bottom'
      ],
    }
  },
  methods: {
    openBig () {
      var elem = document.querySelector('#big-screen-data-box')
      this.requestFullScreen(elem)
    },
    requestFullScreen (elem) {
      // #兼容不同的浏览器
      var requestMethod = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullScreen

      if (requestMethod) {
        requestMethod.call(elem)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // #模拟F11 实现全屏
        // eslint-disable-next-line no-undef
        var wscript = new ActiveXObject('WScript.Shell')

        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#big-screen-data-box
  width 100vw
  height 100vh
  background url('https://image.doulaoban.com/web/big_screen_bg.png') repeat
  background-position 0 -10px
  background-size 100vw 105vh

.header-box
  width 100%
  height ((60 / 1080) * 100) %

.content-box
  width 100%
  height calc(100% - 100px)
  margin-top 30px

.content-left,.content-right
  width ((466 / 1920) * 100) %
  height 100%
  flex-shrink 0
  margin-top -25px
  justify-content space-between
  flex-direction column

.card-border-gradient
  width 100px
  height 1px
  content ''
  background:linear-gradient(90deg,rgba(0,204,255,0) 0%,rgba(0,204,255,0.3) 44%,rgba(0,204,255,0) 100%);
  position absolute
  left 25%

.content-center
  width 50%
  height 100%
  margin 0 20px
  position relative

  .content-title
    width 100%
    height 80px
    position relative
    margin-bottom 160px

  .total-wrapper
    width calc(100% - 46px)
    height 95px
    margin 0 auto 50px
    background none

    .card-item
      min-width 176px
      height 87px
      background linear-gradient(-4deg,rgba(18,29,76,.5),rgba(3,54,133,.5))
      margin 2px 12px 0
      position relative
      display flex
      align-items center
      justify-content center
      flex-direction column

      .num
        font-size 28px
        color #06F0B8

      .title
        font-size 14px
        color #fff

      &::before
        @extend .card-border-gradient
        top 0

      &::after
        @extend .card-border-gradient
        bottom 0

      .left-top
        left -2px
        top -2px

      .right-top
        right -2px
        top -2px

      .right-bottom
        right -2px
        bottom -2px

      .left-bottom
        left -2px
        bottom -2px

  .goods-rank-box
    width 930px
    height 460px
    background url('https://image.doulaoban.com/big-data/big-data-border-2.png') no-repeat
    background-size 100% 100%
    margin 0 auto

  .goods-rank
    padding 1px 0

  .table-chart-box
    height 400px
    margin 0 10px
    overflow-y auto

.card-border-square
  width 5px
  height 5px
  background rgba(0,168,255,.47)
  position absolute


.chart-item-box
  width 100%
  height 280px
  background url('https://image.doulaoban.com/big-data/big-data-border-1.png')
  background-size cover
  margin-top 10px

  &:nth-child(3)
    margin-bottom 0

.chart-title-box
  width 100%
  height 40px
  display flex
  align-items center
  justify-content space-between
  padding 0 10px

.chart-title
  font-size 16px
  color #fff
  text-shadow 0px 12px 29px rgba(35,97,255,0.47)
  padding-left 30px
  position relative

  &::after
    width 8px
    height 8px
    content ''
    background #2FC367
    position absolute
    left 9px
    top 11px

  &::before
    width 8px
    height 8px
    content ''
    border 1px solid rgba(72,122,250,1)
    box-shadow 0px 12px 29px 3px rgba(195,254,217,0.47)
    position absolute
    left 5px 
    top 6px

.chart-title-margin
  margin-bottom 20px

.live-data-chart-box
  width calc(100% - 20px)
  height 220px
  margin 10px auto 0
</style>