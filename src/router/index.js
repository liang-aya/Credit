import Vue from "vue";
import VueRouter from "vue-router";
import loanApprove from "./modules/loanApprove"
import permission from "./modules/permission"

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('../views/login/index')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/index',   //重定向
    meta: { title: '首页' },
    component: () => import('../layout/index'),
    children: [
      {
        path: '/index',  //首页
        name: 'index',
        component: () => import('../views/home/index')
      },
      {
        path: '/loan-input',  //贷款申请
        name: 'loan-input',
        meta: { title: '贷款申请' },
        component: () => import('../views/loan-input/index'),
      },
      {
        path: '/loan-manager', //申请管理
        name: 'loan-manager',
        meta: { title: '申请管理', roles: ['input'] },
        component: () => import('../views/loan-manager/index')
      },
      {
        path: '/loan-approve',  //贷款审批
        name: 'loan-approve',
        meta: { title: '贷款审批' },
        component: () => import('../views/loan-approve/index'),
        children: [
          {
            //path: '/loan-approve/first',  //初审
            path: 'start',
            name: 'start',
            meta: { title: '初审' },
            component: () => import('../views/loan-approve/start')
          },
          {
            //path: '/loan-approve/first',  //终审
            path: 'end',
            name: 'end',
            meta: { title: '终审' },
            component: () => import('../views/loan-approve/end')
          }]
      },
      {
        path: '/contract',
        name: 'contract',
        meta: { title: '标的管理' },
        component: () => import('../views/contract/index'),
      },
      {
        path: '/permission',
        name: 'permission',
        meta: { title: '权限管理' },
        component: () => import('../views/permission/index'),
        children: [
          {
            path: 'create',
            name: 'create',
            meta: { title: '创建管理员' },
            component: () => import('../views/permission/create'),
          },
          {
            path: 'list',
            name: 'list',
            meta: { title: '列表展示' },
            component: () => import('../views/permission/list'),
          }
        ]
      },
    ]
  }
]

//路由分为两个模块 1常规配置  2动态配置

//常规配置
// export const constantRoutes = [
//   {
//     path: '/',
//     redirect: '/home'
//   },
//   {
//     path: '/login',
//     name: 'login',
//     meta: { title: '登录' },
//     component: () => import('../views/login/index')
//   },
//   {
//     path: '/home',
//     name: 'home',
//     meta: { title: '首页', roles:['input','approve']},
//     redirect: '/index',//重定向
//     component: () => import('../layout/index'),
//     children: [
//       {
//         path: '/index',//首页
//         name: 'index',
//         meta: { title: '首页', roles:['input','approve']},
//         component: () => import('../views/home/index')
//       },
//     ]
//   }
// ]

// //动态配置
// export const asyncRoutes = [
//   {
//     path: '/index',//首页
//     name: 'index',
//     meta: { title: '首页', roles:['input','approve']},
//     component: () => import('../views/home/index')
//   },
//   {
//     path: '/loan-input', //贷款申请
//     name: 'loan-input',
//     meta: { title: '贷款申请',roles:['input'] },
//     component: () => import('../views/loan-input/index')
//   },
//   {
//     path: '/loan-manager', //申请管理
//     name: 'loan-manager',
//     meta: { title: '申请管理',roles:['input'] },
//     component: () => import('../views/loan-manager/index')
//   },
//   loanApprove,
//   {
//     path: '/contract', //标的管理
//     name: 'contract',
//     meta: { title: '标的管理',roles:['approve'] },
//     component: () => import('../views/contract/index')
//   },
//   permission
// ]



const router = new VueRouter({
  // routes:constantRoutes
  routes
});

export default router;
