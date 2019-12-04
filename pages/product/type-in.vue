<template>
	<view class="container">
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
			<QSInput ref="inputlegal" :name="formName0" variableName="legal" title="联系人姓名" required v-model="fromValue0.legal"></QSInput>
			<QSInput ref="inputmobileNo" :name="formName0" variableName="mobileNo" required verifyType="Tel" inputType="number" title="手机号码" v-model="fromValue0.mobileNo"></QSInput>
			<QSInput ref="inputemail" :name="formName0" variableName="email" required title="常用邮箱" verifyType="Email" v-model="fromValue0.email"></QSInput>

			<view class="type-title">经营信息</view>
			<QSInput ref="inputshortername" :name="formName0" variableName="shortername" required title="商户简称" v-model="fromValue0.shortername"></QSInput>
		
			<QSPickerCustom2
				ref="pickerType1"
				:steps="steps"
				:name="formName0"
				@change="onPickerType1"
				required
				variableName="pickerType1"
				v-model="fromValue0.picker1"
				title="一级经营类型"
			/>
			<QSPickerCustom2 ref="pickerType2" :steps="steps" :name="formName0" @change="onPickerType2" required variableName="pickerType2" title="二级经营类型" />
			<QSPickerCustom2 ref="pickerType3" :steps="steps" :name="formName0" @change="onPickerType3" required variableName="pickerType3" title="三级经营类型" />
			<QSInput :name="formName0" variableName="idcard" required inputType="idcard" layout="row" titleLayout="left" title="商户名称" v-model="form0.idcard"></QSInput>
			<QSInput :name="formName0" variableName="idcard" required inputType="idcard" layout="row" titleLayout="left" title="注册地址" v-model="form0.idcard"></QSInput>
			<QSCheckbox :name="formName0" required variableName="checkbox" layout="column" title="售卖商品场景" v-model="form.checkbox" :itemArray="checkbox_itemArray"></QSCheckbox>
			<QSInput :name="formName0" variableName="idcard" required inputType="idcard" layout="row" titleLayout="left" title="客服电话" v-model="form0.idcard"></QSInput>
			<QSPics :name="formName0" required variableName="pic_shops" title="特殊资质" v-model="form0.pic_shops"></QSPics>
			<QSPics :name="formName0" required variableName="pic_shops" title="补充材料" v-model="form0.pic_shops"></QSPics>
			<QSWavesButton btnStyle="margin:50rpx 10px;" :wavesColor="'rgba(47, 133, 252,0.6)'" @click="getStep0">下一步</QSWavesButton>
		</block>

		<block v-if="stepActive == 1">
			<QSPics :name="formName1" required layout="column" variableName="pic" title="请上传经营者银行卡" v-model="form1.pic"></QSPics>
			<QSPickerCustom :name="formName1" required layout="row" titleLayout="left" variableName="pickerType" title="开户总行银行" />
			<QSInput :name="formName1" required variableName="name" title="开户名称" layout="row" titleLayout="left" v-model="form1.name"></QSInput>
			<QSInput :name="formName1" required variableName="account" title="开户账号" layout="row" titleLayout="left" v-model="form1.account"></QSInput>
			<QSWavesButton btnStyle="margin:50rpx 10px;" :wavesColor="'rgba(47, 133, 252,0.6)'" @click="getStep1">下一步</QSWavesButton>
		</block>

		<block v-if="stepActive == 2">
			<QSPics :name="formName2" required layout="column" variableName="pic" title="请上传店门头照片" v-model="form2.pic"></QSPics>
			<QSPics :name="formName2" required layout="column" variableName="pic" title="请上传店内环境照片" v-model="form2.pic"></QSPics>
			<QSPickerCity :name="formName2" variableName="city" title="经营省市区" :value="form2.city" placherhold="请选择" />
			<QSInput :name="formName2" required variableName="registrAddress" title="经营地址" layout="row" titleLayout="left" v-model="form2.registrAddress"></QSInput>
			<QSInput :name="formName2" required variableName="registrAddress" title="联系人" layout="row" titleLayout="left" v-model="form2.registrAddress"></QSInput>
			<QSInput :name="formName2" required variableName="registrAddress" title="手机号码" layout="row" titleLayout="left" v-model="form2.registrAddress"></QSInput>
			<QSInput :name="formName2" required variableName="registrAddress" title="常用邮箱" layout="row" titleLayout="left" v-model="form2.registrAddress"></QSInput>
			<QSInput :name="formName2" required variableName="registrAddress" title="客服电话" layout="row" titleLayout="left" v-model="form2.registrAddress"></QSInput>
			<QSInput :name="formName2" required variableName="registrAddress" title="用户简称" layout="row" titleLayout="left" v-model="form2.registrAddress"></QSInput>
			<QSWavesButton btnStyle="margin:50rpx 10px;" :wavesColor="'rgba(47, 133, 252,0.6)'" @click="getStep1">提交注册</QSWavesButton>
		</block>
	</view>
