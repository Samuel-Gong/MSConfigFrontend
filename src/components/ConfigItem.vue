<template>
  <el-collapse-item
    :title="itemName"
    :name="service.name"
    :key="service.name"
  >
    <h4>必填信息</h4>
    <div>
      spring.application.name
      <el-input
        v-model="service.config['spring.application.name']">
      </el-input>
    </div>
    <div>
      server.port
      <el-input
        v-model="service.config['server.port']">
      </el-input>
    </div>
    <div>
      eureka.client.serviceUrl.defaultZone
      <el-input
        v-model="service.config['eureka.client.serviceUrl.defaultZone']">
      </el-input>
    </div>
    <div>
      eureka.instance.prefer-ip-address
      <el-input
        v-model="service.config['eureka.instance.prefer-ip-address']">
      </el-input>
    </div>
    <div>
      打包路径
      <el-input
        v-model="service.jarPath">
      </el-input>
    </div>
    <h4>其它配置</h4>
    <el-table
      :data="service.addedConfigs"
    >
      <el-table-column
        label="配置名称"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="配置值"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 2%">
      <el-row v-if="isAddConfig">
        <el-col :span="4">
          <el-input v-model="configKey" placeholder="请输入配置名称" clearable></el-input>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-input v-model="configValue" placeholder="请输入配置值" clearable></el-input>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-button
            size="mini"
            @click="addConfig">确认
          </el-button>
          <el-button
            size="mini"
            @click="clearConfigInput">取消
          </el-button>
        </el-col>
      </el-row>
      <el-row v-if="!isAddConfig">
        <el-button size="small" @click="isAddConfig = true">添加配置</el-button>
      </el-row>
    </div>
  </el-collapse-item>
</template>

<script>
  export default {
    name: "ConfigItem",
    props: ["service"],
    data() {
      return {
        isAddConfig: false,
        configKey: "",
        configValue: ""
      }
    },
    methods: {
      handleDelete(index, row) {
        this.service.addedConfigs.splice(index, 1);
        console.log(index, row);
      },
      // 提交添加的配置
      addConfig() {
        this.service.addedConfigs.push(
          {
            key: this.configKey,
            value: this.configValue
          }
        );
        this.clearConfigInput();
      },
      // 取消添加配置
      clearConfigInput() {
        this.configKey = "";
        this.configValue = "";
        this.isAddConfig = false;
      }
    },
    computed: {
      itemName() {
        return "服务名称:" + this.service.name
      }
    }
  }
</script>

<style scoped>

</style>
