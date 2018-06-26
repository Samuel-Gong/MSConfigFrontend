<template>
  <el-steps finish-status="success" :active="active">
    <el-step
      v-for="(step, index) in stepsData"
      :title="step.title"
      :description="step.description"
      :key=index>
    </el-step>
  </el-steps>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "StepsBar",
    data() {
      return {
        // 要显示的步骤条的数据
        stepsData: [
          {
            title: "Step 1",
            description: "Select Services"
          },
          {
            title: "Step 2",
            description: "Eureka Server"
          },
          {
            title: "Step 3",
            description: "Eureka Client"
          },
          {
            title: "Step 4",
            description: "Ribbon"
          },
          {
            title: "Step 5",
            description: "Hystrix"
          },
          {
            title: "Step 6",
            description: "Zuul"
          },
          {
            title: "Step 7",
            description: "Config Results"
          }
        ]
      }
    },
    computed: {
      ...mapState({
        active: 'stepsActive'
      })
    }
  }
</script>

<style scoped>
</style>
