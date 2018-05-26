<template>
  <el-row class="component-wrapper">
    <el-col>
      <div class="service-item">
        <h2>Database Creation</h2>
        <el-checkbox checked disabled>Required</el-checkbox>
      </div>
      <hr/>
    </el-col>
    <el-row>
      <el-col>
        <div class="input-item">
          <el-col :span="5">Project Name：</el-col>
          <el-col :span="6">
            <el-input
              placeholder="Please input the project name"
              v-model="mysqlInfo.projectName">
            </el-input>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="input-item">
          <el-col :span="10">Database Name：</el-col>
          <el-col :span="12">
            <el-input
              placeholder="Please input the database name"
              v-model="mysqlInfo.database">
            </el-input>
          </el-col>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="input-item">
          <el-col :span="7" :offset="3">Basedir：</el-col>
          <el-col :span="12">
            <el-input
              placeholder="Please input the basedir"
              v-model="mysqlInfo.baseDir">
            </el-input>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="input-item">
          <el-col :span="10">Username：</el-col>
          <el-col :span="12">
            <el-input
              placeholder="Please input the username"
              v-model="mysqlInfo.user">
            </el-input>
          </el-col>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="input-item">
          <el-col :span="7" :offset="3">Password：</el-col>
          <el-col :span="12">
            <el-input
              type="password"
              placeholder="Please input the password"
              v-model="mysqlInfo.password">
            </el-input>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 2%">
      <el-row v-if="isAddTable">
        <el-col :span="7" :offset="10">
          <el-input v-model="tableName" placeholder="Please input a table name" clearable></el-input>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-button
            size="mini"
            @click="addTable">Confirm
          </el-button>
          <el-button
            size="mini"
            @click="clearTableInput">Cancel
          </el-button>
        </el-col>
      </el-row>
      <el-row v-if="!isAddTable">
        <el-col :span="4" :offset="20">
          <el-button size="small" @click="isAddTable = true">Add Table</el-button>
        </el-col>
      </el-row>
    </div>
    <el-collapse v-model="activeNames" v-if="mysqlInfo.tables.length !== 0" style="margin-top: 4%">
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
