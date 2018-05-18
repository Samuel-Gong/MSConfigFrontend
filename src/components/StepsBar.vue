<template>
  <el-row>
    <el-col :offset="8">
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
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "StepsBar",
    props: ["stepsData", "active"],
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .steps-bar {
    margin-top: 30px;
    height: 300px;
  }
</style>
