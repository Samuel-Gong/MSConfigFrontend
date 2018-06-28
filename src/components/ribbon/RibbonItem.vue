<template>
  <el-collapse-item
    :title="itemName"
    :name="ribbonItem.name"
    :key="ribbonItem.name"
  >
    <h4>Providers</h4>
    <!-- Ribbon Providers表格 -->
    <el-table
      :data="ribbonItem.providers"
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
        <el-col :span="6" :offset="13">
          <div>
            Provider：
            <el-select
              v-model="providerName"
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
            @click="addRibbonProvider">Confirm
          </el-button>
          <el-button
            size="mini"
            @click="clearRibbonProviderInput">Cancel
          </el-button>
        </el-col>
      </el-row>
      <el-row v-if="!isAddRibbonProvider">
        <el-col :offset="18" :span="2">
          <el-button size="small" @click="isAddRibbonProvider = true">Add Provider</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button size="small" @click="deleteConsumer">Delete Consumer</el-button>
        </el-col>
      </el-row>
    </div>
  </el-collapse-item>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "RibbonItem",
    props: ["ribbonItem"],
    data() {
      return {
        isAddRibbonProvider: false,
        providerName: "",
      }
    },
    methods: {
      // 提交provider
      addRibbonProvider() {
        this.ribbonItem.providers.push(this.providerName);
        this.clearRibbonProviderInput();
      },
      deleteRibbonProvider(index) {
        this.ribbonItem.providers.splice(index, 1);
      },
      // 取消提交
      clearRibbonProviderInput() {
        this.providerName = "";
        this.isAddRibbonProvider = false;
      },

      deleteConsumer() {
        console.log(this.ribbonItem.consumer);
        this.$emit("deleteConsumer", this.ribbonItem.consumer)
      }
    },
    computed: {
      ...mapState([
        'services'
      ]),
      itemName() {
        return "Consumer Service: " + this.ribbonItem.consumer
      }
    }
  }
</script>

<style scoped>

</style>
