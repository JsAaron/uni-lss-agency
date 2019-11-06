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
			<view class="type-title">可上传照片图片识别</view>

			<QSPics
				layout="column"
				:name="formName0"
				variableName="pics_id"
				title="请上传身份证照片"
				v-model="form0.pics_id"
			></QSPics>

			<QSInput
				:name="formName0"
				variableName="name"
				title="姓名"
				required
				layout="row"
				titleLayout="left"
				v-model="form0.name"
			></QSInput>

			<QSInput
				:name="formName0"
				variableName="idcard"
				required
				inputType="idcard"
				layout="row"
				titleLayout="left"
				title="身份证号码"
				v-model="form0.idcard"
			></QSInput>

			<QSPickerDate
				:name="formName0"
				variableName="startData"
				required
				layout="row"
				titleLayout="left"
				title="身份证有效期开始"
				v-model="form0.startData"
				placherhold="请选择"
			/>

			<QSPickerDate
				:name="formName0"
				variableName="endData"
				required
				layout="row"
				titleLayout="left"
				title="身份证有效期结束"
				v-model="form0.endData"
				placherhold="请选择"
			/>

			<QSInput
				:name="formName0"
				variableName="phone"
				required
				layout="row"
				titleLayout="left"
				title="法人手机号"
				inputType="digit"
				v-model="form0.phone"
			></QSInput>

			<view class="type-title">营业执照(小微商户请忽略)</view>

			<QSPics
				:name="formName0"
				layout="column"
				required
				variableName="pic_shops"
				title="请上传店铺营业执照"
				v-model="form0.pic_shops"
			></QSPics>

			<QSInput
				:name="formName0"
				required
				variableName="registrId"
				title="注册号"
				layout="row"
				titleLayout="left"
				v-model="form0.registrId"
			></QSInput>

			<QSInput
				:name="formName0"
				required
				variableName="registrName"
				title="名称"
				layout="row"
				titleLayout="left"
				v-model="form0.registrName"
			></QSInput>

			<QSPickerCustom
				:name="formName0"
				ref="pickerType"
				required
				layout="row"
				titleLayout="left"
				variableName="pickerType"
				title="类型"
			/>

			<QSInput
				:name="formName0"
				required
				variableName="registrAddress"
				title="地址"
				layout="row"
				titleLayout="left"
				v-model="form0.registrAddress"
			></QSInput>

			<QSInput
				:name="formName0"
				required
				layout="column"
				variableName="registrOperator"
				title="法定代表人/经营者"
				contentLayout="center"
				v-model="form0.registrOperator"
			></QSInput>

			<QSPickerDate
				:name="formName0"
				required
				variableName="startData"
				layout="row"
				titleLayout="left"
				title="营业期限开始"
				v-model="form0.registrStartData"
				placherhold="请选择"
			/>

			<QSPickerDate
				:name="formName0"
				required
				variableName="startData"
				layout="row"
				titleLayout="left"
				title="营业期限结束"
				v-model="form0.registrEndData"
				placherhold="请选择"
			/>

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

			<QSPickerCity
				:name="formName2"
				variableName="city"
				title="经营省市区"
				:value="form2.city"
				placherhold="请选择"
			/>

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

export default {
	components: {
		uniSteps,
		uniIcons,
		uniNavBar
	},
	data() {
		return {
			stepActive: 0,
			stepList: [
				{
					title: '商户信息'
				},
				{
					title: '结算信息'
				},
				{
					title: '基本信息'
				}
			],

			//商铺数据
			formName0: 'step0',
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

	onReady() {
		this.setPickerDataFc('pickerType', [['企业', '个体商户']]);
	},

	created() {},
	onLoad() {},
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
		setPickerDataFc(name, data) {
			this.$refs[name].setData(data);
		},

		/**
		 * 返回
		 */
		onBack() {
			util.gotoPage('back')
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
					uni.showToast({
						title: '获取表单数据成功'
					});
					console.log(res.data);
					this.stepActive = 1;
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
	background-color: rgb(248, 249, 253);
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
