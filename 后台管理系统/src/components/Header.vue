<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- <h1 style="color: #fff">首页</h1> -->
      <el-breadcrumb separator="/" style="color: #fff">
        <el-breadcrumb-item
          v-for="item in menu"
          @click="checkMenu(item.path,item.label)"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-col :span="12">
        <el-dropdown trigger="click" size="mini">
          <span class="el-dropdown-link">
            <img :src="userImg" class="userImg" alt="" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item
              ><span @click="logout" style="display: block"
                >退出</span
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      userImg: require("../../images/userImg.jpg"),
    };
  },

  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    checkMenu(path,label) {
      this.$store.commit("addBreadcrumb",{
        path,
        label,
      });
    },
    logout() {
      this.$store.commit("clearToken");
      this.$router.push({ name: "login" });
    },
  },

  computed: {
    menu() {
      return this.$store.state.tab.menu;
    },
  },
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

header {
  display: flex;
  justify-content: space-between;

  height: 100%;
  width: 100%;
  align-items: center;
}

.l-content {
  display: flex;
  align-items: center;
}
.l-content .el-button {
  margin-right: 20px;
}

.userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-breadcrumb__inner {
  color: rgba(24, 216, 107, 0.942) !important;
}
</style>