<template>
	<view>
		<view class="title">随行付通道</view>
		<view class="row lss-hairline--bottom">
			<label>经营类目:</label>
			<text>{{ agentData.jy_lm_sxf }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>结算费率(%):</label>
			<text>{{ agentData.rate_sxf }}</text>
		</view>
		
		<view class="title">进件状态</view>
		<view class="row lss-hairline--bottom">
			<label>进件时间:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>微信费率:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>支付宝费率:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>商户编号:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>注册名称:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>进件状态:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>进件结果:</label>
		</view>


	
	</view>
</template>

<script>
import * as util from '@/utils';
import { getPerfectAgent } from '@/api/agent';
export default {
	components: {},
	props: {
		agentid: String
	},
	data() {
		return {
			imgUrl: 'https://img.facess.net/',
			agentData: {}
		};
	},
	mounted() {
		this.getTableData();
	},

	methods: {
		getTableData() {
			getPerfectAgent({
				agentid: this.agentid
			}).then(data => {
				if (data != null && data != '') {
					this.agentData = data;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.title {
	padding: 20rpx;
	color: #606266;
	font-size: 16px;
	background-color: #e5e9f6;
}

.row {
	display: flex;
	align-items: center;
	padding: 30rpx 20rpx;
	font-size: 28rpx;
	label {
		margin-right: 20rpx;
		width: 250rpx;
	}
	&__img {
		width: 200rpx;
		height: 200rpx;
	}
}
</style>
