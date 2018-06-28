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
        :data="services"
        style="margin-bottom: 5%"
        v-show="!pulledOrUploaded"
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
      <el-table
        :data="fixedServices"
        style="margin-bottom: 5%"
        v-show="pulledOrUploaded"
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
            <el-col :span="1" :offset="20">
              <el-button size="small" @click="isAddService = true">Add</el-button>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button size="small" @click="upload">Upload</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>

  import {mapState, mapMutations} from 'vuex'

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
        folderName: '',
        services: [],
        pulledOrUploaded: false
      }
    },
    computed: {
      ...mapState({
        'fixedServices': 'services'
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
        let _this = this;
        console.log(this.$qs.stringify({"gitPath": this.gitPath}));
        this.$axios({
          url: '/git/clone',
          method: 'post',
          data: this.$qs.stringify({"gitPath": this.gitPath}),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(function (response) {
            console.log(response.data);
            response.data.forEach(function (service) {
              _this.$store.commit("addService", {
                serviceName: service.serviceName,
                folderName: service.folderName
              })
            });
            console.log(_this.fixedServices);
            _this.pulledOrUploaded = true;
          })
          .catch(function (error) {
            console.log(error)
          });
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
        this.services.push(newService);

        this.clearInput();
      },
      deleteService(row, index) {
        this.services.splice(index, 1);
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
      },

      // 手动上传文件
      upload() {
        let _this = this;
        // 上传文件
        let uploadPromises = this.services.map(function (service) {

          // 创建formData对象
          let formData = new FormData();
          console.log(service.folder);

          let fileNum = service.folder.length;
          for (let i = 0; i < fileNum; i++) {
            let str = i.toString();
            let file = service.folder[str];
            formData.append("folder", file);
          }

          _this.$store.commit("addService", {
            serviceName: service.serviceName,
            folderName: service.folderName
          });

          return _this.$axios.post('/general/uploadFolder', formData);
        });

        // upload
        this.$axios.all(uploadPromises)
          .then(function (response) {
            alert("Upload Success");
            console.log(_this.$store.state.services);
            _this.pulledOrUploaded = true;
          });
      }
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>
