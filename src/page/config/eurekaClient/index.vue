<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="8">
          <h2>Eureka Client</h2>
        </el-col>
        <el-col :span="2">
          <el-checkbox checked disabled>Required</el-checkbox>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
  </el-container>
</template>

<script>
  export default {
    name: "EurekaClient"
  }
</script>

<style scoped>
  @import "../common.css";
</style>
