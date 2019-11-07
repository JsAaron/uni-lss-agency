<template>
	<view>
		<QSInput
			:name="formName"
			variableName="company"
			title="原始密码"
			required
			password
			layout="row"
			titleLayout="left"
			passwordIconColor
			v-model="form.company"
		></QSInput>
		
		<QSInput
			:name="formName"
			variableName="company"
			title="新密码"
			required
			password
			layout="row"
			passwordIconColor
			titleLayout="left"
			v-model="form.company"
		></QSInput>
		
		<QSInput
			:name="formName"
			variableName="company"
			title="确定新密码"
			required
			passwordIconColor
			password
			layout="row"
			titleLayout="left"
			v-model="form.company"
		></QSInput>
		
		<QSWavesButton btnStyle="margin-top:100rpx;width:700rpx;background:#2F85FC" @click="onEnsure">提交修改</QSWavesButton>
		
	</view>
</template>

<script>
import * as util from '@/utils';
import { $$set, $$get } from '@/common/global';
export default {
	components: {},
	data() {
		return {};
	},
	props: {},
	created() {},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss"></style>
