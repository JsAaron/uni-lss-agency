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
			:title="title"
			color="#ffffff"
			@click-left="onBackPage"
			@click-right="onPrevStep"
		/>

		<block v-if="stepActive == 0">
			<view class="type-title">可上传照片进行资料识别</view>

			<QSPics
				:name="formName0"
				variableName="idcards_front"
				ref="ref_idcards_front"
				customId="typein"
				required
				title="证件扫描件"
				v-model="fromValue0.idcards_front"
			></QSPics>

			<QSPics
				:name="formName0"
				variableName="idcards_back"
				ref="ref_idcards_back"
				customId="typein"
				required
				title="证件扫描件反面"
				v-model="fromValue0.idcards_back"
			></QSPics>

			<view class="type-title">联系信息</view>

			<QSInput
				:name="formName0"
				variableName="legal"
				ref="ref_legal"
				title="姓名"
				required
				v-model="fromValue0.legal"
			></QSInput>

			<QSInput
				:name="formName0"
				variableName="identification_number"
				ref="ref_identification_number"
				title="身份证号码"
				required
				v-model="fromValue0.identification_number"
			></QSInput>

			<QSPickerDate
				:name="formName0"
				:dataSet="fromValue0.dataSet"
				variableName="identification_start"
				ref="ref_identification_start"
				title="证件有效期开始"
				v-model="fromValue0.identification_start"
				placherhold="请选择"
				required
			/>

			<QSPickerDate
				:name="formName0"
				variableName="identification_end"
				:dataSet="fromValue0.dataSet"
				ref="ref_identification_end"
				title="证件有效期结束"
				v-model="fromValue0.identification_end"
				placherhold="请选择"
				required
			/>

			<QSInput
				:name="formName0"
				variableName="mobileNo"
				ref="ref_mobileNo"
				required
				verifyType="Tel"
				inputType="number"
				title="法人手机号"
				v-model="fromValue0.mobileNo"
			></QSInput>

			<QSPics
				:name="formName0"
				variableName="business_img"
				ref="ref_business_img"
				customId="typein"
				title="营业执照"
				v-model="fromValue0.business_img"
			></QSPics>

			<QSInput
				:name="formName0"
				variableName="business_number"
				ref="ref_business_number"
				title="注册号"
				verifyType="Number"
				required
				v-model="fromValue0.business_number"
			></QSInput>

			<QSInput
				:name="formName0"
				variableName="agentname"
				ref="ref_agentname"
				required
				title="名称"
				v-model="fromValue0.agentname"
			></QSInput>

			<QSPickerCustom
				:name="formName0"
				variableName="one_type"
				ref="ref_one_type"
				required
				:steps="fromValue0.steps"
				v-model="fromValue0.one_type"
				title="经营类型"
			/>

			<QSInput
				:name="formName0"
				variableName="compaddress"
				ref="ref_compaddress"
				required
				titleLayout="left"
				title="地址"
				v-model="fromValue0.compaddress"
			></QSInput>

			<QSInput
				:name="formName0"
				variableName="holder_name"
				ref="ref_holder_name"
				title="法定代表人/经营者"
				required
				v-model="fromValue0.holder_name"
			></QSInput>

			<QSPickerDate
				:name="formName0"
				dateFormatArray="-"
				variableName="contractstdate"
				:dataSet="fromValue0.dataSet"
				ref="ref_contractstdate"
				title="营业期限开始"
				v-model="fromValue0.contractstdate"
				placherhold="请选择"
				required
			/>

			<QSPickerDate
				:name="formName0"
				variableName="contractendate"
				ref="ref_contractendate"
				:dataSet="fromValue0.dataSet"
				title="营业期限结束"
				:value="dateValue"
				v-model="fromValue0.contractendate"
				placherhold="请选择"
				required
			/>

			<WButton
				text="下一步"
				:rotate="fromValue0.isRotate"
				@click.native="getStep0()"
				bgColor="rgb(47, 133, 252)"
			></WButton>
		</block>

		<block v-if="stepActive == 1">
			<view class="type-title">结算信息</view>

			<QSPics
				:name="formName1"
				variableName="industry_license"
				ref="ref_industry_license"
				customId="typein"
				required
				title="请上传经营者银行卡"
				v-model="fromValue1.industry_license"
			></QSPics>

			<QSInput
				:name="formName1"
				variableName="deposit_bank"
				ref="ref_deposit_bank"
				title="开户总行银行"
				required
				v-model="fromValue1.deposit_bank"
			></QSInput>

			<QSInput
				:name="formName1"
				variableName="account_city"
				ref="ref_account_city"
				title="开户支行城市"
				required
				v-model="fromValue1.account_city"
			></QSInput>

			<QSInput
				:name="formName1"
				variableName="bank_branch"
				ref="ref_bank_branch"
				title="开户行所在支行"
				required
				v-model="fromValue1.bank_branch"
			></QSInput>

			<QSInput
				:name="formName1"
				variableName="account_name"
				ref="ref_account_name"
				title="开户名称"
				required
				v-model="fromValue1.account_name"
			></QSInput>

			<QSInput
				:name="formName1"
				variableName="bank_account"
				ref="ref_bank_account"
				title="开户账号"
				required
				v-model="fromValue1.bank_account"
			></QSInput>

			<view class="type-title">基本信息</view>

			<QSPics
				:name="formName1"
				variableName="agent_face"
				ref="ref_agent_face"
				customId="typein"
				required
				title="店铺门头照"
				v-model="fromValue1.agent_face"
			></QSPics>

			<QSPics
				:name="formName1"
				variableName="agent_shop"
				ref="ref_agent_shop"
				customId="typein"
				required
				title="店内环境照片"
				v-model="fromValue1.agent_shop"
			></QSPics>

			<QSPickerCustom
				:name="formName1"
				variableName="prov_cd"
				ref="ref_prov_cd"
				required
				:steps="fromValue1.steps"
				v-model="fromValue1.prov_cd"
				@change="onChangeProv"
				title="省"
			/>

			<QSPickerCustom
				:name="formName1"
				variableName="city"
				ref="ref_city"
				:steps="fromValue1.steps"
				v-model="fromValue1.city"
				title="市"
				@change="onChangeCity"
			/>

			<QSPickerCustom
				:name="formName1"
				variableName="areaid"
				ref="ref_areaid"
				:steps="fromValue1.steps"
				v-model="fromValue1.areaid"
				title="区"
			/>

			<QSInput
				:name="formName1"
				variableName="compaddress"
				ref="ref_compaddress"
				required
				titleLayout="left"
				title="经营地址"
				v-model="fromValue1.compaddress"
			></QSInput>

			<QSInput
				:name="formName1"
				variableName="legal"
				ref="ref_legal"
				required
				titleLayout="left"
				title="联系人"
				v-model="fromValue1.legal"
			></QSInput>

			<QSInput
				:name="formName1"
				variableName="mobileNo"
				ref="ref_mobileNo"
				required
				titleLayout="left"
				title="手机号码"
				v-model="fromValue1.mobileNo"
			></QSInput>

			<QSInput
				:name="formName1"
				variableName="email"
				ref="ref_email"
				required
				title="常用邮箱"
				verifyType="Email"
				v-model="fromValue1.email"
			></QSInput>

			<QSInput
				:name="formName1"
				variableName="shop_tel"
				ref="ref_shop_tel"
				required
				title="客服手机"
				verifyType="Tel"
				v-model="fromValue1.shop_tel"
			></QSInput>

			<QSInput
				:name="formName1"
				variableName="shortername"
				ref="ref_shortername"
				required
				title="商户简称"
				v-model="fromValue1.shortername"
			></QSInput>

			<WButton
				text="下一步"
				:rotate="fromValue1.isRotate"
				@click.native="getStep1()"
				bgColor="rgb(47, 133, 252)"
			></WButton>
		</block>

		<block v-if="stepActive == 2">
			<view class="type-title">随行付通道</view>

			<QSPickerCustom
				:name="formName2"
				variableName="jy_lm_sxf"
				ref="ref_jy_lm_sxf"
				v-model="fromValue2.jy_lm_sxf"
				title="经营类目"
			/>

			<view class="step2-row">
				<view class="step2-title">费率(%)</view>
				<uni-number-box
					:min="0"
					:max="100"
					:step="1"
					:value="fromValue2.rate_sxf"
					@change="onchange_rate_sxf"
				/>
			</view>

			<view class="type-title">微信官方通道</view>

			<QSPickerCustom
				:name="formName2"
				variableName="business_description"
				ref="ref_business_description"
				v-model="fromValue2.business_description"
				title="经营描述"
			/>

			<QSPickerCustom
				:name="formName2"
				variableName="business_sector"
				ref="ref_business_sector"
				v-model="fromValue2.business_sector"
				title="经营行业"
			/>

			<QSPics
				:name="formName2"
				variableName="special_qualification"
				ref="ref_special_qualification"
				customId="typein"
				title="特殊资质"
				v-model="fromValue2.special_qualification"
			></QSPics>

			<view class="type-title">支付宝</view>

			<QSInput
				:name="formName2"
				variableName="alipay_account"
				ref="ref_alipay_account"
				title="商家支付宝账号"
				v-model="fromValue2.alipay_account"
			></QSInput>

			<view class="type-title">银盛通道</view>

			<QSPickerCustom
				:name="formName2"
				variableName="jy_lm_ys"
				ref="ref_jy_lm_ys"
				v-model="fromValue2.jy_lm_ys"
				title="经营类目"
			/>

			<view class="step2-row">
				<view class="step2-title">结算费率(%)</view>
				<uni-number-box
					:min="0"
					:max="100"
					:step="1"
					:value="fromValue2.rate_ys"
					@change="onchange_rate_ys"
				/>
			</view>

			<QSPics
				:name="formName2"
				variableName="merchant_agreement"
				ref="ref_merchant_agreement"
				customId="typein"
				title="商家协议"
				v-model="fromValue2.merchant_agreement"
			></QSPics>

			<WButton
				v-if="submit_success"
				text="完成"
				@click.native="onBackPage"
				bgColor="rgb(47, 133, 252)"
			></WButton>
			<WButton
				v-else
				text="下一步"
				:rotate="fromValue2.isRotate"
				@click.native="getStep2()"
				bgColor="rgb(47, 133, 252)"
			></WButton>
		</block>
	</view>
