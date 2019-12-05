<template>
	<view class="container">
		<message ref="Message"></message>
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

			<QSInput
				:name="formName0"
				variableName="legal"
				ref="ref_legal"
				title="联系人姓名"
				required
				v-model="fromValue0.legal"
			></QSInput>

			<QSInput
				:name="formName0"
				variableName="mobileNo"
				ref="ref_mobileNo"
				required
				verifyType="Tel"
				inputType="number"
				title="手机号码"
				v-model="fromValue0.mobileNo"
			></QSInput>

			<QSInput
				:name="formName0"
				variableName="email"
				ref="ref_email"
				required
				title="常用邮箱"
				verifyType="Email"
				v-model="fromValue0.email"
			></QSInput>

			<view class="type-title">经营信息</view>
			<QSInput
				:name="formName0"
				variableName="shortername"
				ref="ref_shortername"
				required
				title="商户简称"
				v-model="fromValue0.shortername"
			></QSInput>

			<QSPickerCustom
				:name="formName0"
				variableName="picker1"
				ref="ref_picker1"
				required
				:steps="fromValue0.steps"
				v-model="fromValue0.picker1"
				title="一级经营类型"
			/>
			<QSPickerCustom
				:name="formName0"
				variableName="picker2"
				ref="ref_picker2"
				:steps="fromValue0.steps"
				@change="onPickerType2"
				required
				autoHide
				v-model="fromValue0.picker2"
				title="二级经营类型"
			/>
			<QSPickerCustom
				:name="formName0"
				variableName="picker3"
				ref="ref_picker3"
				:steps="fromValue0.steps"
				@change="onPickerType3"
				required
				v-model="fromValue0.picker3"
				title="三级经营类型"
			/>

			<QSInput
				:name="formName0"
				variableName="agentname"
				ref="ref_agentname"
				required
				title="商户名称"
				v-model="fromValue0.agentname"
			></QSInput>

			<QSInput
				:name="formName0"
				variableName="compaddress"
				ref="ref_compaddress"
				required
				titleLayout="left"
				title="注册地址"
				v-model="fromValue0.compaddress"
			></QSInput>

			<QSCheckbox
				:name="formName0"
				variableName="checkbox"
				required
				layout="column"
				title="售卖商品场景"
				v-model="fromValue0.checkbox"
				:itemArray="fromValue0.itemArray"
			></QSCheckbox>

			<QSInput
				:name="formName0"
				variableName="shop_tel"
				ref="ref_shop_tel"
				required
				title="客服电话"
				v-model="fromValue0.shop_tel"
			></QSInput>

			<!-- 			<QSPics :name="formName0" required variableName="pic_shops" title="特殊资质" v-model="form0.pic_shops"></QSPics>
			<QSPics :name="formName0" required variableName="pic_shops" title="补充材料" v-model="form0.pic_shops"></QSPics> -->
			<QSWavesButton btnStyle="margin:50rpx 10px;" :wavesColor="'rgba(47, 133, 252,0.6)'" @click="getStep0">
				下一步
			</QSWavesButton>
		</block>

		<block v-if="stepActive == 1">
			<QSWavesButton btnStyle="margin:50rpx 10px;" :wavesColor="'rgba(47, 133, 252,0.6)'" @click="getStep1">
				下一步
			</QSWavesButton>
		</block>

		<block v-if="stepActive == 2">
			<QSWavesButton btnStyle="margin:50rpx 10px;" :wavesColor="'rgba(47, 133, 252,0.6)'" @click="getStep1">
				提交注册
			</QSWavesButton>
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
			// ============ 步骤条 ==============
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

			// ============ 经营信息 ==============
			formName0: 'step0',
			fromValue0: {
				legal: '',
				mobileNo: '',
				email: '',
				shortername: '',
				picker1: '',
				picker2: '',
				picker3: '',
				agentname: '',
				compaddress: '',
				checkbox: [1],
				itemArray: [
					{
						name: '线下',
						value: 1
					},
					{
						name: '公众号',
						value: 2
					},
					{
						name: '小程序',
						value: 3
					},
					{
						name: '网站',
						value: 4
					},
					{
						name: 'APP',
						value: 5
					}
				],
				shop_tel: '',
				steps: {
					step_1_value: 'name'
				}
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
		this.initPickerData();
		this.setIntputValueFc('ref_legal', this.options.legal);
		this.setIntputValueFc('ref_mobileNo', this.options.mobileNo);
		this.setIntputValueFc('ref_email', this.options.email);
		this.setIntputValueFc('ref_shortername', this.options.shortername);
		this.setIntputValueFc('ref_agentname', this.options.agentname);
		this.setIntputValueFc('ref_compaddress', this.options.compaddress);
		this.setIntputValueFc('ref_shop_tel', this.options.shop_tel);
	},

	computed: {
		barText() {
			if (this.stepActive == 1 || this.stepActive == 2 || this.stepActive == 3) {
				return '上一步';
			} else {
				return '';
			}
		}
	},
	methods: {
		onPickerType1(data) {
			// let item = data.data[0].item;
			// this.fromValue0.picker1 = item;
			// this.fromValue0.picker2.typename = '请选择';
			// this.fromValue0.picker3.typename = '请选择';
			// this.updateTwoType(item.typeid);
		},

		onPickerType2(data) {
			// this.fromValue0.picker2 = data.data[0].item;
			// this.fromValue0.picker3 = {
			// 	typename: '请选择'
			// };
			// this.updateThreeType(this.fromValue0.picker2.typeid);
		},

		onPickerType3(data) {
			// this.fromValue0.picker3 = data.data[0].item;
		},

		setIntputValueFc(name, data) {
			this.$refs[name].setValue(data);
		},

		setPickerDataFc(name, data) {
			this.$refs[name].setData(data);
		},

		//类型一
		updateOneType(one_type) {
			getShopsType().then(data => {
				let arr = [];
				data.map(item => {
					if (item.typeid == one_type) {
						this.$refs['ref_picker1'].confirm({
							data: [
								{
									name: item.typename,
									value: item
								}
							]
						});
					}
					arr.push({
						name: item.typename,
						value: item
					});
				});
				this.setPickerDataFc('ref_picker1', [arr]);
			});
		},

		// 更新二级类型
		updateTwoType(one_type, two_type) {
			getShopsType({
				type: 'twotype',
				typeid: one_type
			}).then(data => {
				let arr = [];
				data.map(item => {
					if (two_type && item.typeid == two_type) {
						this.$refs['ref_picker2'].confirm({
							data: [
								{
									name: item.typename,
									value: item
								}
							]
						});
					}
					arr.push({
						name: item.typename,
						item: item
					});
				});
				this.setPickerDataFc('ref_picker2', [arr]);
			});
		},

		// 更新三级
		updateThreeType(two_type, three_type) {
			getShopsType({
				type: 'threetype',
				typeid: two_type
			}).then(data => {
				let arr = [];
				data.map(item => {
					if (three_type && item.typeid == three_type) {
						this.$refs['ref_picker3'].confirm({
							data: [
								{
									name: item.typename,
									value: item
								}
							]
						});
					}
					arr.push({
						name: item.typename,
						item: item
					});
				});
				this.setPickerDataFc('ref_picker3', [arr]);
			});
		},

		initPickerData() {
			// 类型一
			if (this.options.one_type) {
				this.updateOneType(this.options.one_type);
			}
			//类型二
			if (this.options.two_type) {
				this.updateTwoType(this.options.one_type, this.options.two_type);
			}
			// 类型三
			if (this.options.three_type) {
				this.updateThreeType(this.options.two_type, this.options.three_type);
			}
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

					if (res.verifyErr.length > 0) {
						this.$refs['Message'].error(res.verifyErr[0].title + ' 错误');
						return;
					}
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
.container {
	// height: 100%;
	background-color: #fff;
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
