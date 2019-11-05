/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 16:59:41
 * @LastEditTime: 2019-08-16 16:58:44
 * @LastEditors: Please set LastEditors
 */
import config from "@/common/config";
import {
	showToast
} from "./common.js"

/**
 * 获取openid
 */
export function getWxOpenId(device) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.openIdUrl,
			data: {
				appid: device.appid,
				secret: "",
				js_code: device.code
			},
			method: "GET",
			success: resolve,
			fail: reject
		});
	});
}

/**
 * 获取注册二维码
 * @param
 */
export function getRegeditQrCode(device) {
	return new Promise((resolve, reject) => {
		console.log('device', device)
		uni.request({
			url: config.registerQrCodeUrl,
			data: {
				appid: device.appid,
				secret: device.secret,
				js_code: device.code,
				agentid: device.agentid
			},
			method: "GET",
			success: resolve,
			fail: reject
		});
	});
}


/**
 * 商品分享二维码
 */
export function getShareQrCode({
	device,
	agentidsp,
	goodsid,
	fagentid
} = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.goodsQrCodeUrl,
			data: {
				agentidsp,
				goodsid,
				fagentid,
				appid: device.appid,
				secret: device.secret,
				js_code: device.code,
				agentid: device.agentid
			},
			method: "GET",
			success: resolve,
			fail: reject

		});
	});
}



/**
 * 获取二维码
 * solid 0 分享
 * solid 1 付款
 * @param
 */
let wxAvatarUrl = "" //微信头像缓存
export function getWinxinAvatarUrl(avatarUrl) {
	return new Promise((resolve, reject) => {
		if (wxAvatarUrl) {
			resolve(wxAvatarUrl)
		} else {
			uni.request({
				url: config.weixin,
				data: {
					urls: String(avatarUrl)
				},
				method: "GET",
				success: (res) => {
					wxAvatarUrl = res.data.tgimg
					resolve(wxAvatarUrl)
				},
				fail: reject
			});
		}
	});
}

/**
 * 获取付款二维码
 */
export function getPayQrCode(device, agentname) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.payQrCodeUrl,
			data: {
				agentname: agentname,
				appid: device.appid,
				secret: device.secret,
				js_code: device.code,
				agentid: device.agentid
			},
			method: "get",
			success: resolve,
			fail: reject
		});
	});
}

/**
 * 查看是否授权
 * 查看授权
 */
export function checkAccredit(scopeName) {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success(res) {
				if (res.authSetting[scopeName]) {
					resolve();
				} else {
					reject();
				}
			},
			fail() {
				reject();
			}
		});
	});
}

/**
 * 获取用户数据
 */
export function getUserInfo() {
	return new Promise((resolve, reject) => {
		uni.getUserInfo({
			success: res => {
				resolve(res.userInfo);
			},
			fail: reject
		});
	});
}


/**
 * 提前向用户发起授权请求
 */
function requestAccredit(scopeName) {
	return new Promise((resolve, reject) => {
		uni.authorize({
			scope: scopeName,
			success(res) {
				resolve();
			},
			fail() {
				reject();
			}
		});
	});
}

/**
 * 探测授权
 * 1.scope.camera
 * 2.因为有可能取消，所以支持递归检测
 */
export function detectAccredit(scopeName) {
	return new Promise((resolve, reject) => {
		checkAccredit(scopeName).then(resolve).catch(() => {
			//未授权,发起新的授权请求
			requestAccredit(scopeName).then(resolve).catch(reject)
		})
	});
}

/**
 * 授权成功后
 * 开始获取定位地址
 * 1 支持地图定位
 * 2 直接获取
 */
export function getLocationData(data = {}) {
	return new Promise((resolve, reject) => {
		const setComplete = res => {
			if (!res) {
				res = {}
			}
			if (!res.latitude || !res.longitude) {
				showToast("定位失败，请确定GPS功能是否打")
				reject({})
				return
			}
			resolve(res);
		}

		// 地图方式
		if (data.supportMap) {
			uni.chooseLocation({
				complete: setComplete
			});
		} else {
			//直接获取
			uni.getLocation({
				type: "wgs84",
				complete: setComplete
			});
		}
	})
}
