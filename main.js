import Vue from 'vue'
import App from './App'
import store from './store'
import config from '@/common/config'
import lss from '@/plugin/lss'

Vue.prototype.$store = store;
App.mpType = 'app'

Vue.use(lss, {
	store
})
const app = new Vue({
	store,
	...App
})
app.$mount()
