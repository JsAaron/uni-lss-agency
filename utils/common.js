
export function showBusy(title) {
	uni.showLoading({
		title: title || "正在加载"
	});
}

export function hideBusy() {
	uni.hideLoading();
}

/**
 * 
 * @param {*} arg1
 * @param {*} arg2 
 * @param {*} arg3 
 */
export function showToast(arg1, arg2, arg3) {

	// showToast("success","成功",20F00)
	// showToast("fail","失败",2000)
	if (arg1 === "success" || arg1 === "fail") {

		//如果是成功，带对象参数，支持回调
		if (typeof arg2 === "object") {
			let data = arg2
			data.image = `/static/icon/${arg1}.png`
			return uni.showToast(data);
		}

		//不带对象参数
		return uni.showToast({
			mask: true,
			title: arg2,
			icon: "cancel",
			image: `/static/icon/${arg1}.png`,
			duration: arg3 || 2000
		});
	}

	// util.showToast({
	//   title: '网络异常,语音播放无法正常使用',
	// })
	if (typeof arg1 === "object") {
		return uni.showToast(arg1);
	}

	// showToast("发送成功",2000,"success")
	return uni.showToast({
		mask: true,
		title: arg1,
		icon: arg3 || "none",
		duration: arg2 || 2000
	});
}

export function hideToast(text, time, icon) {
	return uni.hideToast();
}



export function showModal(object){
	return uni.showModal(object);
}


export function friendlyDate(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}
