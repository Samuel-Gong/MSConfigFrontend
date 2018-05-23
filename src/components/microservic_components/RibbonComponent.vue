<template>
  <el-row class="component-wrapper">
    <el-col>
      <div class="service-item">
        <h2>3. Ribbon</h2>
        <el-checkbox v-model="componentCheck.checkedRibbon">选择</el-checkbox>
      </div>
      <hr/>
    </el-col>
  </el-row>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "RibbonComponent",
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

</style>
