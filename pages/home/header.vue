<template>
	<view class="header">
	<!-- 	<view class="header__top">
			<view class="header__top-content">
				<view class="header__line"></view>
				<text class="header__text">数据总览</text>
			</view>
		</view> -->
		<view class="header__data">
			<view class="header__row">
				<view class="header__col">
					<view>{{ totalData.order_amt }}元</view>
					<view>总交易额</view>
				</view>
				<view class="header__col" v-if="showOneAgent">
					<view>{{ totalData.one_agent_num }}</view>
					<view>一级合伙人总数</view>
				</view>
				<view class="header__col" v-if="twoOneAgent">
					<view>{{ totalData.two_agent_num }}</view>
					<view>二级城市领导人总数</view>
				</view>
				<view class="header__col" v-if="threeOneAgent">
					<view>{{ totalData.three_agent_num }}</view>
					<view>三级推广者总数</view>
				</view>
				<view class="header__col">
					<view>{{ totalData.agent_num }}</view>
					<view>商户总数</view>
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
		totalData: Object
	},
	data() {
		return {
			dl_type: util.cookies.get('dl_type'),
		};
	},
	computed: {
		showOneAgent() {
			if (this.dl_type == -1) {
				return true;
			}
		},
		twoOneAgent() {
			if (this.dl_type == -1 || this.dl_type == 0) {
				return true;
			}
			return false;
		},
		threeOneAgent(){
			if (this.dl_type == -1 || this.dl_type == 0 || this.dl_type == 1) {
				return true;
			}
			return false;
		},
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
