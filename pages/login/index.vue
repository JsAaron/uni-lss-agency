<template>
	<view class="zai-box">
		<message ref="Message"></message>
		<view class="status_bar"></view>
		<image src="../../static/img/login.png" mode="aspectFit" class="zai-logo"></image>
		<view class="zai-form">
			<input
				class="zai-input"
				:value="username"
				@input="onUserChange($event)"
				placeholder-class
				placeholder="请输入用户名"
			/>
			<input
				class="zai-input"
				:value="password"
				@input="onPasswordChange($event)"
				placeholder-class
				password
				placeholder="请输入密码"
			/>
			<!-- <view class="zai-label" @click="onFindPasswrod">忘记密码？</view> -->

			<WButton
				text="立即登录"
				:rotate="isRotate"
				@click.native="onLogin()"
				bgColor="rgb(47, 133, 252)"
			></WButton>
		</view>
	</view>
</template>

<script>
import * as util from '@/utils';
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';
import { $$set, $$get } from '@/common/global';
export default {
	data() {
		return {
			isRotate: false,
			username: '',
			password: ''
		};
	},
	props: {},
	created() {},
	onLoad() {},
	methods: {
		...mapActions('account', ['login']),
		onUserChange({ detail: { value } } = {}) {
			this.username = value;
		},
		onPasswordChange({ detail: { value } } = {}) {
			this.password = value;
		},
		onLogin() {
			if (this.isRotate) {
				return;
			}
			this.isRotate = true;
			this.login({
				username: this.username,
				password: this.password
			})
				.then(() => {
					this.$refs['Message'].success('登录成功');
					setTimeout(() => {
						this.isRotate = false;
						util.gotoPage('switchTab', '/pages/home/index');
					}, 2000);
				})
				.catch(err => {
					this.isRotate = false;
					this.$refs['Message'].error(err);
				});
		},
		onFindPasswrod() {
			util.gotoPage('/pages/login/check');
		}
	}
};
</script>

<style>
.status_bar {
	height: calc(var(--status-bar-height) + 50px);
	width: 100%;
}

.zai-box {
	padding: 0 100upx;
	position: relative;
}
.zai-logo {
	width: 100%;
	height: 200rpx;
}
.zai-title {
	position: absolute;
	top: 0;
	line-height: 650upx;
	font-size: 50upx;
	color: #fff;
	text-align: center;
	width: 100%;
	margin-left: -100upx;
}
.zai-form {
	margin-top: 100upx;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}

.zai-input {
	background: #e2f5fc;
	margin-top: 30upx;
	border-radius: 100upx;
	padding: 20upx 40upx;
	font-size: 36upx;
	width: 500rpx;
}
.input-placeholder,
.zai-input {
	color: #94afce;
}
.zai-label {
	padding: 60upx 0;
	text-align: center;
	font-size: 30upx;
	color: #a7b6d0;
}
.zai-btn {
	background: #2f85fc;
	color: #fff;
	border: 0;
	border-radius: 100upx;
	font-size: 36upx;
}
.zai-btn:after {
	border: 0;
}
/*按钮点击效果*/
.zai-btn.button-hover {
	transform: translate(1upx, 1upx);
}
</style>
