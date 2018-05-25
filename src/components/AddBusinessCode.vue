<template>
  <div>
    <el-table
      :data="services"
    >
      <el-table-column
        label="服务名称"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="本机地址"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteService(scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 2%">
      <el-row v-if="isAddService">
        <el-col :span="4">
          <el-input v-model="serviceName" placeholder="请输入服务名称" clearable></el-input>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-input v-model="serviceAddress" placeholder="请输入服务本机地址" clearable></el-input>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-button
            size="mini"
            @click="addService">提交
          </el-button>
          <el-button
            size="mini"
            @click="clearInput">取消
          </el-button>
        </el-col>
      </el-row>
      <el-row v-if="!isAddService">
        <el-button size="small" @click="isAddService = true">添加服务</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>

  import {mapState, mapMutations} from 'vuex'
  import {SERVICE_ADD, SERVICE_DELETE} from "../store/mutations";

  export default {
    data() {
      return {
        // 表示当前是否正在增加服务
        isAddService: false,
        serviceName: "",
        serviceAddress: ""
      }
    },
    computed: {
      ...mapState({
        services: 'services'
      })
    },
    methods: {
      // 确认提交
      addService() {
        let newService =
          {
            name: this.serviceName,
            address: this.serviceAddress,
            config: {
              "spring.application.name": "",
              "server.port": "",
              "eureka.client.serviceUrl.defaultZone": "",
              "eureka.instance.prefer-ip-address": "",
            },
            addedConfigs: [],
            jarPath: ""
          };
        this.$store.commit(SERVICE_ADD, newService);
        this.clearInput();
      },
      deleteService(index) {
        this.$store.commit(SERVICE_DELETE, index);
      },
      clearInput() {
        this.serviceName = "";
        this.serviceAddress = "";
        this.isAddService = false;
      }
    }
  }
</script>
