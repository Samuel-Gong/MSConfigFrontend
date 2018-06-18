<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="Git Path">
      <el-input v-model="gitPath"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        gitPath: ""
    }
    }
  }
</script>

<style scoped>

</style>
