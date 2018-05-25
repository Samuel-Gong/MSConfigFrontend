<template>
  <el-collapse v-model="activeNames">
    <config-item
      v-for="(service, index) in services"
      :service="service"
      :key="index"
    >
    </config-item>
  </el-collapse>
</template>

<script>

  import {mapState} from 'vuex'

  import ConfigItem from './ConfigItem'

  export default {
    name: "Config",
    components: {
      "config-item": ConfigItem
    },
    data() {
      return {
        activeNames: ['1']
      };
    },
    computed: {
      ...mapState([
        'services'
      ])
    }
  }
</script>

<style scoped>

</style>
