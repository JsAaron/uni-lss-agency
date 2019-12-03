<template>
	<view>
		<view class="title">微信官方通道</view>
		<view class="row lss-hairline--bottom">
			<label>经营描述:</label>
			<text>{{ agentData.business_description }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>经营行业:</label>
			<text>{{ agentData.business_sector }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>法人银行卡:</label>
			<image class="row__img" mode="aspectFit" :src="imgUrl + agentData.industry_license"></image>
		</view>
		<view class="row lss-hairline--bottom">
			<label>开户名称:</label>
			<text>{{ agentData.account_name }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>开户总行名称:</label>
			<text>{{ agentData.deposit_bank }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>开户银行账号:</label>
			<text>{{ agentData.bank_account }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>开户支行所在地:</label>
			<text>{{ agentData.account_city }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>开户行银行全称（包括支行）:</label>
			<text>{{ agentData.bank_branch }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>特殊资质:</label>
			<image class="row__img" mode="aspectFit" :src="imgUrl + agentData.special_qualification"></image>
		</view>


		<view class="title">微信进件状态</view>
		<view class="row lss-hairline--bottom">
			<label>进件时间:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>小微商户号:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>进件状态:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>申请错误原因描述:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>入驻签约链接:</label>
		</view>
		<view class="row lss-hairline--bottom">
			<label>商户升级签约链接:</label>
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
