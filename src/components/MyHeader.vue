<template>
  <el-row>
    <el-col :span="2" :offset="3">
      <span>Deck.io</span>
    </el-col>
    <el-col :span="10" :offset="1">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item index="1" :route="processRoute">Create</el-menu-item>
        <el-menu-item index="2" :route="containRoute">Containers</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "MyHeader",
    data() {
      return {
        activeIndex: '1',
        processRoute: {
          path: '/process/1'
        },
        containRoute: {
          path: '/container'
        }
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
</style>
