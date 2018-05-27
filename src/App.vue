<template>
  <div id="app">
    <router-view/>
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
