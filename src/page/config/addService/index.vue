<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="10">
          <div>
            <h2>Add Service</h2>
          </div>
        </el-col>
        <el-col :span="5">
          <el-switch
            v-model="fromGit"
            active-text="Git"
            inactive-text="Manually"
            @change="handleSwitch"
          >
          </el-switch>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
    <el-main style="margin-top: 5%">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: "index",
    data() {
      return {
        fromGit: true
      }
    },
    methods: {
      handleSwitch() {
        if (this.fromGit) {
          this.$router.push(
            {path: '/config/1/git'}
          )
        } else {
          this.$router.push(
            {path: '/config/1/manual'}
          )
        }
      }
    }
  }
</script>
