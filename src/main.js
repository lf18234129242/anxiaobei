import Vue from 'vue'
import App from './App.vue'
import './assets/stylus/index.styl'
import { 
  Carousel,
  CarouselItem
 } from 'element-ui'

Vue.use(Carousel)
 .use(CarouselItem)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
