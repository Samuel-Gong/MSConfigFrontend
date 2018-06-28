import Vue from 'vue'

// 0. 使用模块化机制编程，导入Vue和Vuex，要调用 Vue.use(VueRouter)
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

const qs = require('qs')

const store = new Vuex.Store({

  // 严格模式，对于v-model有限制，故不使用
  // strict: true,

  // 应用状态的数据，各组件的共享数据
  state: {

    // login
    isLogin: false,

    // 当前激活的steps
    stepsActive: 0,

    // 所有服务，服务名称及本机地址
    services: [],
    // 是否从Git上拉取服务
    fromGit: true,
    // 是否将生成的服务push到git
    toGit: true,

    // 保存被选择的微服务组件
    componentCheck: {
      checkedEurekaServer: true,
      checkedEurekaClient: true,
      checkedRibbon: false,
      checkedHystrix: false,
      checkedZuul: false,
    },
    // eureka server的配置
    eurekaServerInfo: {
      groupId: "",
      artifactId: ""
    },
    // 网关
    ribbon: {
      consumers: [],
      providers: []
    },

    // zuul 的配置
    zuulInfo: {
      groupId: "",
      artifactId: ""
    },

    // compose
    composeInfo: []
  },

  // store的计算属性，state的一些派生状态
  getters: {},

  // 唯一允许更新应用状态的地方
  mutations: {

    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },

    // 这里怎么使用解构，给payload一个默认值
    increStep(state) {
      state.stepsActive++;
    },
    decreStep(state) {
      state.stepsActive--;
    },
    setStep(state, num) {
      state.stepsActive = num;
    },

    addService(state, service) {
      let newService =
        {
          serviceName: service.serviceName,

          // folder
          folderName: service.folderName,
          folder: service.folder
        };
      state.services.push(newService);
    },
    deleteService(state, index) {
      state.services.splice(index, 1);
    },
    switchFromGit(state, status) {
      state.fromGit = status
    },
    switchToGit(state, status) {
      state.toGit = status
    },

    addRibbonProvider(state, providerName) {
      state.ribbon.providers.push(providerName);
    },
    deleteRibbonProvider(state, index) {
      state.ribbon.providers.splice(index, 1);
    },

    addRibbonConsumer(state, consumerName) {
      state.ribbon.consumers.push(consumerName);
    },
    deleteRibbonConsumer(state, index) {
      state.ribbon.consumers.splice(index, 1);
    }
  },
  // 定义提交触发更改信息的描述，常见的例子是从服务端获取数据
  // Action 提交的是 mutation，而不是直接变更状态。
  // Action 可以包含任意异步操作。
  actions: {
    // 拉取服务
    pullFromGit({state, commit}, gitPath) {
      axios({
        url: '/git/clone',
        method: 'post',
        data: qs.stringify({"gitPath": gitPath}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(function (response) {
          console.log(response.data);
          response.data.forEach(function (service) {
            commit("addService", {
              serviceName: service.serviceName,
              folderName: service.folderName,
              folder: []
            })
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
  // 允许将单一的 Store 拆分为多个 Store 的同时保存在单一的状态树中。随着应用复杂度的增加，这种拆分能够更好地组织代码
  modules: {}
})
export default store
