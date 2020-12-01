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
        <!-- <div 
          v-if="!isBigScreen" 
          class="logout mouse-pointer" 
          @click="handleLogOut()"
        >退出登录</div> -->
      </div>
    </div>
    <div class="flex content-box">
      <div class="content-left flex">
        <div class="chart-item-box">
          <div class="chart-title-box">
            <div class="chart-title">学校简介</div>
          </div>
          <div class="live-data-chart-box" style="margin-top: 0px;padding-top: 20px;">
            <img :src="companyData.company_logo_url" alt="" class="logo">
            <div class="desc">{{companyData.brief_introduction}}</div>
          </div>
        </div>
        <div class="chart-item-box chart-item-small">
          <div class="chart-title-box">
            <div class="chart-title">今日体温异常提醒</div>
          </div>
          <div class="table-chart-box">
            <el-carousel 
              height="60px" 
              direction="vertical" 
              autoplay
              :interval="5000"
            >
              <el-carousel-item 
                v-for="item in deviceCheckData.abnStaff" 
                :key="item.id"
              >
                <div class="medium flex-m">
                  <span class="medium-item">{{item.created_date}}</span>
                  <span class="medium-item">{{item.claclass_namess}}</span>
                  <span class="medium-item">{{item.name}}</span>
                  <span class="medium-item">{{genderData[item.gender]}}</span>
                  <span class="medium-item">{{item.temp}}°C</span>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="chart-item-box chart-item-big">
          <div class="chart-title-box">
            <div class="chart-title">消息通知</div>
          </div>
          <div class="table-school-box">
            <div 
              class="table-item flex-m"
              v-for="item in deviceCheckData.StaffList"
              :key="item.id"
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
      <div class="content-center flex">
        <div class="content-title">
          <div class="total-num">{{companyData.total_num}}</div>
          <div class="total-text">今日入校总人数</div>
        </div>
        <div class="total-wrapper flex-m-c">
          <div 
            class="card-item"
            v-for="item in totalNumList"
            :key="item.id"
          >
            <div class="num">{{companyData[item.value]}}</div>
            <div class="title">{{item.text}}</div>
            <div
              v-for="item in cardBorderSquareList"
              :key="item"
              :class="['card-border-square', item]"
            ></div>
          </div>
        </div>
        <div class="goods-rank-box">
          <div class="goods-rank">
            <div class="chart-title-box">
              <div class="chart-title" style="height:32px;">
                今日班级人数排名
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
                  <span class="table-content-item flex-m-c">{{index + 1}}</span>
                  <span class="table-content-item flex-m-c">{{item.grade_name}} {{item.class_name}}</span>
                  <span class="table-content-item flex-m-c">{{item.class_sum}}</span>
                  <span class="table-content-item flex-m-c">{{item.get_school_sum}}</span>
                  <span class="table-content-item flex-m-c">{{item.not_get_school_sum}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right flex">
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
                  <div class="text">{{weatherData.wea}}（实时）</div>
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
        <div class="chart-item-box">
          <div class="chart-title-box chart-title-margin">
            <div class="chart-title">学生入园人数统计</div>
          </div>
          <div class="live-data-chart-box" style="margin-top: -20px;">
            <LineChart
              chartId="sum-student-data"
              :xAxis="sumStudentData.xAxis"
              :series="sumStudentData.series"
            />
          </div>
        </div>
        <div class="chart-item-box">
          <div class="chart-title-box chart-title-margin">
            <div class="chart-title">教师入园人数统计</div>
          </div>
          <div class="live-data-chart-box" style="margin-top: -20px;">
            <LineChart
              chartId="sum-teacher-data"
              :xAxis="sumTeacherData.xAxis"
              :series="sumTeacherData.series"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from './../components/LineChart'
import { yhuoDxHttp } from '@/utils/http'

export default {
  data() {
    return {
      totalNumList: [
        {id: 0, text: '今日入园教师人数', value: 'teacher_num'},
        {id: 1, text: '今日入园学生人数', value: 'student_num'},
        {id: 2, text: '今日体温异常人数', value: 'abn_num'}
      ],
      intervalTimer1: null,
      intervalTimer: null,
      cardBorderSquareList: [
        'left-top',
        'right-top',
        'right-bottom',
        'left-bottom'
      ],
      dateTime: '',
      dateTimer: null,
      isBigScreen: false, // 是否全屏
      tableTitleList: ['排名', '年级班级', '总人数', '实到人数', '未到人数'],
      weatherData: {},
      companyData: {},
      deviceCheckData: {},
      classSumList: [],
      companyTotalData: {
        tempData: [],
        sumStudentData: [],
        sumTeacherData: []
      },
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
  components: {
    LineChart
  },
  computed: {
    sumStudentData() {
      return this.setChartData(this.companyTotalData.sumStudentData, 'sum_student')
    },
    sumTeacherData() {
      return this.setChartData(this.companyTotalData.sumTeacherData, 'sum_teacher')
    },
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
    this.getCompanyTotal()
    this.getWeather()
    this.intervalTimer = setInterval(() => {
      this.getCompanyNumber()
      this.getDeviceCheckList()
      this.getClassSumData()
      this.getCompanyTotal()
    }, 180000)
    this.intervalTimer1 = setInterval(() => {
      this.getWeather()
    }, 10800000)
  },
  beforeDestroy() {
    clearInterval(this.dateTimer)
    clearInterval(this.intervalTimer)
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
    // 入校统计日期
    getCompanyTotal() {
      yhuoDxHttp.companyTotal().then(res => {
        this.companyTotalData = res.data
      })
    },
    handleToHome() {
      window.location.href = 'https://school.yfdxb.cn/'
    },
    // handleLogOut() {
    //   window.location.href = 'https://school.yfdxb.cn/'
    // },
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
  width ((466 / 1920) * 100) %
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
      font-size 110px

    .total-text
      font-size 24px
      text-align center
      margin 0 0 32px 0
      @extend .text-color

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
        font-size 38px
        color #06F0B8

      .title
        font-size 20px
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
    height 500px
    background url('https://image.doulaoban.com/big-data/big-data-border-2.png') no-repeat
    background-size 100% 100%
    margin 0 auto

  .goods-rank
    padding 1px 0

  .table-chart-box
    height 450px
    margin 0 10px
    overflow hidden

    .table-title
      width 100%
      height 50px
      border-bottom 1px solid #162b5f

      .table-title-item
        flex 1
        height 100%
        font-size 30px
        @extend .text-color

    .table-content
      width 100%

      .table-column-item
        height 40px
        border-bottom 1px solid #162b5f

      .table-content-item
        flex 1
        height 100%
        font-size 28px
        @extend .text-color

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

  &:nth-child(1)
    margin-top 30px
  &:nth-child(3)
    margin-bottom 0

.chart-item-small
  height 100px
  background url('./../assets/img/big-data-border-3.png') no-repeat
  background-size 101% 100%

.chart-item-big
  height 460px
  background url('./../assets/img/big-data-border-4.png') no-repeat
  background-size 101% 100%

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

  .logo
    margin 0 auto 16px
    display block
    width 322px
    height 73px

  .desc
    font-size 14px
    line-height 20px
    padding 0 16px
    text-indent 2em
    @extend .text-color

  .weather-left
    padding 0 20px
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
      @extend .text-color

    .num
      height 70px
      line-height 70px
      font-size 60px
      margin-right 8px
      @extend .text-color

    .text
      font-size 20px
      line-height 30px
      @extend .text-color

    .label-box
      height 25px
      line-height 25px
      font-size 20px
      text-align center
      padding 0 8px
      border-radius 4px
      background #2FC367
      margin-top 8px
      @extend .text-color

.table-chart-box
  width calc(100% - 20px)
  height 60px
  padding-left 24px

  & >>> .el-carousel__indicators--vertical
    display none

  .medium
    height 60px
    line-height 60px
    font-size 28px
    @extend .text-color

    .medium-item
      margin-right 8px

.table-school-box
  width calc(100% - 20px)
  height 420px
  padding-left 24px
  margin-top 20px
  overflow hidden

  .table-item
    height 60px
    margin-bottom 20px

    .user-avatar
      width 50px
      height 50px
      border-radius 50%
      margin-right 18px
      flex-shrink 0
    
    .info-1
      height 25px
      line-height 25px
      font-size 26px
      @extend .text-color

    .info-2
      height 35px
      line-height 35px
      font-size 28px
      @extend .text-color

    .info-item
      margin-right 8px
</style>