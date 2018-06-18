<template>
  <el-row>
    <el-row>
      <el-row>
        <el-col>
          <div class="service-item">
            <el-col :span="6">
              <h2>Config Results</h2>
            </el-col>
            <el-col :span="4">
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
  </el-row>
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
    computed: {},
    methods: {
      download() {

        this.$axios.get("http://localhost:8000/download")
          .then(() => {
            console.log("Download Success");
          });
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
