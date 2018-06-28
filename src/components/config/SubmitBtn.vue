<template>
  <el-button @click="submit($event)">Finish</el-button>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "SubmitBtn",
    computed: {
      ...mapState([
        'fromGit',
        'stepsActive',
        'services',
        'componentCheck',
        'eurekaServerInfo',
        'ribbonGroup',
        'hystrixMethods',
        'zuulInfo'
      ])
    },
    methods: {

      submit() {

        let methodsMap = {};
        this.hystrixMethods.forEach(function (hystrixMethod) {
          methodsMap[hystrixMethod.serviceName] = [];
        });
        this.hystrixMethods.forEach(function (hystrixMethod) {
          methodsMap[hystrixMethod.serviceName].push(hystrixMethod.methodName);
        });
        console.log(methodsMap);

        let general = {
          // 所有微服务的信息
          "services": this.services,

          // eureka server
          "isEurekaServer": this.componentCheck.checkedEurekaServer,
          "eurekaServerInfo": this.eurekaServerInfo,

          // ribbon
          "isRibbon": this.componentCheck.checkedRibbon,
          "ribbon": this.ribbonGroup,

          // hystrix
          "isHystrix": this.componentCheck.checkedHystrix,
          "methods": methodsMap,

          // zuul
          "isZuul": this.componentCheck.checkedZuul,
          "zuulInfo": this.zuulInfo

        };

        console.log(JSON.stringify(general));

        // add
        this.$axios.post('/general/add', general)
          .then(() => {
            alert("Submit Success");
            // 跳转第9步
            this.$store.commit("increStep");
            this.$router.push(
              {path: `/config/${this.stepsActive + 1}`}
            )
          });
      }
    }
  }
</script>

<style scoped>

</style>
