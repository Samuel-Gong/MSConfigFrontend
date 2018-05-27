<template>
  <el-button @click="submit($event)">Finish</el-button>
</template>

<script>

  import axios from 'axios'

  import {mapState} from 'vuex'

  export default {
    name: "SubmitBtn",
    computed: {
      ...mapState([
        'folders',
        'services',
        'componentCheck',
        'eurekaServerInfo',
        'ribbon',
        'mysqlInfo',
        'composeInfo'
      ])
    },
    methods: {
      submit(event) {

        event.preventDefault();//取消默认行为

        console.log(this.folders);

        // 上传文件
        this.folders.forEach(function (folderInfo) {

          // 创建formData对象
          let formData = new FormData();
          console.log(folderInfo.folder);

          let fileNum = folderInfo.folder.length;
          for (let i = 0; i < fileNum; i++) {
            let str = i.toString();
            let file = folderInfo.folder[str];
            formData.append("folder", file);
          }

          // 上传文件
          axios.post('http://localhost:8000/test/uploadFolder', formData)
            .then(function (response) {
              alert(response.data);
            })
            .catch(function (error) {
              alert("上传失败");
              console.log(error);
            });
        });

        // 服务名称地址
        let services = {};

        // 服务名称，配置map
        let configurationList = [];

        this.services.forEach(function (service) {
          // 装载services
          services[service.name] = service.address;

          let configurationItems = [];
          for (let key in service.config) {
            configurationItems.push({
              itemName: key,
              value: service.config[key]
            })
          }

          // 手工添加的配置装上去
          service.addedConfigs.forEach(function (addedConfig) {
            configurationItems.push({
              itemName: addedConfig.key,
              value: addedConfig.value
            });
          });

          // 装载configs
          configurationList.push({
            "projectPath": service.address,
            "list": configurationItems
          });

        });

        let general = {
          // 服务名称，地址
          "services": services,

          // 服务名称，配置
          "configurationList": configurationList,

          // eureka server
          "isEurekaServer": this.componentCheck.checkedEurekaServer,
          "eurekaServerInfo": this.eurekaServerInfo,

          // ribbon
          "isRibbon": this.componentCheck.checkedRibbon,
          "ribbon": this.ribbon,

          // hystrix
          "isHystrix": this.componentCheck.checkedHystrix,

          // rabbitmq
          "isRabbitMQ": this.componentCheck.checkedRabbitMQ,

          // zuul
          "isZuul": this.componentCheck.checkedZuul,

          // mysql
          "mysqlInfo": this.mysqlInfo,

          // docker compose
          "composeInfo": this.composeInfo

        };

        console.log(JSON.stringify(general));
        // this.$axios.post('http://localhost:8000/test/general', general)
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        //
        // alert("提交完成");
      }
    }
  }
</script>

<style scoped>

</style>
