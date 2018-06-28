<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="10">
          <div>
            <h2>Ribbon</h2>
          </div>
        </el-col>
        <el-col :span="1" :offset="9">
          <el-checkbox v-model="componentCheck.checkedRibbon">Select</el-checkbox>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button :disabled="!componentCheck.checkedRibbon" @click="overview">Overview</el-button>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
    <el-main class="component-main">
      <el-collapse v-model="activeNames" v-show="ribbonGroup.length > 0">
        <ribbon-item
          v-for="(ribbonItem, index) in ribbonGroup"
          :ribbonItem="ribbonItem"
          :key="index"
          @deleteConsumer="deleteRibbonConsumer"
        >
        </ribbon-item>
      </el-collapse>
      <div style="margin-top: 2%">
        <el-row v-if="isAddRibbonConsumer">
          <el-col :span="6" :offset="13">
            <div>
              Provider：
              <el-select
                v-model="ribbonConsumerName"
                placeholder="Provider">
                <el-option
                  v-for="(item, index) in services"
                  :key="index"
                  :label="item.serviceName"
                  :value="item.serviceName"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-button
              size="mini"
              @click="addRibbonConsumer">Confirm
            </el-button>
            <el-button
              size="mini"
              @click="clearRibbonConsumerInput">Cancel
            </el-button>
          </el-col>
        </el-row>
        <el-row v-if="!isAddRibbonConsumer">
          <el-col :offset="21" :span="2">
            <el-button size="small" @click="isAddRibbonConsumer = true" :disabled="!componentCheck.checkedRibbon">Add
              Consumer
            </el-button>
          </el-col>
        </el-row>
      </div>

      <preview-panel
        :services='modifiedServices'
        :components='modifiedComponents'
        v-if="isOverview"
      >
      </preview-panel>
    </el-main>
  </el-container>
</template>

<script>
  import {mapState} from 'vuex'
  import PreviewPanel from '../../../components/preview/PreviewPanel'
  import RibbonItem from '../../../components/ribbon/RibbonItem'


  export default {
    name: "RibbonComponent",
    components: {
      'preview-panel': PreviewPanel,
      'ribbon-item': RibbonItem
    },
    data() {
      return {
        activeNames: ['1'],

        isAddRibbonConsumer: false,
        ribbonConsumerName: "",

        modifiedServices: [],
        modifiedComponents: [],
        isOverview: false
      }
    },
    computed: {
      ...mapState([
        'componentCheck',
        'services',
        'ribbonGroup'
      ])
    },
    methods: {
      // 提交consumer
      addRibbonConsumer() {
        this.$store.commit("addRibbonConsumer", this.ribbonConsumerName);
        this.clearRibbonConsumerInput();
      },
      deleteRibbonConsumer(consumerName) {
        this.$store.commit("deleteRibbonConsumer", consumerName);
      },
      // 取消提交
      clearRibbonConsumerInput() {
        this.ribbonConsumerName = "";
        this.isAddRibbonConsumer = false;
      },


      overview() {
        console.log("overview");

        let data = {
          ribbonDTOList: this.ribbonGroup,
          serviceInfoList: this.services
        };

        let _this = this;
        this.$axios({
          url: '/preview/ribbon',
          method: 'post',
          data: data,
        })
          .then(function (response) {
            console.log(response.data);
            response.data.forEach(function (service) {
              let files = [];
              service.fileInfoList.forEach(function (file) {
                files.push({
                  fileName: file.fileName,
                  content: file.fileContent,
                  linesList: file.linesList,
                  isShow: false
                });
              });
              _this.modifiedServices.push({
                serviceName: service.serviceName,
                files: files
              });
            });
            _this.isOverview = true;
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>
