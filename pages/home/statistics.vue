<template>
	<view class="header">
		<view class="header__data">
			<view class="header__row">
				<view class="header__col">
					<view>{{ statisticsData.yx_order_amount }}/{{ statisticsData.yx_yj_amount }}</view>
					<view>交易总额(元)</view>
				</view>
				<view class="header__col">
					<view>{{ statisticsData.wx_num_amount }}/{{ statisticsData.wx_yj_amount }}</view>
					<view>微信/佣金总额</view>
				</view>
				<view class="header__col">
					<view>{{ statisticsData.zfb_num_amount }}/{{ statisticsData.zfb_yj_amount }}</view>
					<view>支付宝/佣金总额</view>
				</view>
				<view class="header__col">
					<view>{{ statisticsData.sxf_num_amount }}/{{ statisticsData.sxf_yj_amount }}</view>
					<view>随行付/佣金总额</view>
				</view>
				<view class="header__col">
					<view>{{ statisticsData.fy_num_amount }}/{{ statisticsData.fy_yj_amount }}</view>
					<view>富友/佣金总额</view>
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
		statisticsData: Object
	},
	data() {
		return {};
	},
	mounted() {}
};
</script>

<style lang="scss">
	
.header {
	margin-bottom: 70rpx;
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
