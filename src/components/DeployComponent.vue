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
              <el-row>
                <el-col>
                  <div class="service-item">
                    <el-col :span="10">
                      <h2>Deploy Overview</h2>
                    </el-col>
                    <el-col :span="4" :offset="16">
                      <el-button type="primary" size="medium" @click="deploy">
                        部署
                      </el-button>
                    </el-col>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <hr/>
              </el-row>
            </el-row>
            <el-row>
              <el-row>
                <el-col>
                  <h3>Deploy Server</h3>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="input-item">
                    <el-col :span="8">Username:</el-col>
                    <el-col :span="10">
                      <el-input
                        placeholder="username"
                        v-model="deployServerInfo.username"
                      >
                      </el-input>
                    </el-col>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="input-item">
                    <el-col :span="8">Password:</el-col>
                    <el-col :span="10">
                      <el-input
                        placeholder="password"
                        v-model="deployServerInfo.password"
                      >
                      </el-input>
                    </el-col>
                  </div>
                </el-col>
              </el-row>
            </el-row>
            <el-row>
              <el-col>
                <h3>Services</h3>
              </el-col>
            </el-row>
            <el-table
              :data="services"
            >
              <el-table-column
                label="Service Name"
                width="500">
                <template slot-scope="scope">
                  <span>{{ scope.row.serviceName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="Folder Name"
                width="500">
                <template slot-scope="scope">
                  <span>{{ scope.row.folderName }}</span>
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

  import {mapState, mapMutations} from 'vuex'

  import MyHeader from './MyHeader'

  export default {
    name: "DeployComponent",
    components: {
      'my-header': MyHeader
    },
    data() {
      return {
        services: [
          {
            serviceName: "service",
            folderName: "folder"
          }
        ]
      }
    },
    computed: {
      ...mapState({
        services: 'services',
        deployServerInfo: 'deployServerInfo'
      })
    },
    methods: {
      deploy() {
        // TODO 部署
        alert("部署成功");

        this.$router.push('/container');
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
