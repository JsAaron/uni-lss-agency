const app = {
	state: {
		//获取用户信息
		userInfo: {},

		//微信认证
		device: {
			agentid: "", //商户ID
			openid: "", //注册最后一步需要，用来判断登录
			code: "", //登录凭证
			//zheng
			appid: "wx3ae92fa03906e0f7",
			secret: ""
		},
	},
	mutations: {
		/**
		 * 设置用户信息数据
		 */
		["SET_USERINFO"](state, data) {
			state.userInfo = data
		},

		/**
		 * 设备数据
		 */
		["SET_CODE"](state, data) {
			state.device.code = data
		},
		["SET_OPENID"](state, data) {
			state.device.openid = data
		},

	},
	actions: {

	}
};

export default app;
