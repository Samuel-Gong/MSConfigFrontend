<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="10">
          <div>
            <h2>Add Service</h2>
          </div>
        </el-col>
        <el-col :span="3">
          <el-switch
            v-model="fromGit"
            active-text="Git"
            inactive-text="Manually"
          >
          </el-switch>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
    <el-main class="component-main">
      <el-table
        :data="services" style="margin-bottom: 5%"
      >
        <el-table-column
          label="Service Name"
          width="450">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Folder Name"
          width="450">
          <template slot-scope="scope">
            <span>{{ scope.row.folderName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteService(scope.row, scope.$index)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form v-if="this.fromGit" ref="start" label-width="80px" style="width: 100%">
        <el-row type="flex" justify="space-between" align="top">
          <el-col :span="18">
            <el-form-item label="Git Path">
              <el-input v-model="gitPath"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="2">
            <el-button @click="pullService">Pull</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="!this.fromGit">
        <div style="margin-top: 2%">
          <el-row v-if="isAddService">
            <el-col :span="8">
              <el-input v-model="serviceName" placeholder="Please input the service name" clearable></el-input>
            </el-col>
            <el-col :span="8" :offset="1">
              <form>
                <!-- html5支持选择文件夹上传 -->
                <input id="folderSelect" type="file" @change="handleFilesChange" multiple webkitdirectory>
              </form>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button
                size="mini"
                @click="addService">Submit
              </el-button>
              <el-button
                size="mini"
                @click="clearInput">Cancel
              </el-button>
            </el-col>
          </el-row>
          <el-row v-if="!isAddService">
            <el-col :span="1" :offset="23">
              <el-button size="small" @click="isAddService = true">Add</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>

  import {mapState, mapMutations} from 'vuex'
  import {SERVICE_ADD, SERVICE_DELETE} from "../../../store/mutations";

  export default {
    name: "index",
    data() {
      return {
        gitPath: "",

        // 表示当前是否正在增加服务
        isAddService: false,
        serviceName: "",
        serviceAddress: "",

        // 保存每次选择的文件夹的内容
        folder: [],
        // 保存每次选择的文件夹的名称
        folderName: ''
      }
    },
    computed: {
      ...mapState({
        services: 'services'
      }),
      fromGit: {
        get() {
          return this.$store.state.fromGit
        },
        set(value) {
          this.$store.commit('switchFromGit', value)
        }
      }
    },
    methods: {
      pullService() {
        console.log(this.$qs.stringify({"gitPath": this.gitPath}));
        this.$store.dispatch('pullFromGit', this.gitPath);
      },
      // 确认提交
      addService() {
        let newService =
          {
            serviceName: this.serviceName,

            // folder
            folderName: this.folderName,
            folder: this.folder
          };
        this.$store.commit(SERVICE_ADD, newService);
        this.clearInput();
      },
      deleteService(row, index) {
        this.$store.commit(SERVICE_DELETE, index);
      },
      clearInput() {
        this.serviceName = "";
        this.serviceAddress = "";
        this.isAddService = false;
      },

      // 文件夹选择框值改变
      handleFilesChange(event) {
        this.folder = event.currentTarget.files;
        console.log(this.folder);
        let folderName = this.folder[0].webkitRelativePath;
        console.log(folderName.substring(0, folderName.indexOf('/')));
        this.folderName = folderName.substring(0, folderName.indexOf('/'));
      }
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>
