<template>
  <el-aside width="200px" class="aside">
    <el-menu router :default-active="$route.path" exact>
      <SidebarItem
        v-for="route in get_routes[0].children"
        :key="route.path"
        :item="route"
        :basePath="route.path"
      ></SidebarItem>
    </el-menu>
  </el-aside>
</template>
<script>
import {mapGetters} from 'vuex'
import SidebarItem from "./SidebarItem";
export default {
    components:{
        SidebarItem
    },
    computed:{
      ...mapGetters(["get_routes"])
    }
};
</script>
<style lang="scss" scoped>
.aside {
  background:#304156;
  .el-menu {
    border-right: none;
    background-color: #304156;
    color:#fff;
  }
}
</style>