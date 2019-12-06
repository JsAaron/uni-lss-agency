import Vue from 'vue'
import Vuex from 'vuex'

import account from "./modules/account";
import user from "./modules/user";
import product from "./modules/product";

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		account,
		user,
		product
	}
})

export default store
