<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="6">
          <h2>Eureka Server</h2>
        </el-col>
        <el-col :span="1">
          <el-tooltip effect="dark" placement="right">
            <div slot="content">
              Eureka Server<br/>
              Eureka is a REST(Representational State Transfer) based service for microservice discovery<br/>
              integrated in Spring Cloud’s subproject Spring Cloud Netflix.<br/>
              Eureka Server provides ability of microservice discovery. When each service provider starts, <br/>
              it’ll register itself on Server, like IP, port and service name, Server can store the information.<br/>
              While service consumer can get service from Eureka Server.<br/>
              •	Create a Maven project as Eureka Server with designated GroupId and ArtifactId.
            </div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-col>
        <el-col :span="1" :offset="15">
          <el-checkbox checked disabled>Required</el-checkbox>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button @click="overview">Overview</el-button>
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
            v-model="eurekaServerInfo.groupId"
          >
          </el-input>
        </el-col>
        <el-col :span="2" :offset="3">ArtifactId:</el-col>
        <el-col :span="5">
          <el-input
            placeholder="artifactId"
            v-model="eurekaServerInfo.artifactId"
          >
          </el-input>
        </el-col>
      </el-row>
      <preview-panel
        :services='modifiedServices'
        :components='modifiedComponents'
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
    name: "EurekaServer",
    data() {
      return {
        modifiedServices: [],
        modifiedComponents: [],
        isOverview: false
      }
    },
    components: {
      'preview-panel': PreviewPanel
    },
    computed: {
      ...mapState([
        'eurekaServerInfo',
        'checkedEurekaServer',
      ])
    },
    methods: {
      overview() {
        console.log("overview");

        let _this = this;
        this.$axios({
          url: '/preview/eurekaServer',
          method: 'post',
          data: this.eurekaServerInfo,
        })
          .then(function (response) {
            let files = [];
            console.log(response.data);
            response.data.fileInfoList.forEach(function (file) {
              files.push({
                fileName: file.fileName,
                content: file.fileContent,
                linesList: file.linesList,
                isShow: false
              });
            });
            _this.modifiedComponents.push({
              serviceName: response.data.serviceName,
              files: files
            });
            _this.isOverview = true;
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>

