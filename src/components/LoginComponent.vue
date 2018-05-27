<template>
  <el-container>
    <el-header class="header">
      <my-header/>
    </el-header>
    <el-main>
      <div id="login-panel">
        <el-row>
          <el-col :span="6" :offset="9">
            <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px">
              <h3 class="title">Login</h3>
              <el-form-item prop="username">
                <el-input type="text" v-model="account.username" auto-complete="off" placeholder="Username"></el-input>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="Password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width:100%;" @click="handleLogin">Login</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import MyHeader from './MyHeader'

  export default {
    name: 'LoginComponent',
    components: {
      'my-header': MyHeader
    },
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
    },
    methods: {
      handleLogin() {
        if (this.account.username === 'admin' && this.account.pwd === "admin") {
          alert("Login Success");
        }
        else {
          alert("Login Fail. Wrong username or password");
        }
      }
    }
  }
</script>

<style scoped>

  #login-panel {
    margin-top: 4%;
  }

  body {
    background: #DFE9FB;
  }

</style>
