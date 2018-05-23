<template>
  <div class="component-wrapper">
    <el-row>
      <el-col>
        <div class="service-item">
          <h2>6. Zuul</h2>
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="componentCheck.checkedZuul">选择</el-checkbox>
        </div>
        <hr/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div style="margin-top: 2%">
          Consumer：
          <el-select
            :disabled=!componentCheck.checkedZuul
            v-model="zuul.zuulConsumer"
            placeholder="网关消费服务">
            <el-option
              v-for="(item, index) in services"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <h4>Zuul Providers</h4>
    <!-- Zuul Providers表格 -->
    <el-table
      :data="zuul.zuulProviders"
    >
      <el-table-column
        label="Provider名称"
        width="350"
      >
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="400"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteZuulProvider(scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 2%">
      <el-row v-if="isAddZuulProvider">
        <el-col :span="12">
          <div>
            Provider：
            <el-select
              v-model="zuulProviderName"
              placeholder="网关提供服务">
              <el-option
                v-for="(item, index) in services"
                :key="index"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-button
            size="mini"
            @click="submitAdd">确认
          </el-button>
          <el-button
            size="mini"
            @click="clearZuulProviderInput">取消
          </el-button>
        </el-col>
      </el-row>
      <el-row v-if="!isAddZuulProvider">
        <el-button size="small" @click="isAddZuulProvider = true">添加Provider</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>

  import {mapState, mapMutations} from 'vuex'
  import {ZUUL_ADD, ZUUL_DELETE} from "@/store/mutations";

  export default {
    name: "ZuulComponent",
    data() {
      return {
        isAddZuulProvider: false,
        zuulProviderName: ""
      }
    },
    computed: {
      ...mapState([
        'componentCheck',
        'services',
        'zuul'
      ])
    },
    methods: {
      // 确认提交
      submitAdd() {
        this.$store.commit(ZUUL_ADD, this.zuulProviderName);
        this.clearZuulProviderInput();
      },
      deleteZuulProvider(index) {
        this.$store.commit(ZUUL_DELETE, index);
      },
      // 取消提交
      clearZuulProviderInput() {
        this.zuulProviderName = "";
        this.isAddZuulProvider = false;
      }
    }
  }
</script>

<style scoped>

</style>
