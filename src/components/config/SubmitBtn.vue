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
        'fromGit',
        'stepsActive',
        'services',
        'componentCheck',
        'eurekaServerInfo',
        'ribbon',
        'zuulInfo'
      ])
    },
    methods: {

      async submit(event) {

        event.preventDefault();//取消默认行为

        // 手动上传
        if(!this.fromGit) {
          // 上传文件
          let uploadPromises = this.services.map(async function (service) {

            // 创建formData对象
            let formData = new FormData();
            console.log(service.folder);

            let fileNum = service.folder.length;
            for (let i = 0; i < fileNum; i++) {
              let str = i.toString();
              let file = service.folder[str];
              formData.append("folder", file);
            }

            // 上传文件
            // api.upload(formData);
            return axios.post('/general/uploadFolder', formData);
          });

          // upload
          await this.$axios.all(uploadPromises)
            .then(() => alert("Upload Success"));
        }

        let services = [];

        this.services.forEach(function (service, index) {

          services.push({
            serviceName: service.serviceName,

            // folder
            folderName: service.folderName

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
          "zuulInfo": this.zuulInfo

        };

        console.log(JSON.stringify(general));

        // add
        await axios.post('/general/add', general)
          .then(() => {
            alert("Add Success");
          });

        alert("Submit Success");
        // 跳转第9步
        this.$store.commit("increStep");
        this.$router.push(
          {path: `/config/${this.stepsActive + 1}`}
        )
      }
    }
  }
</script>

<style scoped>

</style>
