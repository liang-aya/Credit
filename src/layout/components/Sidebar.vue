<template>
  <!-- <el-container>：外层容器。当子元素中包含 <el-header> 或 <el-footer> 时，
    全部子元素会垂直上下排列，否则会水平左右排列。
<el-header>：顶栏容器。
<el-aside>：侧边栏容器。
<el-main>：主要区域容器。
  <el-footer>：底栏容器。-->

  <el-aside width="200px" class="aside">
    <!-- router	是否使用 vue-router 的模式，
    启用该模式会在激活导航时以 index 作为 path 进行路由跳转-->
    <el-menu router>
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/loan-input">
        <i class="el-icon-document"></i>
        <span slot="title">贷款申请</span>
      </el-menu-item>
      <el-menu-item index="/loan-manager">
        <i class="el-icon-menu"></i>
        <span slot="title">申请管理</span>
      </el-menu-item>
      <!-- 有子级 -->
      <el-submenu index="1-4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">贷款审批</span>
        </template>
        <el-menu-item index="/loan-approve/start">初审</el-menu-item>
        <el-menu-item index="/loan-approve/end">终审</el-menu-item>
      </el-submenu>
      <el-menu-item index="/contract">
        <i class="el-icon-menu"></i>
        <span slot="title">标的管理</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item index="/permission/create">创建管理员</el-menu-item>
        <el-menu-item index="/permission/list">列表展示</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: "Home"
};
</script>

<style lang="scss" scoped>
.aside{
  background: #304156;
  .el-menu{
    border-right: none;
    background-color: #304156;
    color: #fff
  }
}
</style>