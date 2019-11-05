import { deviceAjax } from "./request"
import { showToast } from "./common"

/**
 * 验证密码
 */
export function verifyPassword(data) {
	return new Promise((resolve, reject) => {
		deviceAjax({
			data
		}).then(response => {
			if (response.data.status == 0) {
				resolve(response.data.data.couponInfo)
			} else {
				reject(response)
			}
		}).catch(reject);
	})
}

//==========银行卡支付具体处理==============

/**
 * 最终确定银行卡支付（face与银行卡通用）
 * 对外接口
 * 1 提供本文件使用
 * 2 提供给face-pay调用
 */

/**
 * 创建银行卡交易
 *      code: "805017",
        xx_no: String(this.data.xx_no),
        money: String(Number(this.data.money) * 100),
        agentid: app.globalData.login.taccountid, //用户id
        parent_agentid: this.data.parent_agentid //商户id
 */
export function createBankCardTrade(data) {
	return new Promise((resolve, reject) => {
		deviceAjax({
			data
		}).then(response => {
			const equipment_order = response.data.data.equipment_order
			if (equipment_order) {
				resolve(response)
			} else {
				reject(response)
			}
		}).catch(reject);
	})
}


/**
 * 获取状态状态
 */
export function getTradeOrderState(equipment_order, {
	success_callback,
	fail_callback,
	poll_callback
}) {
	deviceAjax({
		data: {
			code: "805006",
			equipment_order
		}
	}).then(response => {
		let orderStatus = response.data.data.orderStatus;
		//支付成功
		if (orderStatus == 1) {
			success_callback && success_callback(response)
			return
		}
		//支付失败
		if (orderStatus == 2) {
			fail_callback && fail_callback(response)
			return
		}
		// 没有获取结果，继续
		if (orderStatus == 4) {
			poll_callback && poll_callback(response)
			return
		}
	}).catch(error => {
		showToast(error.data.data.Mesg)
	});
}
