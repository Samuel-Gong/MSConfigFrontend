<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="10">
          <div>
            <h2>Hystrix</h2>
          </div>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-model="componentCheck.checkedHystrix">Select</el-checkbox>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
  </el-container>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "HystrixComponent",
    computed: {
      ...mapState({
        componentCheck() {
          return this.$store.state.componentCheck
        }
      })
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>
