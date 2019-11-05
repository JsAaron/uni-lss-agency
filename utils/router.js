import {
	isNumber
} from "./lang";

/**
 * 去成功页面
 */
export function gotoSuccessPage(args) {
	gotoPage(`/common/success/success?data=${JSON.stringify(args)}`);
}

/**
 * 失败页面
 */
export function gotoFailPage(args) {
	gotoPage(`/common/error/error?data=${JSON.stringify(args)}`);
}

/**
 * 跳页面
 * navigateTo 保留当前页面，跳页
 * redirectTo 关闭当前页面，跳页，用于基本不重复的页面，比如注册流程
 * reLaunch   关闭之前所有页面，一般用于注册完毕
 * 
 * 4种情况
 * 1 gotoPage(url)
 * 2 gotoPage(reLaunch,url)
 * 3 gotoPage(url,2000)
 * 4 gotoPage(reLaunch,url,2000)
 **/
export function gotoPage(type, url, time) {

	//如果是返回，带时间
	if (type === "back") {
		time = url
		if (time) {
			setTimeout(() => {
				uni.navigateBack({})
			}, time)
		} else {
			uni.navigateBack({})
		}
		return
	}

	//gotoPage(undefined,url)
	if (!type && url) {
		uni.navigateTo({
			url: url
		});
		return
	}

	const length = arguments.length


	// gotoPage(url)
	if (length === 1) {
		uni.navigateTo({
			url: type
		});
		return
	}

	//gotoPage(url,2000)
	//gotoPage(reLaunch, url)
	if (length === 2) {
		//gotoPage(url,2000)
		if (isNumber(url)) {
			setTimeout(() => {
				uni.navigateTo({
					url: type
				});
			}, url)
		} else {
			//gotoPage(switchTab, url)
			///gotoPage(reLaunch, url)
			wx[type || navigateTo]({
				url
			});
		}
	}

	// gotoPage(reLaunch,url,2000)
	if (length === 3) {
		setTimeout(() => {
			wx[type]({
				url
			});
		}, time)
	}
}

/**
 * 获取上一个页面路由
 */
export function getRouterPrevPage(serial = 2) {
	var pages = getCurrentPages();
	return pages[pages.length - serial];
}

/**
 * 获取页面
 * @param {Object} value
 * 默认当前页面
 */
export function getRouterPath(value = 1) {
	var pages = getCurrentPages();
	let serial = pages.length - value //任意页面
	if (value === 'prev') {
		serial = pages.length - 2 //前一页
	}
	return pages[serial].route
}

