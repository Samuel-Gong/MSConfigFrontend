<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="6">
          <h2>Eureka Client</h2>
        </el-col>
        <el-col :span="1">
          <el-tooltip effect="dark" placement="right">
            <div slot="content">
              Eureka Client<br/>
              Eureka Client is a client in Java simplifying interaction with Eureka Server caching information<br/>
              in service registering table. Once Eureka Server is broken, client will provide the information<br/>
              in its cache. Each service is a Eureka Client.<br/>
              &nbsp;&nbsp;• Update each service codes<br/>
              &nbsp;&nbsp;• Add dependency in pom.xml<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupIdorg&gt;.springframework.cloud&lt;/groupId&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;spring-cloud-starter-eureka&lt;/artifactId&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
              &nbsp;&nbsp;• Add annotation in startup class<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;@EnableDiscoveryClient<br/>
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
    <el-main>
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

  import PreviewPanel from '../../../components/preview/PreviewPanel'
  import {mapState} from 'vuex'

  export default {
    name: "EurekaClient",
    components: {
      'preview-panel': PreviewPanel
    },
    data() {
      return {
        modifiedServices: [],
        modifiedComponents: [],
        isOverview: false
      }
    },
    computed: {
      ...mapState([
        'services',
      ])
    },
    methods: {
      overview() {
        console.log("overview");

        console.log(this.services);

        let _this = this;
        this.$axios({
          url: '/preview/eurekaClient',
          method: 'post',
          data: {serviceInfoList: this.services},
        })
          .then(function (response) {
            console.log(response.data);
            response.data.forEach(function (service) {
              let files = [];
              service.fileInfoList.forEach(function (file) {
                files.push({
                  fileName: file.fileName,
                  content: file.fileContent,
                  linesList: file.linesList,
                  isShow: false
                });
              });
              _this.modifiedServices.push({
                serviceName: service.serviceName,
                files: files
              });
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
