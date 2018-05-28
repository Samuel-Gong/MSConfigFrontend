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
        'services',
        'componentCheck',
        'eurekaServerInfo',
        'ribbon',
        'zuulInfo',
        'composeInfo'
      ])
    },
    methods: {
      submit(event) {

        event.preventDefault();//取消默认行为

        // 上传文件
        // this.services.forEach(function (service) {
        //
        //   // 创建formData对象
        //   let formData = new FormData();
        //   console.log(service.folder);
        //
        //   let fileNum = service.folder.length;
        //   for (let i = 0; i < fileNum; i++) {
        //     let str = i.toString();
        //     let file = service.folder[str];
        //     formData.append("folder", file);
        //   }
        //
        //   // 上传文件
        //   axios.post('http://localhost:8000/test/uploadFolder', formData)
        //     .then(function (response) {
        //       alert(response.data);
        //     })
        //     .catch(function (error) {
        //       alert("上传失败");
        //       console.log(error);
        //     });
        // });


        // 服务名称，配置map
        let configurationList = [];

        this.services.forEach(function (service) {

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


        let services = [];

        this.services.forEach(function (service, index) {

          services.push({
            serviceName: service.serviceName,

            // folder
            folderName: service.folderName,

            // config
            config: configurationList[index],

            // mysql
            mysqlInfo: service.mysqlInfo
          });

        });

        let general = {
          // 所有微服务的信息
          "services": services,

          // eureka server
          "isEurekaServer": this.componentCheck.checkedEurekaServer,
          "eurekaServerInfo": this.eurekaServerInfo,

          // ribbon
          "isRibbon": this.componentCheck.checkedRibbon,
          "ribbon": this.ribbon,

          // hystrix
          "isHystrix": this.componentCheck.checkedHystrix,

          // zuul
          "isZuul": this.componentCheck.checkedZuul,
          "zuulInfo": this.zuulInfo,

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

        // 跳转到overview界面
        this.$router.push('/deploy');
      }
    }
  }
</script>

<style scoped>

</style>
