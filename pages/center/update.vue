<template>
	<view>
		<view class="header">
			<text class="header__text">{{ user_name }}</text>
		</view>

		<WButton
			text="下载更新"
			:rotate="isRotate"
			@click.native="onUpdate()"
			bgColor="rgb(47, 133, 252)"
		></WButton>
	</view>
</template>

<script>
import * as util from '@/utils';
import { mapState, mapActions } from 'vuex';
import setting from '@/setting.js';
export default {
	components: {},
	data() {
		return {
			isRotate: false,
			show: false,
			version: setting.releases.version,
			create_date: '',
			wx: '',
			zfb: '',
			mobileno: '',
			user_name: ''
		};
	},
	onLoad() {
		this.dl_type = util.cookies.get('dl_type');
		if (this.dl_type != '-1') {
			this.show = true;
		}
		this.user_name = util.cookies.get('user_name');
		this.create_date = util.cookies.get('create_date');
		this.wx = util.cookies.get('wx');
		this.zfb = util.cookies.get('zfb');
		this.mobileno = util.cookies.get('mobileno');
	},
	props: {},
	created() {},
	methods: {
		...mapActions('account', ['logout']),
		onAmend() {
			util.gotoPage('/pages/center/amend');
		},
		onExit() {
			uni.showModal({
				content: '退出登录?',
				success: res => {
					if (res.confirm) {
						this.logout();
						util.gotoPage('reLaunch', '/pages/login/index');
					}
				}
			});
		},
		onGoToUpdate() {
			util.gotoPage('/pages/center/update');
		},
		onUpdate() {
			this.isRotate = true;
			uni.showToast({
				icon: 'none',
				mask: true,
				title: '新版本下载完成后将自动弹出安装程序',
				duration: 5000
			});
 
			//设置 最新版本apk的下载链接
			var downloadApkUrl = getApp().globalData.update.url;
			var dtask = plus.downloader.createDownload(downloadApkUrl, {}, function(d, status) {
				// 下载完成
				if (status == 200) {
					plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(
						error
					) {
						uni.showToast({
							title: '安装失败',
							duration: 1500
						});
						this.isRotate = false;
					});
				} else {
					uni.showToast({
						title: '更新失败',
						duration: 1500
					});
					this.isRotate = false;
				}
			});
			dtask.start();
		}
	}
};
</script>

<style lang="scss">
.header {
	@include flex-v;
	height: 350rpx;
	width: 100%;
	background-image: url('~@/static/img/logo.jpg');
	background-size: cover;
	color: #ffffff;

	&__password {
		margin-top: 30rpx;
		color: #007aff;
		background: #fff;
		border-radius: 20px;
		padding: 7rpx 25rpx;
		font-size: 25rpx;
	}
	&__text {
		font-size: 20px;
	}
}

.list {
	background-color: #fff;
	&__row {
		@include flex-h-between;
		padding: 20rpx 30rpx;
		font-size: 28rpx;
		> text {
			padding: 10rpx 0;
		}
	}
}
.update {
	display: flex;
	align-items: center;
	justify-content: center;
	&__content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		font-size: 28rpx;
		background: red;
		color: #fff;
		margin: 0 20rpx;
	}
}
</style>
