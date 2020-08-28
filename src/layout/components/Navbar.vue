<template>
  <div class="app-breadcrumb">
    <!-- breadcrumb面包屑 -->
    <el-breadcrumb separator="/">
      <!--transition vue内置组件  -->
      <!-- name - string，用于自动生成 CSS 过渡类名 -->
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in lists" :key="item.path">
          <span v-if="index==lists.length-1" class="no-redirect">{{item.meta.title}}</span>
          <a v-else>{{item.meta.title}}</a>
        </el-breadcrumb-item>
      </transition-group>

      <!-- 右侧下拉框 -->
      <div class="right-menu">
        <el-dropdown>
          <span class="el-dropdown-link">
            退出
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span style="display:block" @click="goBack">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-breadcrumb>
  </div>
</template>
<script>
import { removeToken } from "@/utils/token";
import { logout } from "@/api/article";
export default {
  name: "Home",
  data() {
    return {
      lists: null
    };
  },
  created() {
    this.getBreadCrumb();
  },
  watch: {
    //路由监听
    $route(to, from) {
      this.getBreadCrumb();
    }
  },
  methods: {
    getBreadCrumb() {
      this.lists = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
    },
    goBack() {
      logout().then(() => {
        removeToken(); //删除token
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin: 20px 10px;
  & > .right-menu {
    float: right;
  }
}
</style>