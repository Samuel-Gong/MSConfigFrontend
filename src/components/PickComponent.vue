<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 80%">
      <el-table-column
        label="服务名称"
        width="350">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="本机地址"
        width="350">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
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
    <el-row v-if="isAddService">
      <el-col :span="4">
        <el-input v-model="serviceName" placeholder="请输入服务名称"></el-input>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input v-model="serviceAddress" placeholder="请输入服务本机地址"></el-input>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button
          size="mini"
          @click="submitAdd">提交
        </el-button>
        <el-button
          size="mini"
          @click="cancelAdd">取消
        </el-button>
      </el-col>
    </el-row>
    <el-row v-if="!isAddService">
      <el-button size="small" @click="addService">添加服务</el-button>
      <el-button size="small" @click="$emit('nextStep')">下一步</el-button>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        // 表示当前是否正在增加服务
        isAddService: false,
        serviceName: "",
        serviceAddress: ""
      }
    },
    methods: {
      handleDelete(index, row) {
        this.tableData.splice(index, 1);
        console.log(index, row);
      },
      addService() {
        this.isAddService = true;
      },
      // 确认提交
      submitAdd() {
        this.tableData.push(
          {
            name: this.serviceName,
            address: this.serviceAddress
          }
        );
        this.serviceName = "";
        this.serviceAddress = "";
        this.isAddService = false;
      },
      // 取消提交
      cancelAdd() {
        this.serviceName = "";
        this.serviceAddress = "";
        this.isAddService = false;
      }
    }
  }
</script>
