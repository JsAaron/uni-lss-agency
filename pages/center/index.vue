<template>
	<view>
		<view class="header">
			<text class="header__text">{{ user_name }}</text>
			<view class="header__password" @click="onAmend">修改密码</view>
		</view>

		<view class="list">
			<view class="list__row lss-hairline--bottom">
				<text>手机</text>
				<text>{{mobileno}}</text>
			</view>
			<view class="list__row lss-hairline--bottom">
				<text>加入时间</text>
				<text>{{create_date}}</text>
			</view>
			<view v-if="show" class="list__row lss-hairline--bottom">
				<text>微信分润</text>
				<text>{{wx}}%</text>
			</view>
			<view v-if="show" class="list__row lss-hairline--bottom">
				<text>支付宝分润</text>
				<text>{{zfb}}%</text>
			</view>
			<view class="list__row lss-hairline--bottom">
				<text>版本号</text>
				<text>{{version}}</text>
			</view>
		</view>

		<WButton
			text="退出登录"
			@click.native="onExit()"
			bgColor="rgb(47, 133, 252)"
		></WButton>
		
	</view>
</template>

<script>
import * as util from '@/utils';
import { mapState, mapActions } from 'vuex';
import setting from '@/setting.js'
export default {
	components: {},
	data() {	
		return {
			show:false,
			version:setting.releases.version,
			create_date:'',
			wx:'',
			zfb:'',
			mobileno:'',
			user_name: ''
		};
	},
	onLoad() {
		this.dl_type = util.cookies.get('dl_type');
		if(this.dl_type != '-1'){
			this.show = true
		}
		this.user_name = util.cookies.get('user_name')
		this.create_date= util.cookies.get('create_date')
		this.wx= util.cookies.get('wx')
		this.zfb= util.cookies.get('zfb')
		this.mobileno= util.cookies.get('mobileno')
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
</style>
