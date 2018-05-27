<template>
  <el-button @click="submit($event)">Finish</el-button>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "SubmitBtn",
    computed: {
      ...mapState([
        'files',
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

        // 创建formData对象
        let formData = new FormData();

        console.log(this.files);

        // upload config
        let config = {
          //基础url前缀
          baseURL: "http://localhost:8000",
          //请求头信息
          headers: {'Content-Type': "multipart/form-data"},
          // 返回数据类型，default
          responseType: 'json'
        };

        let file = this.files[0];
        console.log(file.file);
        formData.append(file.serviceName, file.file);

        // 上传文件
        this.$axios.post('/test/single', formData, config)
          .then(function (response) {
            alert(response.data);
            console.log(response);
          })
          .catch(function (error) {
            alert("上传失败");
            console.log(error);
          });

        // this.files.forEach(function (item) {
        //   console.log("enter");
        //   // 向 formData 对象中添加文件
        //   formData.append(item.serviceName, item.file);
        // });

        // 上传文件
        // this.$axios.post('/test/upload', formData, config)
        //   .then(function (response) {
        //     alert(response.data);
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     alert("上传失败");
        //     console.log(error);
        //   });

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
