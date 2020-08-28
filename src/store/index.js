import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from './modules/user'
import permission from './modules/permission'

const store =new Vuex.Store({  //Store导出注意大写，不然会报错
  modules:{  //引入多个模块
    user,
    permission
  }
})

export default store