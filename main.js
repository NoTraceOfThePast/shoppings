
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
uni.$http=$http
$http.baseUrl='https://api-ugo-web.itheima.net'
$http.beforeRequest = function (options) {
  // do somethimg...
  uni.showLoading({
    title:'数据加载中'
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  // do something...
  uni.hideLoading()
}
uni.$showMsg=function(title='请求数据失败',duration=2000){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}