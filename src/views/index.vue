<template>
  <div id="big-screen-data-box">
    <div class="flex-m-sb header-box">
      <div class="date-time date-flex">{{dateTime}}</div>
      <div class="school-name">丁小贝北斗智慧校园</div>
      <div class="flex menu">
        <div 
          v-if="!isBigScreen" 
          class="date-time mouse-pointer" 
          @click="handleToHome()"
        >首页</div>
        <div 
          v-if="!isBigScreen" 
          class="date-time home mouse-pointer" 
          @click="fullScreen()"
        >全屏显示</div>
      </div>
    </div>
    <div class="flex content-box">
      <div class="content-left flex">
        <div class="chart-item-box">
          <div class="chart-title-box">
            <div class="chart-title">今日天气</div>
          </div>
          <div class="live-data-chart-box flex-m-c">
            <div class="weather-left flex">
              <i :class="['weather-iconfont', `weather-${weatherData.wea_img}`]"></i>
              <div class="weather-num flex-m">
                <div class="num">{{weatherData.tem}}</div>
                <div>
                  <div class="text">°C</div>
                  <div class="text">{{weatherData.wea}}(实时)</div>
                </div>
              </div>
            </div>
            <div class="weather-left">
              <div class="text">{{weatherData.tem2}}~{{weatherData.tem1}}°C</div>
              <div class="text">{{weatherData.wea}}</div>
              <div class="text">{{weatherData.win}}{{weatherData.win_speed}}</div>
              <div class="label-box">{{weatherData.air_pm25}} {{weatherData.air_level}}</div>
            </div>
          </div>
        </div>
        <div class="chart-item-school">
          <div class="chart-title-box">
            <div class="chart-title">学校简介</div>
          </div>
          <div class="live-data-chart-box" style="margin-top: 0px;padding-top: 20px;">
            <img :src="companyData.company_logo_url" alt="" class="logo">
            <div class="desc">{{companyData.brief_introduction}}</div>
          </div>
        </div>
      </div>
      <div class="content-center flex">
        <div class="content-title">
          <div class="total-num">{{companyData.total_num}}</div>
          <div class="total-text">今日入校总人数</div>
        </div>
        <div class="goods-rank-box">
          <div class="goods-rank">
            <div class="chart-title-box">
              <div class="chart-title" style="height:30px;font-size: 24px;">
                消息通知
              </div>
            </div>
            <div class="table-school-box">
              <div 
                class="table-item flex-m"
                v-for="(item, index) in deviceCheckData.StaffList"
                :key="item.id"
                v-show="index < 3"
              >
                <img :src="item.face_id_url" alt="" class="user-avatar">
                <div>
                  <div class="info-1 flex-m">
                    <span class="info-item">{{item.created_date}}</span>
                    <span class="info-item">{{typeData[item.type]}}</span>
                    <span class="info-item">{{deviceLocation[item.device_location]}}</span>
                  </div>
                  <div class="info-2 flex-m">
                    <span class="info-item">{{item.class_name}}</span>
                    <span class="info-item">{{item.name}}</span>
                    <span class="info-item">{{genderData[item.gender]}}</span>
                    <span class="info-item" v-if="item.device_location !== 1">{{item.temp}}°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right flex">
        <div class="person-rank">
          <div class="chart-title-box">
            <div class="chart-title" style="height:30px;font-size: 20px;">
              今日到校班级人数排名
            </div>
          </div>
          <div class="table-chart-box no-padding">
            <div class="table-title flex-m-sb">
              <span 
                class="table-title-item flex-m-c"
                v-for="item in tableTitleList"
                :key="item"
              >{{item}}</span>
            </div>
            <div class="table-content">
              <div 
                class="table-column-item flex-m-sb"
                v-for="(item, index) in classSumList"
                :key="index"
              >
                <span class="table-content-item flex-1 flex-m-c">{{index + 1}}</span>
                <span class="table-content-item flex-2 flex-m-c">{{item.grade_name}} {{item.class_name}}</span>
                <span class="table-content-item flex-1 flex-m-c">{{item.class_sum}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { yhuoDxHttp } from '@/utils/http'

export default {
  data() {
    return {
      intervalTimer1: null,
      intervalTimer: null,
      dateTime: '',
      dateTimer: null,
      isBigScreen: false, // 是否全屏
      tableTitleList: ['排名', '年级', '人数'],
      weatherData: {},
      companyData: {},
      deviceCheckData: {},
      classSumList: [],
      deviceLocation: {
        0: '入校',
        1: '离校',
        2: '内部出口',
        3: '内部入口'
      },
      genderData: {
        0: '女',
        1: '男'
      },
      typeData: {
        0: '学生',
        1: '老师'
      }
    }
  },
  mounted () {
    this.getTime()
    this.dateTimer = setInterval(() => {
      this.getTime()
    }, 1000)
    //监听是否全屏
    let that = this
    window.addEventListener("resize", function() {
      if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
        that.isBigScreen = true
      } else {
        that.isBigScreen = false
      }
    })

    this.getCompanyNumber()
    this.getDeviceCheckList()
    this.getClassSumData()
    this.getWeather()
    this.intervalTimer = setInterval(() => {
      this.getCompanyNumber()
      this.getDeviceCheckList()
      this.getClassSumData()
    }, 180000)
    this.intervalTimer1 = setInterval(() => {
      this.getWeather()
    }, 10800000)
  },
  beforeDestroy() {
    clearInterval(this.dateTimer)
    clearInterval(this.intervalTimer)
    clearInterval(this.intervalTimer1)
    window.removeEventListener('resize')
  },
  methods: {
    setChartData(dataList, value) {
      if(dataList.length === 0) return false
      let xAxis = [], series = [], arr = [], json = {}
      dataList.forEach(item => {
        arr.push(item[value] || 0)
        xAxis.push(item.date.slice(5, 10))
      })
      json.name = ''
      json.data = arr
      series.push(json)

      return {
        xAxis, 
        series
      }
    },
    // 天气
    getWeather() {
      yhuoDxHttp.weather().then(res => {
        this.weatherData = res.data
      })
    },
    // 入园模快
    getCompanyNumber() {
      yhuoDxHttp.companyNumber().then(res => {
        this.companyData = res.data
      })
    },
    // 入校列表
    getDeviceCheckList() {
      yhuoDxHttp.deviceCheckList().then(res => {
        this.deviceCheckData = res.data
      })
    },
    // 班级统计
    getClassSumData() {
      yhuoDxHttp.classSumData().then(res => {
        this.classSumList = res.data
      })
    },
    handleToHome() {
      window.location.href = 'https://school.yfdxb.cn/'
    },
    // 是否全屏
    fullScreen() { 
      if(!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
        if(document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if(document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if(document.documentElement.webkitRequestFullscreen){
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
      } else {
        if(document.cancelFullScreen) {
            document.cancelFullScreen()
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if(document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
        }
      }
    },
    getTime() {
      let date = new Date()
      let year = date.getFullYear()
      let mon = this.addZero(date.getMonth() + 1)
      let day = this.addZero(date.getDate())
      let hour = this.addZero(date.getHours())
      let min = this.addZero(date.getMinutes())
      this.dateTime = `${year}年${mon}月${day}日 ${hour}:${min}`
    },
    addZero(val) {
      return ('0' + val).slice(-2)
    },
  }
}
</script>

<style lang="stylus" scoped>
.text-color
  color #ccf3f3
.text-shadow
  text-shadow 0 0 0 #fff, 0 0 15px #ccf3f3
.color-red
  color #F52929
.mouse-pointer
  cursor pointer
.no-padding
  padding 0!important

#big-screen-data-box
  width 100vw
  height 100vh
  background url('https://image.doulaoban.com/web/big_screen_bg.png') repeat
  background-position 0 -10px
  background-size 100vw 105vh
  padding 0 30px
  overflow hidden

.header-box
  width 100%
  height ((60 / 1080) * 100) %

  .date-flex
    flex 1

  .date-time
    font-size 20px
    @extend .text-color
    @extend .text-shadow

  .school-name
    flex 1
    font-size 40px
    font-weight 500
    margin 40px 0 0 0
    text-align center
    @extend .text-color
    @extend .text-shadow
  
  .menu
    flex 1
    justify-content flex-end

  .home
    margin 0 40px

  .logout
    font-size 20px
    @extend .color-red 

.content-box
  width 100%
  height calc(100% - 100px)
  margin-top 30px

.content-left,.content-right
  width 24%
  height 100%
  justify-content space-around
  flex-direction column
  flex-shrink 0

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
  justify-content space-around
  flex-direction column
  flex-shrink 0

  .content-title
    width 100%
    margin 50px 0 16px
    text-align center
    color #06F0B8

    .total-num
      font-size 150px

    .total-text
      font-size 40px
      text-align center
      margin 0 0 12px 0
      @extend .text-color

  .goods-rank-box
    width 100%
    height 65vh
    background url('https://image.doulaoban.com/big-data/big-data-border-2.png') no-repeat
    background-size 100% 100%
    margin 0 auto

  .goods-rank
    padding 1px 0

.table-chart-box
  width calc(100% - 20px)
  height 100%
  margin 0 10px
  overflow hidden
  padding-left 24px

  .table-title
    width 100%
    height 80px
    border-bottom 1px solid #162b5f

    .table-title-item
      flex 1
      height 100%
      line-height 80px
      font-size 30px
      @extend .text-color

  .table-content
    width 100%

    .table-column-item
      height 72px
      border-bottom 1px solid #162b5f

    .table-content-item
      height 100%
      font-size 32px
      @extend .text-color

    .flex-1
      flex 1

    .flex-2
      flex 2

.chart-item-box
  width 100%
  height 280px
  background url('https://image.doulaoban.com/big-data/big-data-border-1.png')
  background-size cover
  margin-top 10px

  &:nth-child(1)
    margin-top 30px
  &:nth-child(3)
    margin-bottom 0

.chart-item-school
  height 60vh
  background url('./../assets/img/big-data-border-6.png') no-repeat
  background-size 101% 100%
  margin-top 20px

.person-rank
  height 88vh
  background url('./../assets/img/big-data-border-5.png') no-repeat
  background-size 101% 100%
  margin-top 20px
  overflow hidden


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

.live-data-chart-box
  width calc(100% - 20px)
  height 220px
  margin 10px auto 0

  .logo
    margin 0 auto 16px
    display block
    width 90%

  .desc
    font-size 24px
    line-height 40px
    padding 0 16px
    text-indent 2em
    @extend .text-color

  .weather-left
    padding 10px 20px
    height 100%
    flex-direction column

    .weather-iconfont
      width 80px
      height 80px
      background url('./../assets/img/wether.png') no-repeat
      background-size (1950 / 3)px (2159 / 2.6)px

    .weather-qing
      background-position 0 0
    .weather-yun
      background-position 0 -150px
    .weather-bingbao
      background-position -573px -305px
    .weather-wu
      background-position -577px -605px
    .weather-shachen
      background-position -140px -755px
    .weather-lei
      background-position 0 -300px
    .weather-xue
      background-position -427px -305px
    .weather-yin
      background-position 0 -150px
    .weather-yu
      background-position -140px -150px

    .weather-num
      height 50px
      margin-top 20px
      @extend .text-color

    .num
      height 140px
      line-height 140px
      font-size 120px
      margin-right 8px
      @extend .text-color

    .text
      font-size 26px
      line-height 50px
      @extend .text-color

    .label-box
      height 45px
      line-height 45px
      font-size 30px
      text-align center
      padding 0 8px
      border-radius 4px
      background #2FC367
      margin-top 8px
      @extend .text-color

.table-school-box
  width calc(100% - 20px)
  height 50vh
  padding-left 24px
  margin-top 20px
  overflow hidden

  .table-item
    height 150px
    margin-bottom 20px

    .user-avatar
      width 140px
      height 140px
      border-radius 50%
      margin-right 18px
      flex-shrink 0
    
    .info-1
      height 70px
      line-height 70px
      font-size 50px
      @extend .text-color

    .info-2
      height 70px
      line-height 70px
      font-size 50px
      @extend .text-color

    .info-item
      margin-right 28px
</style>