</template>

<script>
import { gotoPage } from '@/utils';
import QSApp from '@/components/QS-inputs-split/js/app.js';
import uniSteps from '@/components/uni-steps/uni-steps.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
import {
	getProvcd,
	getPerfectAgent,
	getShopsType,
	saveAgentNewJjOne,
	saveAgentNewJjTwo,
	saveAgentNewJjThree
} from '@/api/agent';

export default {
	components: {
		uniSteps,
		uniIcons,
		uniNavBar,
		uniNumberBox
	},
	data() {
		return {
			title: '',
			agentid: '',
			stepActive: 0,
			agentData: {},
			typeOptions: {},
			submit_success: false,

			// ============ 经营信息 ==============
			formName0: 'step0',
			fromValue0: {
				isRotate: false,
				steps: {
					step_1_value: 'name'
				},
				idcards_front: [{ required: true, path: '' }],
				idcards_back: [{ required: true, path: '' }],
				legal: '',
				identification_number: '',
				identification_start: '',
				identification_end: '',
				mobileNo: '',
				business_img: [{ required: true, path: '' }],
				business_number: '',
				agentname: '',
				one_type: '',
				compaddress: '',
				holder_name: '',
				contractstdate: '',
				contractendate: ''
			},

			// ============ 结算 ==============
			formName1: 'step1',
			fromValue1: {
				isRotate: false,
				steps: {
					step_1_value: 'name'
				},
				industry_license: [{ required: true, path: '' }],
				deposit_bank: '',
				account_city: '',
				bank_branch: '',
				account_name: '',
				bank_account: '',
				agent_face: [{ required: true, path: '' }],
				agent_shop: [{ required: true, path: '' }],
				prov_cd: '',
				city: '',
				areaid: '',
				compaddress: '',
				legal: '',
				mobileNo: '',
				email: '',
				shop_tel: '',
				shortername: ''
			},

			// ============ 随行付通道 ==============
			formName2: 'step2',
			fromValue2: {
				isRotate: false,
				jy_lm_sxf: '',
				zfb_num_fy: '',
				business_description: '',
				business_sector: '',
				special_qualification: [{ required: true, path: '' }],
				alipay_account: '',
				jy_lm_ys: '',
				rate_sxf: '',
				rate_ys: '',
				merchant_agreement: [{ required: true, path: '' }]
			}
		};
	},

	onLoad(options) {
		this.agentid = options.agentid;
		this.title = `录入资料(${options.agentname})`;
	},

	onReady() {
		this.initData();
	},

	computed: {
		barText() {
			if (this.submit_success) {
				return '';
			}
			if (this.stepActive != 0) {
				return '上一步';
			}
			return '';
		}
	},
	methods: {
		initData() {
			getPerfectAgent({
				agentid: this.agentid
			}).then(data => {
				// console.log('data', data);
				this.agentData = data;
				this.initData0();
			});
		},

		onBackPage() {
			if (this.submit_success) {
				uni.navigateBack({
					delta: 2
				});
			} else {
				gotoPage('back');
			}
		},

		setIntputValueFc(name, data) {
			this.$refs[name].setValue(data);
		},

		setInputDataFc(name, data) {
			this.$refs[name].setData(data);
		},

		hasUserValue(data) {
			if (data && data != null && data != 'null') {
				return true;
			}
			return false;
		},

		/**
		 * 获取上传图片的url
		 */
		getUploadUrl(key, data) {
			//如果没有任何图片
			let upLoadResult = data[key][0].upLoadResult;
			if (!upLoadResult) {
				return '';
			}

			//只允许一个/开头
			function splits(url) {
				if (!url) {
					return '';
				}
				let path = url.split('tgimg')[1];
				return '/tgimg' + path;
			}

			//是新上传
			if (upLoadResult.length > 0) {
				let data1 = JSON.parse(upLoadResult[1].data);
				return splits(data1.url);
			} else {
				//已存在
				return splits(upLoadResult.data);
			}
		},

		onPrevStep() {
			if (this.submit_success) {
				return;
			}
			this.stepActive -= 1;
			setTimeout(() => {
				this[`initData${this.stepActive}`]();
			}, 0);
		},

		onNextStep() {
			this.stepActive += 1;
			setTimeout(() => {
				this[`initData${this.stepActive}`]();
			}, 0);
		},

		// =====================  第一步 =========================

		initData0() {
			let data = this.agentData;
			if (this.hasUserValue(data.idcards_front)) {
				this.setInputDataFc('ref_idcards_front', [
					{ required: true, path: 'https://img.facess.net/' + data.idcards_front }
				]);
			}
			if (this.hasUserValue(data.idcards_back)) {
				this.setInputDataFc('ref_idcards_back', [
					{ required: true, path: 'https://img.facess.net/' + data.idcards_back }
				]);
			}
			this.setIntputValueFc('ref_legal', data.legal);
			this.setIntputValueFc('ref_mobileNo', data.mobileNo);
			this.setIntputValueFc('ref_agentname', data.agentname);
			this.setIntputValueFc('ref_compaddress', data.compaddress);
			this.setIntputValueFc('ref_business_number', data.business_number);
			this.setIntputValueFc('ref_holder_name', data.holder_name);
			this.setIntputValueFc('ref_identification_number', data.identification_number);

			if (this.hasUserValue(data.contractstdate)) {
				this.$refs['ref_contractstdate'].confirm({
					data: data.contractstdate
				});
			}
			if (this.hasUserValue(data.contractendate)) {
				this.$refs['ref_contractendate'].confirm({
					data: data.contractendate
				});
			}

			if (this.hasUserValue(data.identification_start)) {
				this.$refs['ref_identification_start'].confirm({
					data: data.identification_start
				});
			}
			if (this.hasUserValue(data.identification_end)) {
				this.$refs['ref_identification_end'].confirm({
					data: data.identification_end
				});
			}

			if (this.hasUserValue(data.business_img)) {
				this.setInputDataFc('ref_business_img', [
					{ required: true, path: 'https://img.facess.net/' + data.business_img }
				]);
			}

			this.updateOneType(this.agentData.one_type);
		},

		updateOneType(one_type) {
			return getShopsType().then(data => {
				let arr = [];
				data.map(item => {
					if (item.typeid == one_type) {
						this.$refs['ref_one_type'].confirm({
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
				this.setInputDataFc('ref_one_type', [arr]);
			});
		},

		/**
		 * 注册第一步
		 */
		getStep0() {
			QSApp.getForm(this.formName0)
				.then(res => {
					if (res.verifyErr.length > 0) {
						this.$refs['Message'].error(res.verifyErr[0].title + '输入错误');
						return;
					}
					this.saveRequest0(res.data);
				})
				.catch(err => {
					console.log(`获取表单数据失败: ${JSON.stringify(err)}`);
				});
		},

		saveRequest0(data) {
			if (this.fromValue0.isRotate) {
				return;
			}
			this.fromValue0.isRotate = true;
			let query = {
				agentid: this.agentid,
				userId: this.agentData.userId,
				agentname: data.agentname,
				business_img: this.getUploadUrl('business_img', data),
				business_number: data.business_number,
				compaddress: data.compaddress,
				contractendate: data.contractendate.data,
				contractstdate: data.contractstdate.data,
				holder_name: data.holder_name,
				idcards_back: this.getUploadUrl('idcards_back', data),
				idcards_front: this.getUploadUrl('idcards_front', data),
				identification_start: data.identification_start.data,
				identification_end: data.identification_end.data,
				identification_number: data.identification_number,
				legal: data.legal,
				mobileNo: data.mobileNo,
				one_type: data.one_type.data[0].value.typeid
			};
			saveAgentNewJjOne(query)
				.then(data => {
					this.fromValue0.isRotate = false;
					this.onNextStep();
				})
				.catch(() => {
					this.fromValue0.isRotate = false;
				});
		},

		// =====================  第二步 =========================

		initData1() {
			let data = this.agentData;
			this.initRangeData();
			if (this.hasUserValue(data.industry_license)) {
				this.setInputDataFc('ref_industry_license', [
					{ required: true, path: 'https://img.facess.net/' + data.industry_license }
				]);
			}
			this.setIntputValueFc('ref_deposit_bank', data.deposit_bank);
			this.setIntputValueFc('ref_account_city', data.account_city);
			this.setIntputValueFc('ref_bank_branch', data.bank_branch);
			this.setIntputValueFc('ref_account_name', data.account_name);
			this.setIntputValueFc('ref_bank_account', data.bank_account);

			if (this.hasUserValue(data.agent_face)) {
				this.setInputDataFc('ref_agent_face', [
					{ required: true, path: 'https://img.facess.net/' + data.agent_face }
				]);
			}
			if (this.hasUserValue(data.agent_shop)) {
				this.setInputDataFc('ref_agent_shop', [
					{ required: true, path: 'https://img.facess.net/' + data.agent_shop }
				]);
			}

			this.setIntputValueFc('ref_compaddress', data.compaddress);
			this.setIntputValueFc('ref_legal', data.legal);
			this.setIntputValueFc('ref_mobileNo', data.mobileNo);
			this.setIntputValueFc('ref_email', data.email);
			this.setIntputValueFc('ref_shop_tel', data.shop_tel);
			this.setIntputValueFc('ref_shortername', data.shortername);
		},

		initRangeData() {
			this.updateProvType(this.agentData.proareaid).then(() => {
				this.updateCityType(this.agentData.proareaid, this.agentData.cityareaid).then(() => {
					this.updateAreaType(this.agentData.cityareaid, this.agentData.areaid);
				});
			});
		},

		onChangeProv(item) {
			if (this.fromValue1.provInit) {
				this.fromValue1.provInit = false;
				return;
			}
			this.updateCityType(item.data[0].value.areaid, '', true).then(() => {
				this.updateAreaType(this.fromValue1.city.data[0].value.areaid, '', true);
			});
		},

		onChangeCity(item) {
			if (this.fromValue1.cityInit) {
				this.fromValue1.cityInit = false;
				return;
			}
			this.updateAreaType(this.fromValue1.city.data[0].value.areaid, '', true);
		},

		// 省会
		updateProvType(proareaid, change) {
			return getProvcd().then(data => {
				let arr = [];
				data.map(item => {
					if (item.areaid == proareaid) {
						this.fromValue1.provInit = true;
						this.$refs['ref_prov_cd'].confirm({
							data: [
								{
									name: item.areaname,
									value: item
								}
							]
						});
					}
					arr.push({
						name: item.areaname,
						value: item
					});
				});
				this.setInputDataFc('ref_prov_cd', [arr]);
			});
		},

		// 市
		updateCityType(proareaid, cityareaid, change) {
			return getProvcd({
				type: 'city',
				areaid: proareaid
			}).then(data => {
				let arr = [];
				data.map(item => {
					if (item.areaid == cityareaid) {
						this.fromValue1.cityInit = true;
						this.$refs['ref_city'].confirm({
							data: [
								{
									name: item.areaname,
									value: item
								}
							]
						});
					}
					arr.push({
						name: item.areaname,
						value: item
					});
				});
				// 如果是改变的处理，默认赋第一个值
				if (change) {
					this.$refs['ref_city'].confirm({
						data: [arr[0]]
					});
				}
				this.setInputDataFc('ref_city', [arr]);
			});
		},

		// 区
		updateAreaType(cityareaid, areaid, change) {
			return getProvcd({
				type: 'area',
				areaid: cityareaid
			}).then(data => {
				let arr = [];
				data.map(item => {
					if (item.areaid == areaid) {
						this.$refs['ref_areaid'].confirm({
							data: [
								{
									name: item.areaname,
									value: item
								}
							]
						});
					}
					arr.push({
						name: item.areaname,
						value: item
					});
				});
				if (change) {
					this.$refs['ref_areaid'].confirm({
						data: [arr[0]]
					});
				}
				this.setInputDataFc('ref_areaid', [arr]);
			});
		},

		getStep1() {
			QSApp.getForm(this.formName1)
				.then(res => {
					if (res.verifyErr.length > 0) {
						this.$refs['Message'].error(res.verifyErr[0].title + '输入错误');
						return;
					}
					this.saveRequest1(res.data);
				})
				.catch(err => {
					console.log(`获取表单数据失败: ${JSON.stringify(err)}`);
				});
		},

		saveRequest1(data) {
			if (this.fromValue1.isRotate) {
				return;
			}
			this.fromValue1.isRotate = true;

			let query = {
				account_city: data.account_city,
				account_name: data.account_name,
				agent_face: this.getUploadUrl('agent_face', data),
				agent_shop: this.getUploadUrl('agent_shop', data),
				agentid: this.agentid,
				areaid: data.areaid.data ? data.areaid.data[0].value.areaid : '',
				bank_account: data.bank_account,
				bank_branch: data.bank_branch,
				city: data.city.data[0].value.areaid,
				compaddress: data.compaddress,
				deposit_bank: data.deposit_bank,
				email: data.email,
				industry_license: this.getUploadUrl('industry_license', data),
				legal: data.legal,
				mobileNo: data.mobileNo,
				prov_cd: data.prov_cd.data[0].value.areaid,
				shop_tel: data.shop_tel,
				shortername: data.shortername,
				userId: this.agentData.userId
			};

			saveAgentNewJjTwo(query)
				.then(data => {
					this.fromValue1.isRotate = false;
					this.onNextStep();
				})
				.catch(() => {
					this.fromValue1.isRotate = false;
				});
		},

		// =====================  第三步 =========================
		initData2() {
			let data = this.agentData;

			this.fromValue2.zfb_num_fy = data.zfb_num_fy;
			this.fromValue2.rate_ys = data.rate_ys;

			this.setInputDataFc('ref_jy_lm_sxf', [['公益类', '餐娱类', '民生类', '一般类']]);
			this.$refs['ref_jy_lm_sxf'].confirm({
				data: [data.jy_lm_sxf]
			});

			this.setInputDataFc('ref_business_description', [
				['餐饮', '线下零售', '居民生活服务', '休闲娱乐', '交通出行', '其他']
			]);
			this.$refs['ref_business_description'].confirm({
				data: [data.business_description]
			});

			this.setInputDataFc('ref_business_sector', [
				['餐饮', '加油', '食品生鲜', '游艺厅/KTV/网吧', '零售批发/生活娱乐/其他']
			]);
			this.$refs['ref_business_sector'].confirm({
				data: [data.business_sector]
			});

			if (this.hasUserValue(data.special_qualification)) {
				this.setInputDataFc('ref_special_qualification', [
					{ required: true, path: 'https://img.facess.net/' + data.special_qualification }
				]);
			}

			this.setIntputValueFc('ref_alipay_account', data.alipay_account);

			this.setInputDataFc('ref_jy_lm_ys', [
				[
					'零售业',
					'住宿、餐饮和休闲娱乐业',
					'居民服务与商业服务',
					'教育、卫生、福利及其他政府服务',
					'房地产与金融业'
				]
			]);
			this.$refs['ref_jy_lm_ys'].confirm({
				data: [data.jy_lm_ys]
			});

			if (this.hasUserValue(data.merchant_agreement)) {
				this.setInputDataFc('ref_merchant_agreement', [
					{ required: true, path: 'https://img.facess.net/' + data.merchant_agreement }
				]);
			}
		},

		onchange_rate_sxf(value) {
			this.fromValue2.rate_sxf = value;
		},

		onchange_rate_ys(value) {
			this.fromValue2.rate_ys = value;
		},

		getStep2(res) {
			QSApp.getForm(this.formName2)
				.then(res => {
					uni.showModal({
						content: '确认进件操作？',
						success: data => {
							if (data.confirm) {
								this.saveRequest2(res.data);
							}
						}
					});
				})
				.catch(err => {
					console.log(`获取表单数据失败: ${JSON.stringify(err)}`);
				});
		},

		saveRequest2(data) {
			if (this.fromValue2.isRotate) {
				return;
			}
			this.fromValue2.isRotate = true;
			let query = {
				agentid: this.agentid,
				jy_lm_sxf: data.jy_lm_sxf.data[0],
				rate_sxf: this.fromValue2.rate_sxf,
				business_description: data.business_description.data[0],
				business_sector: data.business_sector.data[0],
				special_qualification: this.getUploadUrl('special_qualification', data),
				alipay_account: data.alipay_account,
				jy_lm_ys: data.jy_lm_ys.data[0],
				rate_ys: this.fromValue2.rate_ys,
				merchant_agreement: this.getUploadUrl('merchant_agreement', data),
				userId: this.agentData.userId
			};

			saveAgentNewJjThree(query)
				.then(data => {
					this.fromValue1.isRotate = false;
					this.$refs['Message'].success('提交成功');
					this.submit_success = true;
					getApp().globalData.product = {
						action: 'update-entry'
					};
				})
				.catch(() => {
					this.fromValue1.isRotate = false;
				});
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
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

.step2-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 30rpx;
	font-size: 28rpx;
}

.step2-star {
	color: red;
	margin-right: 10rpx;
}
</style>
