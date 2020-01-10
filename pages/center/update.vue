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
		<view class="update-pocess" v-if="isRotate">
			<text>下载进度:{{ percent }}</text>
		</view>
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
			percent: 0,
			isRotate: false,
			version: setting.releases.version,
			user_name: ''
		};
	},
	onLoad(option) {
		this.url = option.url;
		this.user_name = util.cookies.get('user_name');
	},
	props: {},
	created() {},
	methods: {
		onUpdate() {
			this.isRotate = true;
			uni.showToast({
				icon: 'none',
				mask: true,
				title: '新版本下载完成后将自动弹出安装程序',
				duration: 5000
			});
			var dtask = plus.downloader.createDownload(this.url, {}, (d, status) => {
				// 下载完成
				if (status == 200) {
					uni.hideToast();
					plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, error => {
						this.isRotate = false;
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '安装成功',
							duration: 1500
						});
						plus.runtime.restart();
					});
				} else {
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '下载失败',
						duration: 1500
					});
					this.isRotate = false;
				}
			});
			dtask.start();
			dtask.addEventListener('statechanged', (download, status) => {
				switch (download.state) {
					case 2:
						break;
					case 3:
						var percent = (download.downloadedSize / download.totalSize) * 100;
						this.percent = parseInt(percent) + '%';
						break;
					case 4:
						this.percent = '100%';
						break;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.update-pocess {
	display: flex;
	align-items: center;
	justify-content: center;
}

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
