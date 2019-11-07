<template>
	<view>
		<QSInput
			:name="formName"
			variableName="company"
			title="公司/个人"
			requiredSign
			layout="row"
			titleLayout="left"
			v-model="form.company"
		></QSInput>

		<QSInput
			:name="formName"
			variableName="name"
			title="联系人"
			requiredSign
			layout="row"
			titleLayout="left" 
			v-model="form.name"
		></QSInput>

		<QSInput
			:name="formName"
			variableName="phone"
			title="手机"
			requiredSign
			layout="row"
			titleLayout="left"
			v-model="form.phone"
			inputType="digit"
		></QSInput>

		<QSInput
			:name="formName"
			requiredSign
			variableName="address"
			title="联系地址"
			layout="row"
			titleLayout="left"
			v-model="form.address"
		></QSInput>

		<QSPickerCity
			:name="formName"
			variableName="city"
			title="经营省市区"
			:value="form.city"
			placherhold="请选择"
		/>
		
		<QSWavesButton btnStyle="margin-top:100rpx;width:700rpx;background:#2F85FC" @click="onEnsure">确定</QSWavesButton>

		<QSWavesButton btnStyle="margin-top:50rpx;width:700rpx;background:#2F85FC" @click="getStep1">
			确定并提交审核
		</QSWavesButton>
	</view>
</template>

<script>
import * as util from '@/utils';
import { $$set, $$get } from '@/common/global';
import QSApp from '@/components/QS-inputs-split/js/app.js';
import uniSteps from '@/components/uni-steps/uni-steps.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';

export default {
	components: {},
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
		onEnsure(){
			
		}
	}
};
</script>

<style lang="scss"></style>
