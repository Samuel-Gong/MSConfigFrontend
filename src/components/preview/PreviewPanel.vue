<template>
  <el-row style="margin-top: 3%">
    <el-col :span="5">
      <preview-tree
        :services="services"
        :components="components"
        @select="handleSelect"
      ></preview-tree>
    </el-col>
    <el-col :span="18" :offset="1">
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

  export default {
    name: "PreviewPanel",
    components: {
      'preview-tree': PreviewTree,
      'preview-show': PreviewShow
    },
    data() {
      return {
        services: [
          {
            serviceName: 'account_service',
            files: [
              {
                fileName: 'pom.xml',
                isShow: false
              },
              {
                fileName: 'AccountApplication.java',
                isShow: false
              }
            ]
          },
          {
            serviceName: 'pet_service',
            files: [
              {
                fileName: 'pom.xml',
                isShow: false
              },
              {
                fileName: 'PetApplication.java',
                isShow: false
              }
            ]
          }
        ],
        components: [
          {
            serviceName: 'eureka_server',
            files: [
              {
                fileName: 'pom.xml',
                content: "pre.line-numbers {\n" +
                "\t        position: relative;\n" +
                "\t        padding-left: 3.8em;\n" +
                "\t        counter-reset: linenumber;\n" +
                "        }\n" +
                "        \n" +
                "        pre.line-numbers > code {\n" +
                "\t        position: relative;\n" +
                "        }",
                isShow: false
              },
              {
                fileName: 'AccountApplication.java',
                content: "pre.line-numbers {\n" +
                "\t        position: relative;\n" +
                "\t        padding-left: 3.8em;\n" +
                "\t        counter-reset: linenumber;\n" +
                "        }\n" +
                "        \n" +
                "        pre.line-numbers > code {\n" +
                "\t        position: relative;\n" +
                "        }" +
                "pre.line-numbers {\n" +
                "\t        position: relative;\n" +
                "\t        padding-left: 3.8em;\n" +
                "\t        counter-reset: linenumber;\n" +
                "        }\n" +
                "        \n" +
                "        pre.line-numbers > code {\n" +
                "\t        position: relative;\n" +
                "        }" +
                "pre.line-numbers {\n" +
                "\t        position: relative;\n" +
                "\t        padding-left: 3.8em;\n" +
                "\t        counter-reset: linenumber;\n" +
                "        }\n" +
                "        \n" +
                "        pre.line-numbers > code {\n" +
                "\t        position: relative;\n" +
                "        }" +
                "pre.line-numbers {\n" +
                "\t        position: relative;\n" +
                "\t        padding-left: 3.8em;\n" +
                "\t        counter-reset: linenumber;\n" +
                "        }\n" +
                "        \n" +
                "        pre.line-numbers > code {\n" +
                "\t        position: relative;\n" +
                "        }" +
                "pre.line-numbers {\n" +
                "\t        position: relative;\n" +
                "\t        padding-left: 3.8em;\n" +
                "\t        counter-reset: linenumber;\n" +
                "        }\n" +
                "        \n" +
                "        pre.line-numbers > code {\n" +
                "\t        position: relative;\n" +
                "        }" +
                "",
                isShow: false
              }
            ]
          }
        ]
      }
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
