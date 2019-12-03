<template>
	<view>
		<view class="title">支付宝</view>
		<view class="row lss-hairline--bottom">
			<label>商家支付宝账号:</label>
			<text>{{ agentData.alipay_account }}</text>
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
