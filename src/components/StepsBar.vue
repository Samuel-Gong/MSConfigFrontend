<template>
  <el-row>
    <div class="steps-bar">
      <el-steps direction="vertical" finish-status="success" :active="active">
        <el-step
          v-for="(step, index) in stepsData"
          :title="step.title"
          :description="step.description"
          :key=index>
        </el-step>
      </el-steps>
    </div>
  </el-row>
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
            title: "步骤1",
            description: "选择业务代码"
          },
          {
            title: "步骤2",
            description: "Eureka Server"
          },
          {
            title: "步骤3",
            description: "Eureka Client"
          },
          {
            title: "步骤4",
            description: "Ribbon"
          },
          {
            title: "步骤5",
            description: "Hystrix"
          },
          {
            title: "步骤6",
            description: "RabbitMQ"
          },
          {
            title: "步骤7",
            description: "Zuul"
          },
          {
            title: "步骤8",
            description: "配置相关"
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
  .steps-bar {
    margin-top: 8%;
    margin-left: 35%;
    height: 600px;
  }
</style>
