<template>
	<view>
		<view class="title">营业信息</view>
		<view class="row lss-hairline--bottom">
			<label>姓名:</label>
			<text>{{ agentData.legal }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>身份证号码:</label>
			<text>{{ agentData.identification_number }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>法人手机号:</label>
			<text>{{ agentData.mobileNo }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>法人/经营者身份证正面:</label>
			<image class="row__img" mode="aspectFit" :src="imgUrl + agentData.idcards_front"></image>
		</view>
		<view class="row lss-hairline--bottom">
			<label>法人/经营者身份证反面:</label>
			<image class="row__img" mode="aspectFit" :src="imgUrl + agentData.idcards_back"></image>
		</view>
		<view class="row lss-hairline--bottom">
			<label>营业执照（小微商户请忽略）:</label>
			<image class="row__img" mode="aspectFit" :src="imgUrl + agentData.business_img"></image>
		</view>
		<view class="row lss-hairline--bottom">
			<label>注册号:</label>
			<text>{{ agentData.business_number }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>名称:</label>
			<text>{{ agentData.agentname }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>类型:</label>
			<text>{{ agentData.one_type_name }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>地址:</label>
			<text>{{ agentData.compaddress }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>法定代表人/经营者:</label>
			<text>{{ agentData.holder_name }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>营业期限:</label>
			<text>{{ agentData.contractstdate }}-{{ agentData.contractendate }}</text>
		</view>

		<view class="title">结算信息</view>
		<view class="row lss-hairline--bottom">
			<label>法人/经营者银行卡/对公账户开户许可证:</label>
			<image class="row__img" mode="aspectFit" :src="imgUrl + agentData.industry_license"></image>
		</view>
		<view class="row lss-hairline--bottom">
			<label>开户总行银行:</label>
			<text>{{ agentData.deposit_bank }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>开户支行城市:</label>
			<text>{{ agentData.account_city }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>开户支行所在支行:</label>
			<text>{{ agentData.bank_branch }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>开户名称:</label>
			<text>{{ agentData.account_name }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>开户账号:</label>
			<text>{{ agentData.bank_account }}</text>
		</view>
		

		<view class="title">基本信息</view>
		<view class="row lss-hairline--bottom">
			<label>店内门头照:</label>
			<image class="row__img" mode="aspectFit" :src="imgUrl + agentData.agent_face"></image>
		</view>
		<view class="row lss-hairline--bottom">
			<label>店内环境照片:</label>
			<image class="row__img" mode="aspectFit" :src="imgUrl + agentData.agent_shop"></image>
		</view>
		<view class="row lss-hairline--bottom">
			<label>经营省市区:</label>
			<text>{{agentData.province}}/{{agentData.cityname}}/{{agentData.areaname}}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>经营地址:</label>
			<text>{{ agentData.compaddress }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>联系人:</label>
			<text>{{ agentData.legal }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>手机号码:</label>
			<text>{{ agentData.mobileNo }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>常用邮箱:</label>
			<text>{{ agentData.email }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>客服电话:</label>
			<text>{{ agentData.shop_tel }}</text>
		</view>
		<view class="row lss-hairline--bottom">
			<label>用户简称:</label>
			<text>{{ agentData.shortername }}</text>
		</view>
	</view>
</template>

<script>
import * as util from '@/utils';
import { getPerfectAgent } from '@/api/agent';
export default {
	components: {},
	props: {
		agentData: Object
	},
	data() {
		return {
			imgUrl: 'https://img.facess.net/'
		};
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
