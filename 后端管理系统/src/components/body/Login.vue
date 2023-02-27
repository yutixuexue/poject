<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login_title">系统登录</h3>

    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>

    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
        class="login_submit"
      ></el-input>
    </el-form-item>

    <el-form-item
      ><el-button type="primary" @click="login" class="login_submit"
        >登录</el-button
      ></el-form-item
    >
  </el-form>
</template>

<script>
import { Login } from "@/../api/data";

export default {
  name: "login",
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名" },
          { min: 2, message: "用户名长度不能小于2位" },
        ],
        password: [
          { required: true, message: "请输入用户名" },
          { min: 6, message: "密码长度不能小于6位" },
        ],
      },
    };
  },

  methods: {
    login() {
      Login({
            username: this.form.username,
            password: this.form.password
          }).then(res => {
            if(res.status >= 200 && res.status < 300) {
              if(res.status == 200) {
                this.$store.commit("setToken", res.data.token);
                // console.log(res.data);
                this.$store.commit(
                  "addMenu",
                  res.data.menu
                );
                this.$router.push({ name: "home" });
              }
              else console.log(res);
            }
          })
    },
  },

  
};
</script>

<style>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_submit {
  margin: 10px auto 0 auto;
}
</style>