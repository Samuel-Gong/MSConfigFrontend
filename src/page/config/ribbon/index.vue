<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="10">
          <div>
            <h2>Ribbon</h2>
          </div>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-model="componentCheck.checkedRibbon">Select</el-checkbox>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="12">
          <div style="margin-top: 2%">
            Consumer：
            <el-select
              :disabled=!componentCheck.checkedRibbon
              v-model="ribbon.consumer"
              placeholder="Consumer">
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
      </el-row>
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
              @click="submitAdd">Confirm
            </el-button>
            <el-button
              size="mini"
              @click="clearRibbonProviderInput">Cancel
            </el-button>
          </el-col>
        </el-row>
        <el-row v-if="!isAddRibbonProvider">
          <el-col :push="23" :span="1">
            <el-button size="small" @click="isAddRibbonProvider = true" :disabled="!componentCheck.checkedRibbon">Add
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {mapState} from 'vuex'
  import {RIBBON_ADD, RIBBON_DELETE} from "@/store/mutations";

  export default {
    name: "RibbonComponent",
    data() {
      return {
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
      // 确认提交
      submitAdd() {
        this.$store.commit(RIBBON_ADD, this.ribbonProviderName);
        this.clearRibbonProviderInput();
      },
      deleteRibbonProvider(index) {
        this.$store.commit(RIBBON_DELETE, index);
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
