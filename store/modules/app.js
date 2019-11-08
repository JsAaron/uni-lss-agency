import { APP_SAVELOGIN, APP_CHECKLOGIN, APP_LOGOUT } from './mutation-types'

const app = {
	state: {
		user: '',
		password: '',
		hasLogin: false
	},
	mutations: {
		[APP_SAVELOGIN](state, value) {
			state.user = value.user
			state.password = value.password
			state.hasLogin = true
		},
		[APP_LOGOUT](state) {
			state.user = ''
			state.password = ''
			state.hasLogin = false
		},
	},
	actions: {
		/**
		 * 保存登录数据
		 */
		[APP_SAVELOGIN]({ commit }, value) {
			commit(APP_SAVELOGIN, value)
			uni.setStorage({
				key: 'loginInfo',
				data: value
			})
		},

		/**
		 * 登出
		 */
		[APP_LOGOUT]({ commit }, value) {
			commit(APP_LOGOUT)
			uni.removeStorage({
				key: 'loginInfo'
			})
		},

		/**
		 * 检测登录
		 */
		[APP_CHECKLOGIN]({ commit }) {
			return new Promise((resolve, reject) => {
				let userInfo = uni.getStorageInfoSync('loginInfo') || '';
				if (userInfo) {
					uni.getStorage({
						key: 'loginInfo',
						success: function(res) {
							if (res.data.user && res.data.password) {
								commit(APP_SAVELOGIN, res.data)
								resolve()
							} else {
								reject()
							}
						},
						fail: function(err) {
							reject()
						}
					});
				} else {
					reject()
				}
			})
		}
	}
};

export default app;
