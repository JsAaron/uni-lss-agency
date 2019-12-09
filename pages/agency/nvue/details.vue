<template>
	<view>
		<uni-nav-bar
			left-icon="arrowleft"
			fixed
			status-bar
			right-text="编辑"
			background-color="#2F85FC"
			:title="titleText"
			color="#ffffff"
			@click-left="onBack"
			@click-right="onAmend"
		/>

		<!-- 代理 -->
		<block v-if="pageType == 'agency'">
			<view class="content">
				<view class="content__row lss-hairline--bottom">
					<text>姓名</text>
					<text>{{ agentData.legal }}</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>公司/个人</text>
					<text>{{ agentData.userName }}</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>手机</text>
					<text>{{ agentData.mobileNo }}</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>省</text>
					<text>{{ provName }}</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>市</text>
					<text>{{ cityName }}</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>区</text>
					<text>{{ areaName }}</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>地址</text>
					<text>{{ agentData.compaddress }}</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>合同开始日期</text>
					<text>{{ agentData.contractstdate }}</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>合同结束日期</text>
					<text>{{ agentData.contractendate }}</text>
				</view>
			</view>
		</block>

		<!-- 商户 -->
		<block v-if="pageType == 'business'">
			<view class="content">
				<view class="content__row lss-hairline--bottom">
					<text>上级代理</text>
					<text>杨跃鹏</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>联系人</text>
					<text>顺丰</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>到期时间</text>
					<text>2017-11-22 11:11:11</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>归属业务员</text>
					<text>杨跃鹏</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>手机号</text>
					<text>13888888888</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>归属业务员</text>
					<text>测试</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>创建时间</text>
					<text>2017-11-22 11:11:11</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>经营类别</text>
					<text>个体餐饮</text>
				</view>
				<view class="content__row lss-hairline--bottom">
					<text>联系地址</text>
					<text>湖南长沙岳麓区</text>
				</view>
			</view>

			<QSWavesButton btnStyle="margin-top:100rpx;width:700rpx;background:#2F85FC" @click="getStep1">
				重置密码
			</QSWavesButton>
		</block>
	</view>
</template>

<script>
import * as util from '@/utils';
import { $$set, $$get } from '@/common/global';
import QSApp from '@/components/QS-inputs-split/js/app.js';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import { getProvcd } from '@/api/agent';

export default {
	components: {
		uniNavBar
	},
	data() {
		return {
			titleText:'',
			agentData: {},
			provName:'',
			cityName:'',
			areaName:'',
			pageType: '',
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

	onReady() {},

	created() {},
	onLoad(options) {
		this.agentData = JSON.parse(options.agentData);
		this.pageType = options.pageType
		this.titleText = options.title
		
		getProvcd().then(data => {
			data.map(item => {
				if (item.areaid == this.agentData.prov_cd) {
					this.provName = item.areaname;
				}
			});
		});
		if (this.agentData.city) {
			getProvcd({
				type: 'city',
				areaid: this.agentData.prov_cd
			}).then(data => {
				data.map(item => {
					if (item.areaid == this.agentData.city) {
						this.cityName = item.areaname;
					}
				});
			});
		}
		if (this.agentData.areaid) { 
			getProvcd({
				type: 'area',
				areaid: this.agentData.city
			}).then(data => {
				data.map(item => {
					if (item.areaid == this.agentData.areaid) {
						this.areaName = item.areaname;
					}
				});
			});
		}
	},
	computed: {
		// titleText() {
		// 	return this.pageType == 'agency' ? '代理商' : '商户';
		// }
	},
	methods: {
		onBack() {
			util.gotoPage('back');
		},
		onAmend() {
			util.gotoPage('/pages/agency/amend?pageType=' + this.pageType);
		}
	}
};
</script>

<style lang="scss">
.content {
	&__row {
		font-size: 28rpx;
		color: #505050;
		padding: 30rpx 20rpx;
		@include flex-h-between;
	}
}
</style>
