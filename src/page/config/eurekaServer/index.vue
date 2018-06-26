<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="10">
          <div>
            <h2>Eureka Server</h2>
          </div>
        </el-col>
        <el-col :span="2">
          <el-checkbox checked disabled>Required</el-checkbox>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
    <el-main style="margin-top: 3%">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="3">GroupId:</el-col>
        <el-col :span="5">
          <el-input
            placeholder="groupId"
            v-model="eurekaServerInfo.groupId"
          >
          </el-input>
        </el-col>
        <el-col :span="3" :offset="3">ArtifactId:</el-col>
        <el-col :span="5">
          <el-input
            placeholder="artifactId"
            v-model="eurekaServerInfo.artifactId"
          >
          </el-input>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button size="mini">Overview</el-button>
        </el-col>
      </el-row>
      <preview-panel></preview-panel>
    </el-main>
  </el-container>
</template>

<script>

  import {mapState} from 'vuex'
  import PreviewPanel from '../../../components/preview/PreviewPanel'

  export default {
    name: "EurekaServer",
    components: {
      'preview-panel': PreviewPanel
    },
    computed: {
      ...mapState([
        'eurekaServerInfo',
        'checkedEurekaServer'
      ])
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>

