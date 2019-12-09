<template>
	<view>
		<view class="type-title">支付通道配置</view>

		<QSRadio
			:name="formName"
			layout="column"
			variableName="electronic_invoice"
			title="支付方式"
			ref="ref_electronic_invoice"
			required
			v-model="fromValue.electronic_invoice"
			:itemArray="fromValue.electronic_invoice_itemArray"
		></QSRadio>

		<view class="step2-row">
			<view class="step2-title">抽佣比例</view>
			<uni-number-box
				:min="0.0"
				:max="100"
				:step="0.01"
			/>
		</view>
	</view>
</template>

<script>
import * as util from '@/utils';
import QSApp from '@/components/QS-inputs-split/js/app.js';
import uniSteps from '@/components/uni-steps/uni-steps.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';

export default {
	components: {
		uniNumberBox
	},
	data() {
		return {
			pageType: '',
			formName: 'add',
			fromValue: {
				electronic_invoice: '',
				electronic_invoice_itemArray: [
					{
						name: '微信',
						value: '微信'
					},
					{
						name: '支付宝',
						value: '支付宝'
					},
					{
						name: '富友',
						value: '富友'
					},
					{
						name: '随行付',
						value: '随行付'
					},
					{
						name: '银盛',
						value: '银盛'
					}
				]
			}
		};
	},
	props: {},

	onReady() {},

	created() {},
	onLoad(optopns) {},
	computed: {},
	methods: {}
};
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #fff;
}

.type-steps {
	padding: 20rpx;
}

.type-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28rpx;
	color: #464e52;
	padding: 20upx 30upx 20upx 50upx;
	position: relative;
	// background-color: rgb(248, 249, 253);
	border-bottom: 1px #f5f5f5 solid;
	background-color: #e5e9f6;
	&:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc;
	}
}

.step2-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 30rpx;
	font-size: 28rpx;
}
</style>
