import {
	isEmpty
} from '@/utils/lang';

let version = '1.0.8'

/**
 * 微信认证
 */
let device = {
	agentid: '', //商户ID
	openid: '', //注册最后一步需要，用来判断登录
	code: '', //登录凭证
	//zheng
	appid: 'wx3ae92fa03906e0f7',
	secret: ''
}

/**
 * 扫描
 */
let qrPay = {}

/**
 * 通过分享获取的数据接口
 */
let share = {
	posterImageUrls: [], //海报分享图
	prize_pz_id: '', //
	fagentid: '' //推荐，商户，用户都需要, 通过二维码转发 获取
}

/**
 * 用户信息
 */
let userInfo = {}

/**
 * 坐标信息
 */
let location = {}

/**
 * 登录信息
 */
let login = {}


/**
 * @param {Object} data
 * 这只全局login数据
 */
function setGolbal(data) {
	let taccountId = data.taccountId;
	if (!isEmpty(taccountId)) {

		for (let key in data) {
			login[key] = data[key]
		}

		//扩展login
		taccountId = String(taccountId);
		device.agentid = taccountId;
		login.taccountid = taccountId;

		//0-普通会员，1-创客,2-金牌创客,3-钻石创客,4-机构
		login.user_level_name = getUserLevel(data.user_level)

		//是否已经实名认证
		login.isfact = data.isfact == 1

		///是否开通四大券平台 0-未开通，1-已开通
		login.is_volume = data.is_volume;
		//四大券平台邀请码
		login.referral_code = data.referral_code

		if (data.agenttype == "0") {
			login.platform = "h5"
		} else if (data.agenttype == "1") {
			login.platform = "user"
		} else if (data.agenttype == "2") {
			login.platform = "merchant"
		}

		// 设置类型
		setDl(data.dl_type, data.is_fws)
	}
}

/**
 * 用户级别
 */
function getUserLevel(user_level) {
	if (user_level == "0") {
		return "普通会员"
	} else if (user_level == "1") {
		return "创客"
	} else if (user_level == "2") {
		return "钻石创客"
	} else if (user_level == "2") {
		return "机构"
	}
	return ""
}

/**
 * 设置类型
    dl_type;//代理类型  0-省代理，1-市代理，3-商圈合人,4-商铺
 */
function setDl(dl_type, is_fws) {
	let dl_name = ""
	switch (dl_type) {
		case "0":
			dl_name = "省代理"
			break;
		case "1":
			dl_name = "市代理"
			break;
		case "3":
			// 0-未审核，1-已审核
			if (!is_fws) {
				dl_name = "商圈服务商"
			} else if (is_fws == "0") {
				dl_name = "已申请服务商，等待审核"
			} else if (is_fws == "1") {
				dl_name = "服务商"
			}
			break;
		case "4":
			dl_name = "商家"
			break;
	}
	login.has_fws = is_fws == 1
	login.dl_type = dl_type
	login.dl_name = dl_name
}

module.exports = {
	$$set: {
		login(key, value) {

			//设置对象
			if (key && !value) {
				setGolbal(key)
				return
			}

			//设置属性
			if (key && value) {
				login[key] = value
			}
		},
		userInfo(value) {
			userInfo = value
		},
		location(latitude, longitude) {
			location.latitude = latitude
			location.longitude = longitude
		},
		code(value) {
			device.code = value
		},
		openid(value) {
			device.openid = value
		},
		share(value) {
			for (let key in value) {
				share[key] = value[key]
			}
		}
	},
	$$get: {
		login(key) {
			return login[key]
		},
		agentid() {
			return login.taccountid
		},
		appid() {
			return device.appid
		},
		openid() {
			return device.openid
		},
		device(key) {
			if (key) {
				return device[key]
			}
			return device
		},
		avatarUrl() {
			return userInfo.avatarUrl
		},
		nickName() {
			return userInfo.nickName
		},
		userInfo(key) {
			if (key) {
				return userInfo[key]
			}
			return userInfo
		},
		location(key) {
			if (key) {
				return location[key]
			}
			return location
		},
		share(key) {
			let v = share[key]
			if (v) {
				return v
			} else {
				// console.log('没有找到share:' + key)
			}
		}
	}
}
