import {
	AccountLogin
} from '@/api/login'
import * as util from '@/utils';

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
			commit,
			dispatch
		}, {
			username,
			password
		}) {
			return new Promise((resolve, reject) => {
				// 开始请求登录接口
				AccountLogin({
						username,
						password
					})
					.then(async res => {
						util.cookies.set('uuid', res.id)
						util.cookies.set('agentid', res.agentid)
						util.cookies.set('dl_type', res.dl_type)
						util.cookies.set('xt_id', res.xt_id)
						util.cookies.set('token', res.accessToken)

						// 设置 vuex 用户信息
						await dispatch('user/set', {
							name: res.name
						}, {
							root: true
						})

						resolve()
					})
					.catch(reject)
			})
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
