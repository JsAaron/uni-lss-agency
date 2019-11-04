/*
 * @Author: Aaron
 * @Date: 2019-08-11 11:49:22
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-27 22:22:25
 * @Description: 
 */
function simulate() {

	const common = {
		// 增加银行卡绑定
		"add-bank-card": "/pages/common/add-bank-card",
		"scan-frame": "/pages/common/scan-frame",
	};

	// return common["scan-frame"]

	//用户端
	const userUrls = {
		"home": "/pages/tabbar/home/home",
		"category": "/pages/tabbar/category/category",
		"center": "/pages/tabbar/center/center",
		"product": "/pages/common/product",

		"bankcard": "/pages/tabbar/center/bank-card", //我的银行卡
		'certification': "/pages/tabbar/center/certification", // 实名认证
		"team": "/pages/tabbar/center/team", //我的团队
		"partner":"/pages/tabbar/center/partner/partner",//创客
		"partner-order":"/pages/tabbar/center/partner/order",
		"partner-pay":"/pages/tabbar/center/partner/pay"
	}

	// return userUrls["partner-pay"]


	//==============
	// 商户端
	//==============
	const merchantUrls = {
		// 首页
		"homepage": "/pages/merchant/pages/homepage/homepage",
		"settings": "/pages/merchant/pages/settings/settings",
		"commodity": "/pages/merchant/pages/commodity/commodity",
		"commodity-add": "/pages/merchant/pages/commodity/add/add",
		"commodity-modify": "/pages/merchant/pages/commodity/modify/modify",
		"commodity-discount": "/pages/merchant/pages/commodity/discount/discount",
		"shop": "/pages/merchant/pages/shop/shop",


		device: "/pages/merchant/pages/device/device",
		deviceAdvert: "/pages/merchant/pages/device/advert/advert",
		payment: "/pages/merchant/pages/payment/payment",
		paymentCode: "/pages/merchant/pages/payment-code/payment-code",
		order: "/pages/merchant/pages/order/order"
	};
	// return merchantUrls["commodity-add"]


	const subpackageUrl = {
		// 注册商户,我要开店
		"shop-info": "/pages/subpackage/setup-shop/shop-info/shop-info",
		certification: "/pages/subpackage/setup-shop/certification/certification",
		protocol: "/pages/subpackage/setup-shop/protocol/protocol",
		settlement: "/pages/subpackage/setup-shop/settlement/settlement",

		"service-for": "/pages/subpackage/service-provider/apply-for/apply-for",
		"service-protocol": "/pages/subpackage/service-provider/apply-protocol/apply-protocol",
		"service-order": "/pages/subpackage/service-provider/apply-order/apply-order",
		"service-pay": "/pages/subpackage/service-provider/apply-pay/apply-pay",
		"service-data": "/pages/subpackage/service-provider/apply-data/apply-data",
		"service-settlement": "/pages/subpackage/service-provider/apply-settlement/apply-settlement",

	}

	// return subpackageUrl["service-data"]

}

module.exports = simulate;
