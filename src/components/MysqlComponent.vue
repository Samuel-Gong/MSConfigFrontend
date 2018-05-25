<template>
  <el-row class="component-wrapper">
    <el-col>
      <div class="service-item">
        <h2>数据库创建选项</h2>
        <el-checkbox checked disabled>必选</el-checkbox>
      </div>
      <hr/>
    </el-col>
    <el-row>
      <el-col>
        <div class="input-item">
          <el-col :span="3">项目名称：</el-col>
          <el-col :span="6">
            <el-input
              placeholder="请输入项目名称"
              v-model="mysqlInfo.projectName">
            </el-input>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="input-item">
          <el-col :span="6">数据库名：</el-col>
          <el-col :span="12">
            <el-input
              placeholder="请输入数据库名"
              v-model="mysqlInfo.database">
            </el-input>
          </el-col>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="input-item">
          <el-col :span="7">目标文件夹：</el-col>
          <el-col :span="12">
            <el-input
              placeholder="请输入目标文件夹"
              v-model="mysqlInfo.baseDir">
            </el-input>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="input-item">
          <el-col :span="6">用户名：</el-col>
          <el-col :span="12">
            <el-input
              placeholder="请输入用户名"
              v-model="mysqlInfo.user">
            </el-input>
          </el-col>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="input-item">
          <el-col :span="7">密码：</el-col>
          <el-col :span="12">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="mysqlInfo.password">
            </el-input>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 2%">
      <el-row v-if="isAddTable">
        <el-col :span="4">
          <el-input v-model="tableName" placeholder="请输入表名" clearable></el-input>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-button
            size="mini"
            @click="addTable">确认
          </el-button>
          <el-button
            size="mini"
            @click="clearTableInput">取消
          </el-button>
        </el-col>
      </el-row>
      <el-row v-if="!isAddTable">
        <el-button size="small" @click="isAddTable = true">添加表</el-button>
      </el-row>
    </div>
    <el-collapse v-model="activeNames" v-if="mysqlInfo.tables.length !== 0">
      <table-item
        v-for="(table, index) in mysqlInfo.tables"
        :table="table"
        :key="index"
      >
      </table-item>
    </el-collapse>
  </el-row>
</template>

<script>

  import {mapState, mapMutations} from 'vuex'
  import {TABLE_ADD} from "../store/mutations";

  import TableItem from "./TableItem"

  export default {
    name: "MysqlComponent",
    components: {
      "table-item": TableItem
    },
    data() {
      return {
        activeNames: [],
        isAddTable: false,
        tableName: ""
      }
    },
    computed: {
      ...mapState([
        "mysqlInfo"
      ])
    },
    methods: {
      // 提交添加的表
      addTable() {
        let tableInfo = {
          tableName: this.tableName,
          columnList: [],
          primary_key: ""
        };
        this.$store.commit(TABLE_ADD, tableInfo);
        this.clearTableInput();
      },
      clearTableInput() {
        this.tableName = "";
        this.isAddTable = false;
      }
    }
  }
</script>

<style scoped>
  .service-item {
    display: -webkit-flex; /* Safari */
    display: flex;
    /*主轴对齐方式*/
    justify-content: space-between;
    /*纵轴对齐方式*/
    align-items: center
  }

  .input-item {
    margin-top: 4%;

    display: -webkit-flex; /* Safari */
    display: flex;
    /*主轴对齐方式*/
    justify-content: flex-start;
    /*纵轴对齐方式*/
    align-items: center
  }
</style>
