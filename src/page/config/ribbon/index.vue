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
      <h4>Ribbon Consumers</h4>
      <!-- Ribbon Providers表格 -->
      <el-table
        :data="ribbon.consumers"
      >
        <el-table-column
          label="Consumer"
          width="800"
        >
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Operation"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteRibbonConsumer(scope.$index)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 2%">
        <el-row v-if="isAddRibbonConsumer">
          <el-col :span="12">
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
          <el-col :span="6" :offset="1">
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
          <el-col :push="22" :span="1">
            <el-button size="small" @click="isAddRibbonConsumer = true" :disabled="!componentCheck.checkedRibbon">Add
            </el-button>
          </el-col>
        </el-row>
      </div>

      <h4>Ribbon Providers</h4>
      <!-- Ribbon Providers表格 -->
      <el-table
        :data="ribbon.providers"
      >
        <el-table-column
          label="Provider"
          width="800"
        >
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Operation"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteRibbonProvider(scope.$index)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 2%">
        <el-row v-if="isAddRibbonProvider">
          <el-col :span="12">
            <div>
              Provider：
              <el-select
                v-model="ribbonProviderName"
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
          <el-col :span="6" :offset="1">
            <el-button
              size="mini"
              @click="addRibbonProvider">Confirm
            </el-button>
            <el-button
              size="mini"
              @click="clearRibbonProviderInput">Cancel
            </el-button>
          </el-col>
        </el-row>
        <el-row v-if="!isAddRibbonProvider">
          <el-col :push="22" :span="1">
            <el-button size="small" @click="isAddRibbonProvider = true" :disabled="!componentCheck.checkedRibbon">Add
            </el-button>
          </el-col>
        </el-row>
      </div>
      <preview-panel></preview-panel>
    </el-main>
  </el-container>
</template>

<script>
  import {mapState} from 'vuex'
  import PreviewPanel from '../../../components/preview/PreviewPanel'


  export default {
    name: "RibbonComponent",
    components: {
      'preview-panel': PreviewPanel
    },
    data() {
      return {
        isAddRibbonConsumer: false,
        ribbonConsumerName: "",

        isAddRibbonProvider: false,
        ribbonProviderName: ""
      }
    },
    computed: {
      ...mapState([
        'componentCheck',
        'services',
        'ribbon'
      ])
    },
    methods: {
      // 提交consumer
      addRibbonConsumer() {
        this.$store.commit("addRibbonConsumer", this.ribbonConsumerName);
        this.clearRibbonConsumerInput();
      },
      deleteRibbonConsumer(index) {
        this.$store.commit("deleteRibbonConsumer", index);
      },
      // 取消提交
      clearRibbonConsumerInput() {
        this.ribbonConsumerName = "";
        this.isAddRibbonConsumer = false;
      },

      // 提交provider
      addRibbonProvider() {
        this.$store.commit("addRibbonProvider", this.ribbonProviderName);
        this.clearRibbonProviderInput();
      },
      deleteRibbonProvider(index) {
        this.$store.commit("deleteRibbonProvider", index);
      },
      // 取消提交
      clearRibbonProviderInput() {
        this.ribbonProviderName = "";
        this.isAddRibbonProvider = false;
      }
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>
