<template>
	<view class="header">
		<view class="header__top">
			<view class="header__line"></view>
			<text class="header__text">数据总览</text>
		</view>
		<view class="header__data">
			<view class="header__row">
				<view class="header__col">
					<view>
						<text>¥1399.49</text>
					</view>
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
	components: {

	},
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
	position: relative;
	&__line {
		margin: 0 20rpx;
		width: 10rpx;
		height: 40rpx;
		background: #ffffff;
	}
	&__top {
		@include flex-h-left;
		height: 350rpx;
		background: #0056b3;
		color: #ffffff;
	}
	&__text {
		font-size: 35px;
	}

	&__data {
		@include flex-h-around;
		font-size: 25rpx;
		position: absolute;
		top: 230rpx;
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
