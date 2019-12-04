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
					<view><text>¥{{order_amt}}</text></view>
					<view>总交易额</view>
				</view>
				<view class="header__col">
					<view>{{one_agent_num}}</view>
					<view>一级代理商总数</view>
				</view>
			</view>
			<view class="header__row">
				<view class="header__col">
					<view>¥1399.49</view>
					<view>佣金总额</view>
				</view>
				<view class="header__col">
					<view>{{two_agent_num}}</view>
					<view>二级代理商总数</view>
				</view>
			</view>
			<view class="header__row">
				<view class="header__col">
					<view>{{agent_num}}</view>
					<view>商户总数</view>
				</view>
				<view class="header__col">
					<view>{{three_agent_num}}</view>
					<view>三级代理商总数</view>
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
	data() {
		return {
			one_agent_num:"",
			two_agent_num:"",
			three_agent_num:"",
			agent_num:"",
			order_amt:"",
		};
	},
	mounted() {
		this.getTableData();
	},
	methods: {
		getTableData() {
			getStatisticsHomedl({
				agentid: util.cookies.get('agentid')
			}).then(data => {
				if (data != null && data != '') {
					this.one_agent_num = data.one_agent_num;
					this.two_agent_num = data.two_agent_num;
					this.three_agent_num = data.three_agent_num;
					this.agent_num = data.agent_num;
					this.order_amt = data.order_amt;
				}
			});
		}
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
