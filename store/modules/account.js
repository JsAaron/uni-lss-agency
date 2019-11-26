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
		 * @description 注销用户并返回登录页面
		 * @param {Object} param context
		 * @param {Object} param vm {Object} vue 实例
		 * @param {Object} param confirm {Boolean} 是否需要确认
		 */
		logout({
			commit
		}) {
			util.cookies.remove('token')
			util.cookies.remove('uuid')
			util.cookies.remove('agentid')
			util.cookies.remove('dl_type')
			util.cookies.remove('xt_id')
		},

		/**
		 * 检测登录
		 */
		checklogin({
			commit
		}) {
			return new Promise((resolve, reject) => {
				const token = util.cookies.get('token')
				if (token) {
					resolve()
				} else {
					reject()
				}
			})
		}
	}
};
