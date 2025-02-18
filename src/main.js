import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 引入Indicator 显示加载图标
import { Indicator } from 'mint-ui';
Vue.use(MintUI)


Vue.prototype.$axios = axios;

Vue.config.productionTip = false

//请求拦截
axios.interceptors.request.use(config=>{
    //加载动画
    Indicator.open();
    return config;
},error=>{
    return Promise.reject(error);
})
//响应拦截
axios.interceptors.response.use(response=>{
    Indicator.close();
    return response;
},error=>{
    Indicator.close();
    return Promise.reject(error);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
