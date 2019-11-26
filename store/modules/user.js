// 设置文件
import setting from '@/setting.js'

export default {
	namespaced: true,
	state: {
		// 用户信息
		info: setting.user.info
	},
	actions: {
		/**
		 * @description 设置用户数据
		 * @param {Object} state vuex state
		 * @param {*} info info
		 */
		set({
			state,
			dispatch
		}, info) {
			return new Promise(async resolve => {
				// store 赋值
				state.info = info
				// end
				resolve()
			})
		}
	}
}
