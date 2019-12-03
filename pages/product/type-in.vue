<template>
	<view>
		<uni-nav-bar
			left-icon="arrowleft"
			fixed
			status-bar
			:right-text="barText"
			left-text="返回"
			background-color="#2F85FC"
			title="录入资料"
			color="#ffffff"
			@click-left="onBack"
			@click-right="onStep"
		/>
		<view class="type-steps"><uni-steps :options="stepList" :active="stepActive" /></view>

		<block v-if="stepActive == 0">
			<view class="type-title">联系信息</view>

			<QSInput :name="formName0" variableName="legal" title="联系人姓名" required v-model="fromValue0.legal"></QSInput>

			<QSInput
				:name="formName0"
				variableName="mobileNo"
				required
				verifyType="Tel"
				inputType="number"
				leftIcon="phone"
				title="手机号码"
				v-model="fromValue0.mobileNo"
			></QSInput>

			<QSInput
				:name="formName0"
				variableName="email"
				required
				title="常用邮箱"
				verifyType="Email"
				v-model="fromValue0.email"
			></QSInput>

			<view class="type-title">经营信息</view>

			<QSInput
				:name="formName0"
				variableName="shortername"
				required
				title="商户简称"
				v-model="fromValue0.shortername"
			></QSInput>

			<QSPickerCustom
				ref="pickerCustom3"
				:name="formName0"
				required
				variableName="custom_2"
				title="经营类别"
				:steps="steps2"
				linkage
				linkageNum="3"
				pickerTitle="picker-custom"
			/>

			<QSInput
				:name="formName0"
				variableName="idcard"
				required
				inputType="idcard"
				layout="row"
				titleLayout="left"
				title="商户名称"
				v-model="form0.idcard"
			></QSInput>

			<QSInput
				:name="formName0"
				variableName="idcard"
				required
				inputType="idcard"
				layout="row"
				titleLayout="left"
				title="注册地址"
				v-model="form0.idcard"
			></QSInput>

			<QSCheckbox
				:name="formName0"
				required
				variableName="checkbox"
				layout="column"
				title="售卖商品场景"
				v-model="form.checkbox"
				:itemArray="checkbox_itemArray"
			></QSCheckbox>

			<QSInput
				:name="formName0"
				variableName="idcard"
				required
				inputType="idcard"
				layout="row"
				titleLayout="left"
				title="客服电话"
				v-model="form0.idcard"
			></QSInput>

			<QSPics :name="formName0" required variableName="pic_shops" title="特殊资质" v-model="form0.pic_shops"></QSPics>

			<QSPics :name="formName0" required variableName="pic_shops" title="补充材料" v-model="form0.pic_shops"></QSPics>

			<QSWavesButton btnStyle="margin:50rpx 10px;" :wavesColor="'rgba(47, 133, 252,0.6)'" @click="getStep0">
				下一步
			</QSWavesButton>
		</block>

		<block v-if="stepActive == 1">
			<QSPics
				:name="formName1"
				required
				layout="column"
				variableName="pic"
				title="请上传经营者银行卡"
				v-model="form1.pic"
			></QSPics>

			<QSPickerCustom
				:name="formName1"
				required
				layout="row"
				titleLayout="left"
				variableName="pickerType"
				title="开户总行银行"
			/>

			<QSInput
				:name="formName1"
				required
				variableName="name"
				title="开户名称"
				layout="row"
				titleLayout="left"
				v-model="form1.name"
			></QSInput>

			<QSInput
				:name="formName1"
				required
				variableName="account"
				title="开户账号"
				layout="row"
				titleLayout="left"
				v-model="form1.account"
			></QSInput>

			<QSWavesButton btnStyle="margin:50rpx 10px;" :wavesColor="'rgba(47, 133, 252,0.6)'" @click="getStep1">
				下一步
			</QSWavesButton>
		</block>

		<block v-if="stepActive == 2">
			<QSPics
				:name="formName2"
				required
				layout="column"
				variableName="pic"
				title="请上传店门头照片"
				v-model="form2.pic"
			></QSPics>

			<QSPics
				:name="formName2"
				required
				layout="column"
				variableName="pic"
				title="请上传店内环境照片"
				v-model="form2.pic"
			></QSPics>

			<QSPickerCity :name="formName2" variableName="city" title="经营省市区" :value="form2.city" placherhold="请选择" />

			<QSInput
				:name="formName2"
				required
				variableName="registrAddress"
				title="经营地址"
				layout="row"
				titleLayout="left"
				v-model="form2.registrAddress"
			></QSInput>

			<QSInput
				:name="formName2"
				required
				variableName="registrAddress"
				title="联系人"
				layout="row"
				titleLayout="left"
				v-model="form2.registrAddress"
			></QSInput>

			<QSInput
				:name="formName2"
				required
				variableName="registrAddress"
				title="手机号码"
				layout="row"
				titleLayout="left"
				v-model="form2.registrAddress"
			></QSInput>

			<QSInput
				:name="formName2"
				required
				variableName="registrAddress"
				title="常用邮箱"
				layout="row"
				titleLayout="left"
				v-model="form2.registrAddress"
			></QSInput>

			<QSInput
				:name="formName2"
				required
				variableName="registrAddress"
				title="客服电话"
				layout="row"
				titleLayout="left"
				v-model="form2.registrAddress"
			></QSInput>

			<QSInput
				:name="formName2"
				required
				variableName="registrAddress"
				title="用户简称"
				layout="row"
				titleLayout="left"
				v-model="form2.registrAddress"
			></QSInput>

			<QSWavesButton btnStyle="margin:50rpx 10px;" :wavesColor="'rgba(47, 133, 252,0.6)'" @click="getStep1">
				提交注册
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
import { getShopsType } from '@/api/agent';

