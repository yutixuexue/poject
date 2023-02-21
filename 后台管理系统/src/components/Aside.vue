<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#5c5464"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <h3 class="all-title">{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>

    <el-menu-item
      v-for="item in noChildren"
      :index="item.path+''"
      :key="item.path"
      @click="clickMenu(item.path, item.label)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      v-for="item in hasChildren"
      :key="item.lable"
      :index="item.name+''"
    >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">{{ item.label }}</span>
      </template>

      <el-menu-item-group
        v-for="childItem in item.children"
        :key="childItem.path"
        
      >
        <el-menu-item :index="childItem.path" @click="clickMenu(childItem.path, childItem.label)">{{
          childItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "Aside",

  data() {
    return {
      menu:[]
    };
  },

  mounted() {
    this.$store.commit("getMenu");
    this.menu = this.$store.state.asideMenu.menu;
    // console.log(this.$store.state.asideMenu.menu);
  },

  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    clickMenu(path, label) {
      // console.log(path, label);
      this.$store.commit("addBreadcrumb", {
        path,
        label,
      });
    },
  },

  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    ...mapState({
      isCollapse: (state) => state.tab.isCollapse,
    }),
  },
};
</script>


<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;
}

.all-title {
  color: #fff;
  text-align: center;
  line-height: 48px;
}
</style>