import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'index',
    component: index,
    children:[
      {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        name:'home',
        component:()=>import('@/views/Home.vue')
      },
      {
        path:'/me',
        name:'me',
        component:()=>import('@/views/Me.vue')
      },
      {
        path:'/order',
        name:'order',
        component:()=>import('@/views/Order.vue')
      },
      {
        path:'/address',
        name:'address',
        component:()=>import('@/views/Address.vue')
      },
      {
        path:'/city',
        name:'city',
        component:()=>import('@/views/City.vue')
      }
    ] 

  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next) =>{
  const isLogin = localStorage.getItem('ele_login') ? true :false
  if(to.path == '/login'){
    next();
  }else{
    //判断是否在登陆状态下
    isLogin ? next() : next('/login')
  }
})



export default router
