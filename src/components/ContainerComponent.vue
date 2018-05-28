<template>
  <el-container>
    <el-header class="header">
      <my-header/>
    </el-header>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="17" :offset="4">
            <el-row>
              <el-col>
                <h2>Containers</h2>
                <hr/>
              </el-col>
            </el-row>
            <el-table
              :data="containers"
            >
              <el-table-column
                label="Name"
                width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="Image"
                width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.image }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="Create Time"
                width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="Status"
                width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.status }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="Port"
                width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.port }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  import MyHeader from './MyHeader'

  export default {
    name: "ContainerComponent",
    components: {
      'my-header': MyHeader
    },
    data() {
      return {
        containers: [
          {
            name: "container",
            image: "image",
            createTime: "createTime",
            status: "Running",
            port: 8888
          }
        ]
      }
    }
  }
</script>

<style>
  .header {
    background-color: #409EFF;
    color: #fff;
    line-height: 60px;
  }

  .service-item {
    display: -webkit-flex; /* Safari */
    display: flex;
    /*主轴对齐方式*/
    justify-content: space-between;
    /*纵轴对齐方式*/
    align-items: center
  }

  .input-item {
    margin-top: 2%;

    display: -webkit-flex; /* Safari */
    display: flex;
    /*主轴对齐方式*/
    justify-content: flex-start;
    /*纵轴对齐方式*/
    align-items: center
  }
</style>

