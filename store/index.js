import Vue from 'vue'
import Vuex from 'vuex'

import app from "./modules/app";
import getters from "./getters";
Vue.use(Vuex)

//这里到处，注意循环引用
//store给new vue用
//gettters直接引用文件
const store = new Vuex.Store({
  modules: {
    app
  },
  getters
})

export default store
