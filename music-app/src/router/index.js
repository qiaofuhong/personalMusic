import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//引入store中的js
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/ItemMusic.vue')
  },
  //路由跳转
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  //Login路由
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  //userInfo路由
  {
    path: '/userInfo',
    name: 'userInfo',
    //创建路由守卫 判断用户是否登录
    beforeEnter: (to, from, next) => {
       /* if(store.state.isLogin) {
        //登录则跳转到信息页面
        next()
      } else {
        //否则跳转到登录页面
        next('/Login')
      }  */
      next('/Login')
      
    },
    component: () => import('../views/userInfo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//全局路由守卫 判断是否显示底部播放器
router.beforeEach((to, from) => {
  if(to.path == '/Login') {
    //如果在登录页面则 不显示底部组件
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})

export default router
