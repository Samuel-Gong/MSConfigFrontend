import Vue from 'vue'
// 完整引入Element
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App'
import NormailizeCss from 'normalize.css'

import VueRouter from 'vue-router'

Object.defineProperty(Vue.prototype, '$axios', {value: axios});

Vue.config.productionTip = false;

// 配置组件默认尺寸均为small
Vue.use(Element, {size: 'small'});
Vue.use(VueRouter)

/* eslint-disable no-new */
// 创建根实例
new Vue({
  // 根实例特有的el
  el: '#app',
  template: '<App/>',
  components: {App},
  render: h => h(App)
});
