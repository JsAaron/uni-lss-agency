<template>
	<view class="header">
		<view class="header__data">
			<view class="header__row">
				<view class="header__col">
					<view>{{ tradeData.order_amount }}元</view>
					<view>交易额</view>
				</view>
				<view class="header__col">
					<view>{{ tradeData.order_num }}</view>
					<view>交易笔数</view>
				</view>
				<view class="header__col">
					<view>{{ tradeData.refund_amount }}元</view>
					<view>退款金额</view>
				</view>
				<view class="header__col">
					<view>{{ tradeData.refund_num }}</view>
					<view>退款笔数</view>
				</view>
				<view class="header__col">
					<view>{{ tradeData.yx_order_amount }}元</view>
					<view>实际营收</view>
				</view>
				<view class="header__col">
					<view>{{ tradeData.serve_agent_amt }}元</view>
					<view>我的佣金</view>
				</view>
			</view> 
		</view> 
	</view>
</template>
 
<script>
import * as util from '@/utils';
import { getStatisticsHomedl } from '@/api/agent';
export default {
	components: {},
	props: {
		tradeData: Object
	},
	data() {
		return {
		};
	},
	mounted() {}
};
</script>

<style lang="scss">
.header {
	margin-bottom:70rpx;
	&__line {
		margin: 0 20rpx;
		width: 10rpx;
		height: 40rpx;
		background: #ffffff;
	}
	
	&__text {
		font-size: 20px;
	}

	&__data {
		box-shadow: 0px 10px 20px #ccc;
		@include flex-h-around;
		font-size: 25rpx;
		background: #ffffff;
		width: 700rpx;
		border-radius: 10px;
		// font-weight: bold;
		margin: 0 auto;
	}
	&__row {
		width: 100%;
		padding: 20rpx 0;
		display: flex;
		flex-wrap: wrap;
	}
	&__col {
		width: 33%;
		padding: 20rpx 0;
		line-height: 200%;
		@include flex-v;
		& > view:last-child {
			color: $text-color-gray;
		}
	}
}
</style>
