<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="17" :offset="4">
          <el-row>
            <el-row>
              <el-col>
                <div class="service-item">
                  <el-col :span="10">
                    <h2>Overview</h2>
                  </el-col>
                  <el-col :span="4" :offset="16">
                    <el-button type="primary" size="medium" @click="download" class="download-btn">
                      Download Jar
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
            <el-col>
              <h3>Services</h3>
            </el-col>
          </el-row>
          <el-table
            :data="servicesInfo"
          >
            <el-table-column
              label="Service Name"
              width="500">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Port"
              width="500">
              <template slot-scope="scope">
                <span>{{ scope.row.port }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "DeployComponent",
    data() {
      return {
        servicesInfo: []
      }
    },
    computed: {
      ...mapState({
        deployServer: 'deployServer'
      })
    },
    methods: {
      download() {

        // todo
        // this.$axios
        //   .post("http://localhost:8000/deploy/deploy", this.deployServer);

        alert("Download Success");

        // this.$router.push('/container');
      }
    },
    mounted() {
      this.$axios
        .get("http://localhost:8000/general/showAllServiceInfo")
        .then(response => {
          console.log(response);
          this.servicesInfo = response.data;
        });
    }
  }
</script>

<style>

  .service-item {
    display: -webkit-flex; /* Safari */
    display: flex;
    /*主轴对齐方式*/
    justify-content: space-between;
    /*纵轴对齐方式*/
    align-items: center
  }

  .download-btn {
    background: #000;
    border-color: black;
  }
</style>
