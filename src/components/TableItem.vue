<template>
  <el-collapse-item
    :title="itemName"
    :name="table.tableName"
    :key="table.tableName"
  >
    <h4>Column</h4>
    <el-table
      :data="table.columnList"
    >
      <el-table-column
        label="列名"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
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
      <el-row v-if="isAddColumn">
        <el-col :span="4">
          <el-input v-model="columnName" placeholder="请输入列名" clearable></el-input>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-input v-model="columnType" placeholder="请输入列的类型" clearable></el-input>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-button
            size="mini"
            @click="addColumn">确认
          </el-button>
          <el-button
            size="mini"
            @click="clearColumnInput">取消
          </el-button>
        </el-col>
      </el-row>
      <el-row v-if="!isAddColumn">
        <el-col :span="3">
          <el-button @click="isAddColumn = true">添加列</el-button>
        </el-col>
        <el-col :span="3">
          <el-button @click="deleteTable">删除表</el-button>
        </el-col>
        <el-col :span="12" v-if="table.columnList.length > 0">
          主键：
          <el-select
            v-model="table.primary_key"
            placeholder="主键设置">
            <el-option
              v-for="(column, index) in table.columnList"
              :key="index"
              :label="column.name"
              :value="column.name"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </el-collapse-item>
</template>

<script>

  import {TABLE_DELETE} from "../store/mutations";

  export default {
    name: "TableItem",
    props: ["table"],
    data() {
      return {
        isAddColumn: false,
        columnName: "",
        columnType: ""
      }
    },
    methods: {
      handleDelete(index, row) {
        this.table.columnList.splice(index, 1);
        console.log(index, row);
      },
      deleteTable() {
        this.$store.commit(TABLE_DELETE, this.table.tableName);
      },
      // 提交添加的列
      addColumn() {
        this.table.columnList.push(
          {
            name: this.columnName,
            type: this.columnType
          }
        );
        this.clearColumnInput();
      },
      // 取消添加配置
      clearColumnInput() {
        this.columnName = "";
        this.columnType = "";
        this.isAddColumn = false;
      }
    },
    computed: {
      itemName() {
        return "表名:" + this.table.tableName
      }
    }
  }
</script>

<style scoped>
  .input-item {
    display: -webkit-flex; /* Safari */
    display: flex;
    /*主轴对齐方式*/
    justify-content: flex-start;
    /*纵轴对齐方式*/
    align-items: center
  }
</style>
