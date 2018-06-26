<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    size="mini"
    @select="handleSelect"
  >
    <el-submenu index="services">
      <!-- 向具名插槽提供内容 -->
      <template slot="title">
        <!--<i class="el-icon-location"></i>-->
        <span>Services</span>
      </template>
      <el-submenu
        v-for="service in services"
        :key="service.serviceName"
        :index="'services-' + service.serviceName">
        <template slot="title">{{service.serviceName}}</template>
        <el-menu-item
          v-for="file in service.files"
          :key="file.fileName"
          :index="'services-' + service.serviceName + '-' + file.fileName"
        >
          {{file.fileName}}
        </el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="components">
      <template slot="title">
        <span>Components</span>
      </template>
      <el-submenu
        v-for="component in components"
        :key="component.serviceName"
        :index="'component-' + component.serviceName">
        <template slot="title">
          <i class="el-icon-circle-plus-outline"></i>
          <span>{{component.serviceName}}</span>
        </template>
        <el-menu-item
          v-for="file in component.files"
          :key="file.fileName"
          :index="'components-' + component.serviceName + '-' + file.fileName">
          {{file.fileName}}
        </el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "PreviewTree",
    props: ['services', 'components'],
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$emit('select', key);
      }
    }
  }
</script>

<style scoped>

</style>
