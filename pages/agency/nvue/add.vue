<template>
	<view>
		
		<!-- 代理 -->
		<block v-if="pageType == 'agency'">
			
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

			<QSPickerCustom
				:name="formName"
				ref="refProvince"
				layout="row"
				titleLayout="left"
				required
				variableName="province"
				title="省"
			/>
			<QSPickerCustom
				:name="formName"
				titleLayout="left"
				layout="row"
				ref="refCity"
				required
				variableName="city"
				title="市"
			/>


			<QSWavesButton btnStyle="margin-top:100rpx;width:700rpx;background:#2F85FC" @click="onEnsure">
				确定
			</QSWavesButton>

			<QSWavesButton btnStyle="margin-top:50rpx;width:700rpx;background:#2F85FC" @click="getStep1">
				确定并提交审核
			</QSWavesButton>
		</block>

		<!-- 商户 -->
		<block v-if="pageType == 'business'">
			<QSInput
				:name="formName"
				variableName="company"
				title="商户名"
				required
				layout="row"
				titleLayout="left"
				v-model="form.company"
			></QSInput>

			<QSInput
				:name="formName"
				variableName="name"
				title="联系人"
				required
				layout="row"
				titleLayout="left"
				v-model="form.name"
			></QSInput>

			<QSInput
				:name="formName"
				variableName="phone"
				title="手机"
				required
				layout="row"
				titleLayout="left"
				v-model="form.phone"
				inputType="digit"
			></QSInput>

			<QSInput
				:name="formName"
				required
				variableName="address"
				title="电子邮箱"
				layout="row"
				titleLayout="left"
				v-model="form.address"
			></QSInput>

			<QSInput
				:name="formName"
				required
				variableName="address"
				title="详细地址"
				layout="row"
				titleLayout="left"
				v-model="form.address"
			></QSInput>

			<QSPickerCustom
				:name="formName"
				ref="refProvince"
				layout="row"
				titleLayout="left"
				required
				variableName="province"
				title="省"
			/>
			<QSPickerCustom
				:name="formName"
				titleLayout="left"
				layout="row"
				ref="refCity"
				required
				variableName="city"
				title="市"
			/>

			<QSPickerCustom
				:name="formName"
				titleLayout="left"
				layout="row"
				ref="refCategory"
				required
				variableName="category"
				title="经营类别"
			/>
			<QSWavesButton btnStyle="margin-top:100rpx;width:700rpx;background:#2F85FC" @click="onEnsure">
				确定
			</QSWavesButton>
		</block>
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
	props: {},

	onReady() {
		this.setPickerData();
	},

	created() {},
	onLoad(optopns) {
		uni.setNavigationBarTitle({
		    title: optopns.title
		});
		this.pageType = optopns.pageType;
	},
	computed: {},
	methods: {
		setPickerData() {
			const province = [['美食', '娱乐']];
			const city = [['美食', '娱乐']];
			const category = [['美食', '娱乐']];
			this.setPickerDataFc('refProvince', province);
			this.setPickerDataFc('refCity', city);
			this.setPickerDataFc('refCategory', category);
		},
		setPickerDataFc(name, data) {
			console.log('准备 调用setData');
			this.$refs[name].setData(data);
		},
		onEnsure() {}
	}
};
</script>

<style lang="scss"></style>
