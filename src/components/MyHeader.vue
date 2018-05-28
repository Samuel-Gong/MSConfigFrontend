<template>
  <el-row>
    <el-col :span="2" :offset="3">
      <span>Deck.io</span>
    </el-col>
    <el-col :span="9" :offset="1" v-if="isLogin">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item index="1" :route="processRoute">Create</el-menu-item>
        <el-menu-item index="2" :route="containRoute">Containers</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="5" :offset="4" v-if="isLogin">
      <span>{{ user.username }}, </span>
      <el-button type="text" size="large" style="color: #fff;" @click="logout">Logout</el-button>
    </el-col>
  </el-row>
</template>

<script>

  import {mapState} from 'vuex'
  import {LOGOUT} from "../store/mutations";

  export default {
    name: "MyHeader",
    data() {
      return {
        activeIndex: '1',
        processRoute: {
          path: '/process/1'
        },
        containRoute: {
          path: '/container'
        },

        username: {
          username: "admin"
        }
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
        this.$store.commit(LOGOUT);
        this.$router.push('/login');
      }
    },
    computed: {
      ...mapState([
        'isLogin'
      ])
    }
  }
</script>

<style scoped>
</style>
