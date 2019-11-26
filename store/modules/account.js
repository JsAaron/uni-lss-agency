import {
	AccountLogin
} from '@/api/login'

export default {
	namespaced: true,
	state: {
		user: '',
		password: '',
		hasLogin: false
	},
	mutations: {
		// [SAVELOGIN](state, value) {
		// 	state.user = value.user
		// 	state.password = value.password
		// 	state.hasLogin = true
		// },
		// [LOGOUT](state) {
		// 	state.user = ''
		// 	state.password = ''
		// 	state.hasLogin = false
		// },
	},
	actions: {
		/**
		 * 登录
		 */
		login({
			commit
		}, {
			username,
			password
		}) {
			// 开始请求登录接口
			AccountLogin({
					username,
					password
				})
				.then(async res => {
					console.log(res)
				})
				.catch(err => {
					console.log('err: ', err)
				})



			// commit(APP_SAVELOGIN, value)
			// uni.setStorage({
			// 	key: 'loginInfo',
			// 	data: value
			// })
		},

		/**
		 * 登出
		 */
		logout({
			commit
		}, value) {
			commit(LOGOUT)
			uni.removeStorage({
				key: 'loginInfo'
			})
		},

		/**
		 * 检测登录
		 */
		checklogin({
			commit
		}) {
			return new Promise((resolve, reject) => {
				console.log(11111)
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
