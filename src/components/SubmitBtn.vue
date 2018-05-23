<template>
  <el-button @click="submit">完成</el-button>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "SubmitBtn",
    computed: {
      ...mapState([
        'services',
        'componentCheck',
        'eurekaServerInfo',
        'rabbitmq',
        'zuul'
      ])
    },
    methods: {
      submit() {
        // 服务名称地址
        let services = {};

        // 服务名称，配置map
        let configs = {};

        this.services.forEach(function (service) {
          // 装载services
          services[service.name] = service.address;

          // 装载configs
          configs[service.name] = service.config;

          // 手工添加的配置装上去
          service.addedConfigs.forEach(function (addedConfig) {
            configs[service.name][addedConfig.key] = addedConfig.value;
          });
        });

        let general = {
          // 服务名称，地址
          "services": services,

          // 服务名称，配置
          "configs": configs,

          // eureka server
          "isEurekaServer": this.componentCheck.checkedEurekaServer,
          "eurekaServerInfo": this.eurekaServerInfo,

          // ribbon
          "isRibbon": this.componentCheck.checkedRibbon,

          // hystrix
          "isHystrix": this.componentCheck.checkedHystrix,

          // rabbitmq
          "isRabbitMQ": this.componentCheck.checkedRabbitMQ,
          // mq的具体配置
          "mqServiceName": this.rabbitmq.serviceName,
          "mqSrc": this.rabbitmq.src,
          "mqDest": this.rabbitmq.dest,

          // zuul
          "isZuul": this.componentCheck.checkedZuul,

          "zuulComsumer": this.zuul.zuulConsumer,
          "zuulProviders": this.zuul.zuulProviders
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
