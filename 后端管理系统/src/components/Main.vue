<template>
  <el-container style="height: 100%">
    <el-aside width="auto"><Aside /></el-aside>
    <el-container>
      <el-header><Header /></el-header>
      <el-main><slot></slot></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./Header";
import Aside from "./Aside.vue";

export default {
  name: "Main",
  components: {
    Header,
    Aside,
  },
};
</script>

<style>
.el-header {
  background-color: #333;
}

.el-container .el-main {
  padding: 0;
  background-color: #eee;
}
</style>