export default {
	components: {
		uniSteps,
		uniIcons,
		uniNavBar
	},
	data() {
		return {
			shopOptions: {},
			checkbox_itemArray: [
				{
					name: '线下',
					value: '哈利波特',
					color: '#f5105c'
				},
				{
					name: '公众号',
					value: '魔戒',
					color: '#888'
				},
				{
					name: '小程序',
					value: '玩具总动员'
				},
				{
					name: '网站',
					value: '硬核亨利'
				},
				{
					name: 'APP',
					value: '硬核亨利'
				}
			],

			stepActive: 0,
			stepList: [
				{
					title: '经营信息'
				},
				{
					title: '商户信息'
				},
				{
					title: '结算账户'
				},
				{
					title: '组织机构'
				}
			],

			//商铺数据
			formName0: 'step0',
			fromValue0: {
				legal: '',
				mobileNo: '',
				email: '',
				shortername: ''
			},
			steps2: {
				step_1_value: 'value_1',
				step_2_value: 'value_2',
				step_2_item: 'item_2',
				step_3_item: 'item_3'
			},

			form0: {
				pics_id: [{ title: '正面' }, { title: '反面' }],
				name: '',
				idcard: '',
				phone: '',
				startData: '',
				endData: '',
				pic_shops: [{ title: '正面' }],
				registrId: '',
				registrName: '',
				registrOperator: '',
				registrAddress: '',
				registrStartData: '',
				registrEndData: ''
			},

			//结算数据
			formName1: 'step1',
			form1: {
				pic: [{ title: '正面' }]
			},

			//基本信息
			formName2: 'step2',
			form2: {
				pic: [{ title: '正面' }]
			}
		};
	},
	props: {},

	onLoad() {
		this.setPickerData();
		this.setShopsType()
	},

	computed: {
		barText() {
			if (this.stepActive == 1 || this.stepActive == 2) {
				return '上一步';
			} else {
				return '';
			}
		}
	},
	methods: {
		setShopsType(){
			getShopsType().then(data => {
				this.shopOptions = data;
			});
		},
		
		setPickerData() {
			const data3 = [
				{
					value_1: '浙江', //value_1变量名需与下方steps.step_1_value相同
					item_2: [
						{
							//item_2变量名需与下方steps.step_2_item相同
							value_2: '金华', //value_2变量名需与下方steps.step_2_value相同
							/*
						可添加多项自定义想要的数据
						*/
							item_3: ['婺城区'] //item_3变量名需与下方steps.step_3_item相同
						},
						{
							value_2: '绍兴',
							item_3: ['越城区']
						}
					]
				},
				{
					value_1: '江苏',
					item_2: [
						{
							value_2: '南京',
							item_3: ['玄武区']
						},
						{
							value_2: '无锡',
							item_3: ['锡山区']
						}
					]
				}
			];

			this.setPickerDataFc('pickerCustom3', data3);
		},

		setPickerDataFc(name, data) {
			this.$refs[name].setData(data);
		},

		/**
		 * 返回
		 */
		onBack() {
			util.gotoPage('back');
		},

		/**
		 * 上一步
		 */
		onStep() {
			this.stepActive -= 1;
		},

		/**
		 * 注册第一步
		 */
		getStep0() {
			QSApp.getForm(this.formName0)
				.then(res => {
					console.log(res);
					// uni.showToast({
					// 	title: '获取表单数据成功'
					// });
					// console.log(res.data);
					// this.stepActive = 1;
				})
				.catch(err => {
					uni.showToast({
						title: '获取表单数据失败'
					});
					console.log(`获取表单数据失败: ${JSON.stringify(err)}`);
				});
		},

		/**
		 * 注册第二步
		 */
		getStep1() {
			this.stepActive = 2;
		}
	}
};
</script>

<style lang="scss">
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
</style>
