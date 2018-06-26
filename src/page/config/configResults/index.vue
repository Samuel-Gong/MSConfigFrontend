<template>
  <el-container>
    <el-header class="component-header">
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
      <el-row type="flex" justify="space-between" align="middle">
        <el-form v-if="this.toGit" ref="form" :model="form" label-width="90px" style="width: 100%">
          <el-col :span="10">
            <el-form-item label="User Name">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="primary" size="medium" @click="push" class="btn">Push</el-button>
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
        form: {
          username: "",
          password: ""
        }
      }
    },
    computed: {
      toGit: {
        get() {
          return this.$store.state.toGit
        },
        set(value) {
          this.$store.commit('switchToGit', value)
        }
      }
    },
    methods: {
      download() {
        this.$axios.get("/download")
          .then(() => {
            console.log("Download Success");
          });
      },
      push() {
        console.log(this.$qs.stringify(this.form));
        this.$axios({
          url: '/git/push',
          method: 'post',
          data: this.$qs.stringify(this.form),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(function (response) {
            console.log(response);
            alert("Push Success");
          })
          .catch(function (error) {
            console.log(error);
          })
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

<style scoped>
  @import "../common.css";
</style>
