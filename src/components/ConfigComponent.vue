<template>
  <el-container>
    <el-aside width="550px">
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
            <next-step-btn v-if="active < 8"/>
          </el-col>
          <el-col :span="6" :offset="18" v-if="active !== 0">
            <pre-step-btn v-if="active > 0 && active < 8"/>
            <next-step-btn v-if="active < 7"/>
            <submit-btn v-if="active === 7"/>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>

  import StepsBar from './StepsBar'

  // footer的三个btn
  import PreStepBtn from './PreStepBtn'
  import NextStepBtn from './NextStepBtn'
  import SubmitBtn from './SubmitBtn'

  // vuex
  import {mapState} from 'vuex'

  export default {
    // 组件名称
    name: 'ProcessComponent',
    components: {
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
