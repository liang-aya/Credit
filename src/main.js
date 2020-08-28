import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/index.scss'

import './permission'  //路由拦截

Vue.use(ElementUI)
Vue.config.productionTip = false;

//全局过滤器

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
