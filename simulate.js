/*
 * @Author: Aaron
 * @Date: 2019-08-11 11:49:22
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-27 22:22:25
 * @Description: 
 */
function simulate() {

	const pages = {
		"typeIn": "/pages/product/type-in",
		"product": "/pages/product/index",
		"product-details": "/pages/product/details/index",
		"center": "/pages/center/index",
		"agency": "/pages/agency/index",
		"add-business": "/pages/agency/add-business"
	}
	return pages["typeIn"]
	return pages["product"]
	// return pages["product-details"]
	// return pages["center"]
	// return pages["add-business"]
	// return pages["agency"]

}

module.exports = simulate;
