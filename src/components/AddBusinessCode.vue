<template>
  <div>

    <div class="hello">
      <h1>{{ msg }}</h1>
      <form>
        <input type="file" @change="getFile($event)">
        <button class="button button-primary button-pill button-small" @click="submit($event)">提交</button>
      </form>
    </div>

    <el-table
      :data="services"
    >
      <el-table-column
        label="Service Name"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.serviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="File Name"
        width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.fileName }}</span>
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
    <div style="margin-top: 2%">
      <el-row v-if="isAddService">
        <el-col :span="8">
          <el-input v-model="serviceName" placeholder="Please input the service name" clearable></el-input>
        </el-col>
        <!-- 上传
      只接受zip压缩包
     -->
        <el-col :span="8" :offset="1">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://localhost:8000/test/upload/"
            list-type="text"
            :on-change="handleChange"
            accept=".zip"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <el-button slot="trigger" size="small" type="primary">Select File</el-button>
            <div slot="tip" class="el-upload__tip">.zip Only</div>
          </el-upload>
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
        <el-col :span="4" :offset="20">
          <el-button size="small" @click="isAddService = true">Add</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

  import {mapState, mapMutations} from 'vuex'
  import {SERVICE_ADD, SERVICE_DELETE} from "../store/mutations";
  import {FILE_ADD, FILE_DELETE} from "../store/mutations";

  export default {
    data() {
      return {
        // 表示当前是否正在增加服务
        isAddService: false,
        serviceName: "",
        serviceAddress: "",


        msg: 'Welcome to Your Vue.js App',
        file: ''
      }
    },
    computed: {
      ...mapState({
        services: 'services'
      })
    },
    methods: {
      // 确认提交
      addService() {
        let newService =
          {
            serviceName: this.serviceName,
            fileName: this.file.name,
            config: {
              "spring.application.name": "",
              "server.port": "",
              "eureka.client.serviceUrl.defaultZone": "",
              "eureka.instance.prefer-ip-address": "",
            },
            addedConfigs: []
          };

        let newFile = {
          serviceName: this.serviceName,
          file: this.file
        };
        this.$store.commit(FILE_ADD, newFile);
        this.$store.commit(SERVICE_ADD, newService);
        this.clearInput();
      },
      deleteService(row, index) {
        this.$store.commit(FILE_DELETE, row.serviceName);
        this.$store.commit(SERVICE_DELETE, index);
      },
      clearInput() {
        this.serviceName = "";
        this.serviceAddress = "";
        this.isAddService = false;
      },

      // 选择文件夹时，将文件
      handleChange(file) {
        this.file = file.raw;
        console.log(file.raw);
        console.log(this.file);
      },
      handleExceed() {
        alert("一次只能选择一个压缩包");
      },


      getFile: function (event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      submit: function (event) {
        //阻止元素发生默认的行为
        event.preventDefault();
        let formData = new FormData();
        formData.append("file", this.file);
        this.$axios.post('http://localhost:8000/test/single', formData)
          .then(function (response) {
            alert(response.data);
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            alert("上传失败");
            console.log(error);
            window.location.reload();
          });
      }
    }
  }
</script>
