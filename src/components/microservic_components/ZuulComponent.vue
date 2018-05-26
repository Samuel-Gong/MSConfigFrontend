<template>
  <el-row class="component-wrapper">
    <el-col>
      <div class="service-item">
        <h2>Zuul</h2>
        <!-- `checked` 为 true 或 false -->
        <el-checkbox v-model="componentCheck.checkedZuul">Select</el-checkbox>
      </div>
      <hr/>
    </el-col>
  </el-row>
</template>

<script>

  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "ZuulComponent",
    computed: {
      ...mapState([
        'componentCheck',
      ])
    }
  }
</script>

<style scoped>

</style>
