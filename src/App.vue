<template>
  <div id="app">
    <!--<h1>Hello App!</h1>-->
    <!--<p>-->
      <!--&lt;!&ndash; 使用 router-link 组件来导航. &ndash;&gt;-->
      <!--&lt;!&ndash; 通过传入 `to` 属性指定链接. &ndash;&gt;-->
      <!--&lt;!&ndash; <router-link> 默认会被渲染成一个 `<a>` 标签 &ndash;&gt;-->
      <!--<router-link to="/foo">Go to Foo</router-link>-->
      <!--<router-link to="/bar">Go to Bar</router-link>-->
    <!--</p>-->
    <!--&lt;!&ndash; 路由出口 &ndash;&gt;-->
    <!--&lt;!&ndash; 路由匹配到的组件将渲染在这里 &ndash;&gt;-->
    <!--<router-view></router-view>-->

    <el-container>
      <el-header class="header">
        <my-header/>
      </el-header>
      <el-container style="height: 100%;">
        <el-aside>
          <steps-bar :stepsData="stepsData" :active="active"/>
        </el-aside>
        <el-main>
          <add-business-code @nextStep="nextStep" @preStep="preStep"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  import MyHeader from './components/MyHeader'
  import StepsBar from './components/StepsBar'
  import AddBusinessCode from './components/AddBusinessCode'
  import PickComponent from './components/PickComponent'

  export default {
    // 组件名称
    name: 'app',
    components: {
      'my-header': MyHeader,
      'steps-bar': StepsBar,
      'add-business-code': AddBusinessCode,
      'pick-component': PickComponent
    },
    data() {
      return {
        // 要显示的步骤条的数据
        stepsData: [
          {
            title: "步骤1",
            description: "选择业务代码"
          },
          {
            title: "步骤2",
            description: "选择微服务组件"
          }
        ],
        // 表示当前执行到的步骤
        active: 0
      }
    },
    methods: {
      // 下一步
      nextStep() {
        this.active++;
      },
      // 上一步，只有选择业务代码和微服务组件的时候才可以使用
      preStep() {
        this.active--;
      }
    }
  }

</script>

<style>
  .header {
    background-color: #409EFF;
    color: #fff;
    line-height: 60px;
  }

  sidebar {
    height: 100%;
  }
</style>
