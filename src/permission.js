//实现路由拦截，保证进来时必须要先登录
import router from './router'
import store from './store'

//路由拦截，在跳转时执行
//beforeEach 三个参数
//to 即将进入的路由
//from 离开的路由
//next 下一个，管道钩子


//判断是否为登录页
router.beforeEach(async (to, from, next) => {
    if (to.path == '/login') {
        next();
    } else {
        //登录用户信息（不同用户）
        //正常跳转，在vuex中获取角色信息
        var hasRoles = store && store.getters.roles && store.getters.roles.length > 0;
        if (hasRoles) {
            next()//有角色，跳出拦截
        } else {
            let { roles } = await store.dispatch('USERINFO')
            if (roles) {
                next({ ...to })
            } else {
                next({ path: '/login' })
            }
        }
    }
})