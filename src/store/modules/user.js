import Vue from 'vue'
import Vuex from 'vuex'
import { getToken,removeToken } from '@/utils/token'
import { getInfo,logout } from '@/api/article'

Vue.use(Vuex)

const state = {
    token: getToken(),
    roles: [] //不同登录角色o
};
const getters = {
    token: state => state.token,
    roles: state => state.roles
};
const actions = {
    USERINFO({ commit, state }) {//获取用户详情
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response.data;
                commit('SET_ROLES', data.roles)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    LOGOUT({commit,state}){ //退出
        return new Promise((resolve,reject) =>{
            logout(state.token).then(response =>{
                commit('SET_ROLES',[]); //清空
                commit('SET_TOKEN','')
                removeToken(); //删除token
                resolve()
            }).catch(error =>{
                reject(error)
            })
        })
    }
};
const mutations = {
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_TOKEN:(state,token) =>{
        state.token = token
    }
};

//使用actions，mutations，注意加s 不要写成mutation这样
export default {
    state,
    getters,
    actions,
    mutations,
}
