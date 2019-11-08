<script>

export default {
	globalData: {
		route: {}, //路由页面
		/**
		 * 设置需要刷新的路由页面
		 * value: prev
		 */
		setPageRefresh(value) {
			let path = getRouterPath(value);
			if (path) {
				this.route[path] = true;
			}
		},
		/**
		 * 检测是否刷新页面
		 * 根据当前页面的router是否被设置判断
		 */
		getPageRefresh() {
			var path = getRouterPath();
			if (this.route[path]) {
				delete this.route[path]; //删除
				console.log('刷新页面onshow方法', path);
				//可以刷新
				return true;
			}
		}
	},

	onLaunch: function() {
		console.log('App Launch');
		
		// #ifdef APP-NVUE
		plus.screen.lockOrientation('portrait-primary');

		let appid = plus.runtime.appid;
		if (appid && appid.toLocaleLowerCase() != 'hbuilder') {
			uni.request({
				url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
				data: {
					appid: plus.runtime.appid,
					version: plus.runtime.version
				},
				success: res => {
					console.log('success', res);
					if (res.statusCode == 200 && res.data.isUpdate) {
						let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
						// 提醒用户更新
						uni.showModal({
							title: '更新提示',
							content: res.data.note ? res.data.note : '是否选择更新',
							success: showResult => {
								if (showResult.confirm) {
									plus.runtime.openURL(openUrl);
								}
							}
						});
					}
				}
			});
		}

		var domModule = weex.requireModule('dom');
		domModule.addRule('fontFace', {
			fontFamily: 'texticons',
			src: "url('./static/text-icon.ttf')"
		});
		// #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
page {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	font-size: 16px;
	-webkit-font-smoothing: antialiased;
	// font-family: "PingFang SC", Helvetica, "STHeiti STXihei", "Microsoft YaHei",
	//   Tohoma, Arial, sans-serif;
	font-family: Arial;
	background-color: #F9F8FD;
	position: relative;
	font-size: 16px;
	font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-webkit-tap-highlight-color: transparent;
}

/* 默认去边框  */
button[plain] {
	border: 0;
}

// 去边框
button::after {
	border: none;
}

input {
	outline: none;
	border: none;
	list-style: none;
}
</style>
