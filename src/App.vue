<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <my-header/>
      </el-header>
      <el-container>
        <el-aside width="500px">
          <steps-bar/>
        </el-aside>
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="20">
                <router-view/>
              </el-col>
            </el-row>
          </el-main>
          <el-footer>
            <el-row>
              <el-col :span="4" :offset="19" v-if="active === 0">
                <next-step-btn v-if="active < 7"/>
              </el-col>
              <el-col :span="6" :offset="18" v-if="active !== 0">
                <pre-step-btn v-if="active > 0"/>
                <next-step-btn v-if="active < 7"/>
                <submit-btn v-if="active === 7"/>
              </el-col>
            </el-row>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  import MyHeader from './components/MyHeader'
  import StepsBar from './components/StepsBar'

  // footer的三个btn
  import PreStepBtn from './components/PreStepBtn'
  import NextStepBtn from './components/NextStepBtn'
  import SubmitBtn from './components/SubmitBtn'

  // vuex
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import {STEPS_INCRE, STEPS_DECRE} from "./store/mutations";

  export default {
    // 组件名称
    name: 'app',
    components: {
      'my-header': MyHeader,
      'steps-bar': StepsBar,

      // footer
      'pre-step-btn': PreStepBtn,
      'next-step-btn': NextStepBtn,
      'submit-btn': SubmitBtn
    },
    computed: {
      ...mapState({
        // 表示当前执行到的步骤
        active: 'stepsActive'
      })
    }
  }

</script>

<style>
  .header {
    background-color: #409EFF;
    color: #fff;
    line-height: 60px;
  }
</style>
