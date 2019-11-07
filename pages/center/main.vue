<template>
	<view>
		<view class="header">
			<text class="header__text">测试</text>
			<view class="header__password" @click="onAmend">修改密码</view>
		</view>

		<view class="list">
			<view class="list__row lss-hairline--bottom">
				<text>手机</text>
				<text>13888888888</text>
			</view>
			<view class="list__row lss-hairline--bottom">
				<text>加入时间</text>
				<text>2019-11-11 11:11:11</text>
			</view>
			<view class="list__row lss-hairline--bottom">
				<text>微信分润</text>
				<text>100%</text>
			</view>
			<view class="list__row lss-hairline--bottom">
				<text>支付宝分润</text>
				<text>100%</text>
			</view>
			<view class="list__row lss-hairline--bottom">
				<text>随行付分润</text>
				<text>100%</text>
			</view>
			<view class="list__row lss-hairline--bottom">
				<text>富友分润</text>
				<text>100%</text>
			</view>
		</view>
		
		<QSWavesButton btnStyle="margin-top:100rpx;width:700rpx;background:#2F85FC" @click="onEnsure">退出登录</QSWavesButton>

	</view>
</template>

<script>
import * as util from '@/utils';
import { $$set, $$get } from '@/common/global';
export default {
	components: {},
	data() {
		return {};
	},
	props: {},
	created() {},
	onLoad() {},
	methods: {
		onAmend(){
			util.gotoPage('/pages/center/amend')
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
	background-color:#fff;
	&__row {
		@include flex-h-between;
		padding: 20rpx 30rpx;
		font-size: 28rpx;
		>text{
			padding: 10rpx 0;
		}
	}
}
</style>
