<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="8">
          <h2>Config Results</h2>
        </el-col>
        <el-col :span="8">
          <el-switch
            v-model="toGit"
            active-text="Push to Git"
            inactive-text="Download"
          >
          </el-switch>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
    <el-main>
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
    </el-main>
    <el-footer>
      <el-row>
        <el-form v-if="this.toGit" ref="form" :model="form" label-width="100px">
          <el-form-item label="User Name">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-col :push="21">
            <el-button type="primary" size="medium" @click="push" class="btn" >Push</el-button>
          </el-col>
        </el-form>
        <el-col v-if="!this.toGit" :push="20">
          <el-button type="primary" size="medium" @click="download" class="btn">
            Download
          </el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>

  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "DeployComponent",
    data() {
      return {
        servicesInfo: [],
        toGit: true,
        form: {
          username: "",
          password: ""
        }
      }
    },
    computed: {},
    methods: {
      download() {

        this.$axios.get("/download")
          .then(() => {
            console.log("Download Success");
          });
      },
      push () {
        // todo 上传到git
      }
    },
    mounted() {
      this.$axios
        .get("/general/showAllServiceInfo")
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

  .btn {
    background: #000;
    border-color: black;
  }
</style>
