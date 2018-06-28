<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="2">
          <h2>Hystrix</h2>
        </el-col>
        <el-col :span="1">
          <el-tooltip effect="dark" placement="right">
            <div slot="content">
              Step5: Hystrix<br/>
              Hystrix is a latency and fault tolerance library designed to isolate points of access to<br/>
              remote systems and services stopping cascading failure. Hystrix can provide fallback<br/>
              options improving system’s overall resiliency.<br/>
              • Add Hystrix dependency<br/>
              &nbsp;&nbsp;&lt;dependency&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;spring-cloud-starter-hystrix&lt;/artifactId&gt;<br/>
              &nbsp;&nbsp;&lt;/dependency&gt;<br/>
              • Add annotation @EnableCircuitBreaker for startup class<br/>
              • Update Controller codes, add fallback methods for each designated method.<br/>
            </div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-col>
        <el-col :span="1" :offset="16">
          <el-checkbox v-model="componentCheck.checkedHystrix">Select</el-checkbox>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button :disabled="!componentCheck.checkedHystrix" @click="overview">Overview</el-button>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
    <el-main class="component-main">
      <el-table
        :data="hystrixMethods"
        style="margin-bottom: 5%"
        :disabled="!componentCheck.checkedHystrix"
      >
        <el-table-column
          label="Service Name"
          width="330">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Controller Name"
          width="330">
          <template slot-scope="scope">
            <span>{{ scope.row.controllerName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Method Name"
          width="330">
          <template slot-scope="scope">
            <span>{{ scope.row.methodName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteHystrixMethod(scope.row, scope.$index)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="8" :offset="12">
          <el-cascader
            :options="options"
            placeholder="Service/Controller/Method"
            v-model="selectedOptions"
            :disabled="!componentCheck.checkedHystrix"
            style="width: 100%"
          >
          </el-cascader>
        </el-col>
        <el-col :offset="2" :span="2">
          <el-button
            size="small"
            @click="addHystrixMethod"
            :disabled="!componentCheck.checkedHystrix"
          >Add
          </el-button>
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

  export default {
    name: "HystrixComponent",
    data() {
      return {
        options: [{
          value: 'account_service',
          label: 'account_service',
          children: [{
            value: 'TestController1',
            label: 'TestController1',
            children: [{
              value: 'TestMethod1',
              label: 'TestMethod1'
            }]
          }, {
            value: 'TestController2',
            label: 'TestController2',
            children: [{
              value: 'TestMethod2',
              label: 'TestMethod2'
            }]
          }]
        }],
        selectedOptions: [],

        modifiedServices: [],
        modifiedComponents: [],
        isOverview: false
      }
    },
    computed: {
      ...mapState([
        'componentCheck',
        'services',
        'hystrixMethods'
      ])
    },
    methods: {
      addHystrixMethod() {
        this.hystrixMethods.push({
          serviceName: this.selectedOptions[0],
          controllerName: this.selectedOptions[1],
          methodName: this.selectedOptions[2]
        })
      },
      deleteHystrixMethod(row, index) {
        this.hystrixMethods.splice(index, 1);
      },

      overview() {
        console.log("overview");
        let _this = this;

        let methodsMap = {};
        this.hystrixMethods.forEach(function (hystrixMethod) {
          methodsMap[hystrixMethod.serviceName] = [];
        });
        this.hystrixMethods.forEach(function (hystrixMethod) {
          methodsMap[hystrixMethod.serviceName].push(hystrixMethod.methodName);
        });

        let previewHystrix = {
          serviceInfoList: this.services,
          methodsMap: methodsMap
        };

        this.$axios({
          url: '/preview/hystrix',
          method: 'post',
          data: previewHystrix
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
    },
    created() {
      // todo 获取service的controller及方法
      let _this = this;
      this.$axios({
        url: '/addHystrix/getMethods',
        method: 'post',
        data: {'serviceInfoList': _this.services},
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>
