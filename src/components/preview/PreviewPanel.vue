<template>
  <el-row style="margin-top: 3%">
    <el-col :span="6">
      <preview-tree
        :services="services"
        :components="components"
        @select="handleSelect"
      >
      </preview-tree>
    </el-col>
    <el-col :span="17" :offset="1">
      <div v-for="service in services" :key="service.serviceName">
        <preview-show
          v-for="file in service.files"
          v-show="file.isShow"
          :key="file.fileName"
          :file="file"
        ></preview-show>
      </div>
      <div v-for="component in components" :key="component.serviceName">
        <preview-show
          v-for="file in component.files"
          v-show="file.isShow"
          :key="file.fileName"
          :file="file"
        ></preview-show>
      </div>
    </el-col>
  </el-row>
</template>

<script>

  import PreviewTree from './PreviewTree'
  import PreviewShow from './PreviewShow'

  import Prism from 'prismjs/prism'

  export default {
    name: "PreviewPanel",
    props: ['services', 'components'],
    components: {
      'preview-tree': PreviewTree,
      'preview-show': PreviewShow
    },
    methods: {
      handleSelect(key) {
        let path = (key + '').split('-');
        console.log(path);
        this.services.forEach(function (service) {
          service.files.forEach(function (file) {
            file.isShow = false;
          })
        });
        this.components.forEach(function (component) {
          component.files.forEach(function (file) {
            file.isShow = false;
          })
        });

        if (path[0] === 'services') {
          this.services.some(function (service) {
            if (service.serviceName === path[1]) {
              service.files.some(function (file) {
                if (file.fileName === path[2]) {
                  file.isShow = true;
                  return true;
                }
              });
              return true;
            }
          });
        } else {
          this.components.forEach(function (component) {
            if (component.serviceName === path[1]) {
              // console.log(component.serviceName)
              component.files.forEach(function (file) {
                if (file.fileName === path[2]) {
                  file.isShow = true;
                  return true;
                }
              });
              return true;
            }
          });
        }

        console.log(this.services);
        console.log(this.components);
      }
    }
  }
</script>

<style scoped>

</style>
