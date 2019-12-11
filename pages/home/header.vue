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
					<view>¥{{ totalData.order_amt }}</view>
					<view>总交易额</view>
				</view>
				<view class="header__col" v-if="showOneAgent">
					<view>{{ totalData.one_agent_num }}</view>
					<view>一级代理商总数</view>
				</view>
				<view class="header__col" v-if="twoOneAgent">
					<view>{{ totalData.two_agent_num }}</view>
					<view>二级代理商总数</view>
				</view>
				<view class="header__col">
					<view>{{ totalData.three_agent_num }}</view>
					<view>三级代理商总数</view>
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
			one_agent_num: '',
			two_agent_num: '',
			three_agent_num: '',
			agent_num: '',
			order_amt: ''
		};
	},
	computed: {
		showOneAgent() {
			if (this.dl_type == -1 || this.dl_type == 0) {
				return true;
			}
			return false;
		},
		twoOneAgent() { 
			//三级不能显示
			if (this.dl_type == 2) {
				return false;
			}
			return true;
		}
	},
	mounted() {}
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
		background-size: cover;
		color: #ffffff;
	}
	&__top-content {
		@include flex-h-left;
		padding-top: 60rpx;
	}
	&__text {
		font-size: 20px;
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
