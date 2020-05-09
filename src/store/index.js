import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


//types
const types = {
    SET_LOCATION:'SET_LOCATION',
    SET_ADDRESS:'SET_ADDRESS'

}

//声明变量
const state = {
    location:{},
    address:""
}

//get value
const getters = {
    location:state => state.location,
    address:state => state.address
}

// 定义actions里需要提交的方法
const mutations = {
    [types.SET_LOCATION](state,location){
        if(location){
          state.location = location
        }else{
          state.location = {}
        }
    },
    [types.SET_ADDRESS](state,address){
      if(address){
        state.address = address
      }else{
        state.address = ""
      }
  }
} 

//提交一个actions，在actions中提交mutation再去修改状态值
const actions = {
    setLocation:({commit},location)=>{
      commit(types.SET_LOCATION,location);
    },
    setAddress: ({ commit }, address) => {
      commit(types.SET_ADDRESS, address);
    }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
