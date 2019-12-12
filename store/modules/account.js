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
						password,
						type: "0"
					})
					.then(async res => {
						util.cookies.set('uuid', res.id)
						util.cookies.set('agentid', res.agentid)
						
						//dl_type（-1窝单方，0-一级代理商，1-二级代理商，2-三级代理商，4商家）
						util.cookies.set('dl_type', res.dl_type)
						util.cookies.set('xt_id', res.xt_id)
						util.cookies.set('token', res.accessToken)
						util.cookies.set('user_name',res.name)
						console.log(res)
										
						util.cookies.set('create_date', res.create_date)
						util.cookies.set('wx', res.wx)
						util.cookies.set('zfb', res.zfb)
						util.cookies.set('mobileno',res.mobileno)
						
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
			util.cookies.remove('user_name')
			
			util.cookies.remove('create_date', res.create_date)
			util.cookies.remove('wx', res.wx)
			util.cookies.remove('zfb', res.zfb)
			util.cookies.remove('mobileno',res.mobileno)
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
