import globalConfig from "@/common/config";
import {
	md5Ajax,
	unifyAjax
} from './request'
import {
	showModal
} from "./common"



/**
 * 获取用户状态
 */
export function getUserState(openid, fagentid) {
	return new Promise((resolve, reject) => {
		md5Ajax({
				funcode: '0114',
				encrypt: {
					data: {
						openid: openid
					}
				},
				request: {
					agentid: fagentid //商家id
				}
			})
			.then(resolve)
			.catch(reject)
	})
}

/**
 * 获取银行名字
 */
function getBankCardName(bankname) {
	return bankname.match(/\[(\S+)\]/)[1]
}

/**
 * 获取银行卡列表
 * data
 *  cardType: "2",
 */
function getBankCard(taccountid, cardType) {
	return new Promise((resolve, reject) => {
		unifyAjax({
				data: {
					funcode: '0006',
					cardType: cardType,
					taccountid: taccountid
				}
			})
			.then(resolve)
			.catch(reject)
	})
}

/**
 * 获取银行卡的拼接组装数据集
 */
export function getBankCardAssembly(taccountid, cardType) {
	return new Promise((resolve, reject) => {
		getBankCard(taccountid, cardType)
			.then(response => {
				let listData
				if (
					response &&
					response.data.banklist &&
					response.data.banklist.length
				) {
					listData = response.data.banklist.map(item => {
						const bankname = getBankCardName(item.bankname)
						const cardType = item.cardType == 1 ? '信用卡' : '储蓄卡'
						const no = item.bankaccount.substr(item.bankaccount.length - 4)
						const title = `${bankname}${cardType}(${no})`
						return {
							bankuserid: item.bankuserid,
							userName: item.drawname,
							idcard: item.cert_no,
							title: title,
							image: `${globalConfig.imgDomain}/images/${
                item.bankico
              }@2x.png`,
							xx_no: item.bankaccount2
						}
					})
				}
				resolve(listData)
			})
			.catch(reject)
	})
}

/**
 * 获取联动数据
 * @param {*} fareaid
 */
export function getGangedData(fareaid) {
	return new Promise((resolve, reject) => {
		unifyAjax({
			data: {
				funcode: '0017',
				fareaid: fareaid
			}
		}).then(item => {
			resolve(item.data.arealist)
		})
	})
}

/**
 * 支付检测验证处理
 */
export function pay_verify_step(loginType) {
	//没有注册
	if (loginType == 1) {
		showModal({
			title: '未注册',
			content: '无法支付,请先注册',
			confirmText: '注册',
			complete: res => {
				if (res.confirm) {
					//注册完毕后，会继续调用pay_verify_step走绑卡流程
					wx.hideToast()
					common.gotoPage("/common/login/login?pageType=merchant")
				}
			}
		})
		return false
	}

	//已注册未绑卡
	if (loginType == 2) {
		showModal({
			title: '未绑卡',
			content: '请先绑定银行卡',
			confirmText: '绑卡',
			complete: res => {
				if (res.confirm) {
					//退出上个页面，会显示这个状态
					wx.hideToast()
					//直接绑卡
					common.gotoPage(`/common/add-bank-card/add-bank-card`);
				}
			}
		})
		return false
	}

	//已注册已绑卡未激活
	// if (loginType == 3) {
	//   showModal({
	//     title: "未激活",
	//     content: "银行卡已绑卡,但没开通快捷支付",
	//     confirmText: "开通快捷",
	//     complete: (res) => {
	//       if (res.confirm) {
	//         wx.hideToast()
	//         common.gotoPage(`/common/fast-pay/fast-pay`)
	//       }
	//     }
	//   })
	//   return false
	// }

	//loginType ==4
	return true
}


/**
 * 获取广告
 */
export function getAdvert() {
	return new Promise((reslove, reject) => {
		unifyAjax({
			data: {
				funcode: "0109"
			}
		}).then(reslove).catch(reject);
	});
}
