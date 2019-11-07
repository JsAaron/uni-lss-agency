<template>
	<view>
		
		<uni-nav-bar
			left-icon="arrowleft"
			fixed
			status-bar
			right-text="编辑"
			left-text="返回"
			background-color="#2F85FC"
			title="详情"
			color="#ffffff"
			@click-left="onBack"
			@click-right="onAmend"
		/>
		
		<view class="content">
			<view class="content__row">
				<text>联系人</text>
				<text>士大夫撒发生的法律进</text>
			</view>
			<view class="content__row">
				<text>联系电话</text>
				<text>134000000000</text>
			</view>
			<view class="content__row">
				<text>到期时间</text>
				<text>2017-11-22 11:11:11</text>
			</view>
			<view class="content__row">
				<text>公司</text>
				<text>脸刷刷科技</text>
			</view>
			<view class="content__row">
				<text>归属业务员</text>
				<text>测试</text>
			</view>
			<view class="content__row">
				<text>加盟时间</text>
				<text>2017-11-22 11:11:11</text>
			</view>
			<view class="content__row">
				<text>状态</text>
				<text>未签约</text>
			</view>
			<view class="content__row">
				<text>联系地址</text>
				<text>湖南长沙岳麓区</text>
			</view>
		</view>
		
		
		<QSWavesButton btnStyle="margin-top:100rpx;width:700rpx;background:#2F85FC" @click="getStep1">
			提交审核
		</QSWavesButton>
	</view>
</template>

<script>
import * as util from '@/utils';
import { $$set, $$get } from '@/common/global';
import QSApp from '@/components/QS-inputs-split/js/app.js';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';

export default {
	components: {
		uniNavBar
	},
	data() {
		return {
			test:'111',
			formName: 'add',
			form: {
				company: '',
				name: '',
				phone: '',
				address: '',
				city: ''
			}
		};
	},
	props: {},

	onReady() {},

	created() {},
	onLoad(optopns) {
		this.test = optopns.data
	},
	computed: {},
	methods: {
		onBack(){
			util.gotoPage("back")
		},
		onAmend(){
			util.gotoPage("/pages/agency/amend")
		}
	}
};
</script>

<style lang="scss">
	.content{
		&__row{
			padding:30rpx 20rpx;
			@include flex-h-between;
			border-bottom: 1rpx solid #C8C7CC;
		}
	}
</style>
