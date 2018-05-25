<template>
  <el-row class="component-wrapper">
    <el-col>
      <div class="service-item">
        <h2>5. RabbitMQ</h2>
        <el-checkbox
          v-model="componentCheck.checkedRabbitMQ"
        >
          选择
        </el-checkbox>
      </div>
      <hr/>
    </el-col>
    <el-row>
      <el-col>
        <div class="input-item">
          <el-col :span="3">服务名称：</el-col>
          <el-col :span="6">
            <el-input
              placeholder="请输入服务名称"
              :disabled=!componentCheck.checkedRabbitMQ
              v-model="rabbitmq.serviceName">
            </el-input>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div style="margin-top: 2%">
          发送服务：
          <el-select
            :disabled=!componentCheck.checkedRabbitMQ
            v-model="rabbitmq.src"
            placeholder="消息队列发送服务">
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
      <el-col :span="12">
        <div style="margin-top: 2%">
          接收服务：
          <el-select
            :disabled=!componentCheck.checkedRabbitMQ
            v-model="rabbitmq.dest"
            placeholder="消息队列接收服务"
          >
            <el-option
              v-for="item in services"
              :key="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "RabbitMQComponent",
    computed: {
      ...mapState([
        'componentCheck',
        'services',
        'rabbitmq'
      ])
    }
  }
</script>

<style scoped>

</style>
