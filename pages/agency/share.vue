<template>
	<view>
		<message ref="Message"></message>
		<view class="type-title">支付通道配置</view>
		<view class="step2-row">
			<view class="step2-title">
				<text class="step2-star">*</text>
				<text>微信</text>
			</view>
			<uni-number-box
				:min="0.0"
				:max="100"
				:step="0.01"
				:value="fromValue.wx_num"
				@change="onchange_wx_num"
			/>
		</view>

		<view class="step2-row">
			<view class="step2-title">
				<text class="step2-star">*</text>
				<text>支付宝</text>
			</view>
			<uni-number-box
				:min="0.0"
				:max="100"
				:step="0.01"
				:value="fromValue.zfb_num"
				@change="onchange_zfb_num"
			/>
		</view>

		<view class="step2-row">
			<view class="step2-title">富友</view>
			<uni-number-box
				:min="0.0"
				:max="100"
				:step="0.01"
				:value="fromValue.fy_num"
				@change="onchange_fy_num"
			/>
		</view>

		<view class="step2-row">
			<view class="step2-title">随行付</view>
			<uni-number-box
				:min="0.0"
				:max="100"
				:step="0.01"
				:value="fromValue.sxf_num"
				@change="onchange_sxf_num"
			/>
		</view>

		<view class="step2-row">
			<view class="step2-title">银盛</view>
			<uni-number-box
				:min="0.0"
				:max="100"
				:step="0.01"
				:value="fromValue.ys_num"
				@change="onchange_ys_num"
			/>
		</view>

		<WButton
			text="保存"
			:rotate="fromValue.isRotate"
			@click.native="onSumit"
			bgColor="rgb(47, 133, 252)"
		></WButton>
	</view>
</template>

<script>
import * as util from '@/utils';
import QSApp from '@/components/QS-inputs-split/js/app.js';
import uniSteps from '@/components/uni-steps/uni-steps.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
import { getShareAgent, saveShareAgent } from '@/api/agent';

export default {
	components: {
		uniNumberBox
	},
	data() {
		return {
			pageType: '',
			formName: 'add',
			fromValue: {
				isRotate: false,
				wx_num: 0,
				zfb_num: 0,
				fy_num: 0,
				sxf_num: 0,
				ys_num: 0
			}
		};
	},
	props: {},

	onReady() {},

	created() {},
	onLoad(options) {
		this.options = options
		getShareAgent({
			agentid: this.options.agentid
		}).then(data => {
			if (data != null && data != '') {
				this.fromValue.wx_num = data.wx_num;
				this.fromValue.zfb_num = data.zfb_num;
				this.fromValue.fy_num = data.fy_num;
				this.fromValue.sxf_num = data.sxf_num;
				this.fromValue.ys_num = data.ys_num;
			}
		});
	},
	computed: {},
	methods: {
		onchange_wx_num(value) {
			this.fromValue.wx_num = value;
		},
		onchange_zfb_num(value) {
			this.fromValue.zfb_num = value;
		},
		onchange_fy_num(value) {
			this.fromValue.fy_num = value;
		},
		onchange_sxf_num(value) {
			this.fromValue.sxf_num = value;
		},
		onchange_ys_num(value) {
			this.fromValue.ys_num = value;
		},

		onSumit() {
			if (this.fromValue.isRotate) {
				return;
			}
			this.fromValue.isRotate = true;

			let query = {
				agentid: this.options.agentid,
				dl_type:  this.options.dl_type,
				num1: this.fromValue.wx_num,
				num2: this.fromValue.zfb_num,
				num3: this.fromValue.fy_num,
				num4: this.fromValue.sxf_num,
				num5: this.fromValue.ys_num,
				userCode: ''
			};

			saveShareAgent(query)
				.then(data => {
					this.fromValue.isRotate = false;
					this.$refs['Message'].success('修改成功');
				})
				.catch(err => {
					this.fromValue.isRotate = false;
					this.$refs['Message'].success(err);
				});
		}
	}
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
