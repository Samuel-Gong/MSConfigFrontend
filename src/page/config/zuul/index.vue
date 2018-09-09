<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="2">
          <h2>Zuul</h2>
        </el-col>
        <el-col :span="1">
          <el-tooltip effect="dark" placement="right">
            <div slot="content">
              Zuul<br/>
              Zuul is a gateway service that provides dynamic routing, monitoring, resiliency, security, and more.<br/>
              •	Create a maven project，with dependency<br/>
              &nbsp;&nbsp;&lt;dependency&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;spring-cloud-starter-zuul&lt;/artifactId&gt;<br/>
              &nbsp;&nbsp;&lt;/dependency&gt;<br/>
              •	Add annotation @EnableZuulProxy for startup class<br/>
              •	Update configuration file ‘application.yml’<br/>
            </div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-col>
        <el-col :span="1" :offset="17">
          <el-checkbox v-model="componentCheck.checkedZuul">Select</el-checkbox>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button :disabled="!componentCheck.checkedZuul" @click="overview">Overview</el-button>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
    <el-main class="component-main">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="2" :offset="5">GroupId:</el-col>
        <el-col :span="5">
          <el-input
            placeholder="groupId"
            v-model="zuulInfo.groupId"
            :disabled="!componentCheck.checkedZuul"
          >
          </el-input>
        </el-col>
        <el-col :span="2" :offset="3">ArtifactId:</el-col>
        <el-col :span="5">
          <el-input
            placeholder="artifactId"
            v-model="zuulInfo.artifactId"
            :disabled="!componentCheck.checkedZuul"
          >
          </el-input>
        </el-col>
      </el-row>
      <preview-panel
        :services='services'
        :components='components'
        v-if="isOverview"
      >
      </preview-panel>
    </el-main>
  </el-container>
</template>

<script>

import {mapState} from 'vuex'
import PreviewPanel from '../../../components/preview/PreviewPanel'

export default {
  name: 'ZuulComponent',
  data () {
    return {
      services: [],
      components: [],
      isOverview: false
    }
  },
  components: {
    'preview-panel': PreviewPanel
  },
  computed: {
    ...mapState([
      'componentCheck',
      'zuulInfo'
    ])
  },
  methods: {
    overview () {
      console.log('overview')
      let _this = this
      this.$axios({
        url: '/preview/zuul',
        method: 'post',
        data: this.zuulInfo
      })
        .then(function (response) {
          let files = []
          console.log(response.data)
          response.data.fileInfoList.forEach(function (file) {
            files.push({
              fileName: file.fileName,
              content: file.fileContent,
              linesList: file.linesList,
              isShow: false
            })
          })
          _this.components.push({
            serviceName: response.data.serviceName,
            files: files
          })
          _this.isOverview = true
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  @import "../common.css";
</style>
