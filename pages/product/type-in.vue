<template>
	<view>
		<view class="type-title">基础列表</view>
		<QSInput :name="name" titleColor="#f1505c" variableName="input" required layout="row" titleLayout="left" tapClear title="姓名"  v-model="form.input"></QSInput>
		<QSInput :name="name" titleColor="#f1505c" variableName="input" required layout="row" titleLayout="left" tapClear title="身份证号码" v-model="form.input"></QSInput>
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

<style lang="scss">
.type-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 32upx;
	color: #464e52;
	padding: 30upx 30upx 30upx 50upx;
	margin-top: 20upx;
	position: relative;
	background-color: #fdfdfd;
	border-bottom: 1px #f5f5f5 solid;
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
</style>
