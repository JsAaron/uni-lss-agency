<template>
	<view class="header">
		<view class="header__top">
			<view class="header__top-content">
				<view class="header__line"></view>
				<text class="header__text">数据总览</text>
			</view>
		</view>
		<view class="header__data">
			<view class="header__row">
				<view class="header__col">
					<view><text>¥1399.49</text></view>
					<view>总交易额</view>
				</view>
				<view class="header__col">
					<view>1</view>
					<view>三级代理商总数</view>
				</view>
			</view>
			<view class="header__row">
				<view class="header__col">
					<view>¥1399.49</view>
					<view>佣金总额</view>
				</view>
				<view class="header__col">
					<view>113</view>
					<view>商户总数</view>
				</view>
			</view>
			<view class="header__row">
				<view class="header__col">
					<view>3</view>
					<view>二级代理商总数</view>
				</view>
				<view class="header__col">
					<view>2016</view>
					<view>总交易笔数</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	computed: {
		list_() {
			return this.list;
		}
	},
	methods: {
		onClick(e) {}
	}
};
</script>

<style lang="scss">
.header {
	height: 500rpx;
	position: relative;
	&__line {
		margin: 0 20rpx;
		width: 10rpx;
		height: 40rpx;
		background: #ffffff;
	}
	&__top {
		height: 300rpx;
		width: 100%;
		background-image: url('~@/static/img/logo.jpg');
		background-size: 100% 100%;
		color: #ffffff;
	}
	&__top-content {
		@include flex-h-left;
		padding-top: 60rpx;
	}
	&__text {
		font-size: 35px;
	}

	&__data {
		box-shadow: 0px 10px 10px #ccc;
		@include flex-h-around;
		font-size: 25rpx;
		position: absolute;
		top: 150rpx;
		background: #ffffff;
		width: 700rpx;
		border-radius: 10px;
		left: 25rpx;
		font-weight: bold;
	}
	&__row {
		padding: 20rpx 0;
	}
	&__col {
		padding: 20rpx 0;
		line-height: 200%;
		@include flex-v;
		& > view:last-child {
			color: $text-color-gray;
		}
	}
}
</style>