</template>

<script>
import { gotoPage } from '@/utils';
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
					name: '线下'
				},
				{
					name: '公众号'
				},
				{
					name: '小程序'
				},
				{
					name: '网站'
				},
				{
					name: 'APP'
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
				shortername: '',
				picker1: ''
			},
			steps: {
				step_1_value: 'name'
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

	onLoad(options) {
		let data = {
			appid: '',
			city: '430200',
			mch_id: '',
			fws_type: '',
			sinaOpenId: '',
			is_sole: '',
			businessid_two: '',
			agentchanneltype: 1,
			roleId: '',
			gm_wx_agentid: '',
			three_type_name: '其他行业',
			agent_shop: '',
			prize_pz_id: '',
			municipal_agent: '',
			tjagentid: '70800072265439',
			sumAmt: 0,
			sub_mch_id: '',
			join_time: '',
			qy_agent: '',
			agenttype: 0,
			latitude: '',
			xt_id: '',
			accPasswd: '',
			freezeAmt: 0,
			user_level: '',
			shop_tel: '',
			type_agentid: '',
			tradingareaid: '',
			agent_face: '',
			face_device: '',
			is_signing: '',
			one_type_name: '个体工商户',
			lastLoginTime: null,
			create_times: '2019-11-25 13:58:42',
			qqOpenId: '',
			contractendate: '2021-03-31',
			areaid: '430203',
			idcards_back: '',
			identitynum: '',
			type_id: 0,
			businessid: '',
			three_type: '72',
			is_fws: '',
			usertypeId: 0,
			accessIp: '',
			prov_cd: '430000',
			mobileNo: '13997412928',
			contractno: '',
			areaname: '',
			two_type_name: '其他',
			roleName: '',
			type: '',
			password: '',
			agentlogo: '',
			pay_type: '',
			wx_appid: '',
			userId: 4149,
			avatarUrl: '',
			idcards_hand: '',
			province: '',
			userName: '凌轩服饰有限公司',
			actUrl: '',
			compaddress: '新天地服装大市场',
			longitude: '',
			openid: '',
			headimgurl: '',
			lm_agent: '',
			one_type: '1',
			isfact: 0,
			userCode: '13997412928',
			isAdd: '0',
			iszt: '',
			agentid: '70800072265440',
			salesman: '',
			industry_license: '',
			business_number: '',
			email: '',
			open_payment: '',
			legal: '颜金雨',
			desc_content: '',
			provincial_agent: '',
			sex: 0,
			zmImage: '',
			dl_type: '4',
			fws_agentid: '',
			is_signingimg: '',
			gm_wx_appid: '',
			contractstdate: '2019-11-25',
			app_auth_token: '',
			cashing: 0,
			packType: 0,
			qrcodeid: '',
			agentname: '凌轩服饰有限公司',
			qq_amt: 0,
			real_shop: '',
			two_type: '15',
			pass: '3',
			pagentid: '王小亮',
			wx_key: '',
			faceid: '',
			cityname: '',
			parts_no: '',
			idcards_front: '',
			disabled: 0,
			passName: '未开通'
		};
		this.options = data;
	},

	onReady() {
		this.setPickerData();
		this.setIntputValueFc('inputlegal', this.options.legal);
		this.setIntputValueFc('inputmobileNo', this.options.mobileNo);
		this.setIntputValueFc('inputemail', this.options.email);
		this.setIntputValueFc('inputshortername', this.options.shortername);
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
		onPickerType1(data) {
			console.log(data);
		},

		setIntputValueFc(name, data) {
			this.$refs[name].setValue(data);
		},

		setPickerDataFc(name, data) {
			this.$refs[name].setData(data);
		},

		setPickerData() {
			getShopsType().then(data => {
				this.shopOptions = data;
				let shopNames = [];
				data.map(item => {
					if (item.typeid == this.options.one_type) {
				
					}
					shopNames.push({
						name: item.typename,
						value: item.typeid
					});
				});
				this.setPickerDataFc('pickerType1', [shopNames]);
			});
		},
 
		/**
		 * 返回
		 */
		onBack() {
			gotoPage('back');
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
page,
.container {
	background-color: #fff;
	height: 100%;
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
</style>
