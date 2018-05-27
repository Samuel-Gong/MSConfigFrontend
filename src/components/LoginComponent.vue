<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">Login</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="username"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="password"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'LoginComponent',
    data() {
      return {
        logining: false,
        account: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
            {required: true, message: 'username required', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: 'password required', trigger: 'blur'},
          ]
        },
        checked: true
      };
    }
  }
</script>

<style scoped>
  body {
    background: #DFE9FB;
  }

  .login-container {
    width: 350px;
    margin-left: 35%;
  }
</style>
