import Vue from 'vue'

// 0. 使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Router from 'vue-router'

Vue.use(Router)

import LoginComponent from '@/components/LoginComponent'

// 1. 定义（路由）组件。
// 也可以从其他文件 import 进来
import AddBusinessCode from '@/components/AddBusinessCode'
import Config from '@/components/Config'

// 5个微服务组件
import EurekaServer from '@/components/microservic_components/EurekaServer'
import EurekaClient from '@/components/microservic_components/EurekaClient'
import RibbonComponent from '@/components/microservic_components/RibbonComponent'
import HystrixComponent from '@/components/microservic_components/HystrixComponent'
import ZuulComponent from '@/components/microservic_components/ZuulComponent'

// docker compose
import ComposeComponent from '@/components/ComposeComponent'


// mysql
import MysqlComponent from '@/components/MysqlComponent'

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
  // 从根路径重定向到第一步
  {
    path: '/',
    redirect: '/1'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/1',
    name: 'Step 1',
    component: AddBusinessCode
  },
  {
    path: '/2',
    name: 'Step 2',
    component: EurekaServer
  },
  {
    path: '/3',
    name: 'Step 3',
    component: EurekaClient
  },
  {
    path: '/4',
    name: 'Step 4',
    component: RibbonComponent
  },
  {
    path: '/5',
    name: 'Step 5',
    component: HystrixComponent
  },
  {
    path: '/6',
    name: 'Step 6',
    component: ZuulComponent
  },
  {
    path: '/7',
    name: 'Step 7',
    component: Config
  },
  {
    path: '/8',
    name: 'Step 8',
    component: MysqlComponent
  },
  {
    path: '/9',
    name: 'Step 9',
    component: ComposeComponent
  }
  // {
  //   path: '/index',
  //   name: 'Index',
  //   component: Index,
  //   // 路由独享守卫
  //   beforeEnter: (to, from, next) => {
  //     console.log(
  //       "index路由独享守卫:" + "\n" +
  //       "from url:" + from + "\n" +
  //       "to url:" + to + "\n"
  //     );
  //     next();
  //   }
  // },
  // {
  //   path: '/hello',
  //   name: 'Hello',
  //   component: Hello
  // },
  // // 动态路由
  // {
  //   path: '/user/:id',
  //   name: 'User',
  //   component: User,
  //   children: [
  //     {
  //       path: 'profile',
  //       name: 'Profile',
  //       component: Profile
  //     }
  //   ]
  // }
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new Router({
  routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log(
    "全局前置守卫:" + "\n" +
    "from url:" + from.path + "\n" +
    "to url:" + to.path + "\n"
  );
  next();
});

export default router
