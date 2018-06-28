<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="8">
          <h2>Eureka Client</h2>
        </el-col>
        <el-col :span="1" :offset="9">
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
        :services='services'
        :components='components'
        v-if="isOverview"
      >
      </preview-panel>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "EurekaClient",
    data () {
      return {
        services: [],
        components: [],
        isOverview: false
      }
    },
    methods: {
      overview() {
        console.log("overview");
        let _this = this;
        this.$axios({
          url: '/preview/eureka-client',
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
            _this.components.push({
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
