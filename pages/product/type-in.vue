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
				@change="onChangePicker1"
				title="一级经营类型"
			/>

			<QSPickerCustom
				:name="formName0"
				variableName="picker2"
				ref="ref_picker2"
				:steps="fromValue0.steps"
				@change="onChangePicker2"
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
				variableName="shop_scene"
				required
				ref="ref_shop_scene"
				layout="column"
				title="售卖商品场景"
				v-model="fromValue0.shop_scene"
				:itemArray="fromValue0.itemArray"
			></QSCheckbox>

			<QSInput
				:name="formName0"
				variableName="shop_tel"
				ref="ref_shop_tel"
				required
				title="客服电话"
				verifyType="Tel"
				v-model="fromValue0.shop_tel"
			></QSInput>

			<QSPics
				:name="formName0"
				variableName="pic_1"
				ref="ref_pic_1"
				customId="typein"
				required
				title="特殊资质"
				v-model="fromValue0.pic_1"
			></QSPics>

			<QSPics
				:name="formName0"
				variableName="pic_2"
				ref="ref_pic_2"
				customId="typein"
				required
				title="补充材料"
				v-model="fromValue0.pic_2"
			></QSPics>

			<WButton
				text="下一步"
				:rotate="fromValue0.isRotate"
				@click.native="getStep0()"
				bgColor="rgb(47, 133, 252)"
			></WButton>
		</block>

		<block v-if="stepActive == 1">
			<view class="type-title">经营信息</view>

			<QSInput
				:name="formName1"
				variableName="business_number"
				ref="ref_business_number"
				title="营业执照注册号"
				verifyType="Number"
				required
				v-model="fromValue1.business_number"
			></QSInput>

			<QSInput
				:name="formName1"
				variableName="business_scope"
				ref="ref_business_scope"
				title="经营范围"
				required
				v-model="fromValue1.business_scope"
			></QSInput>

			<QSPickerDate
				:name="formName1"
				dateFormatArray="-"
				variableName="contractstdate"
				:dataSet="fromValue1.dataSet"
				ref="ref_contractstdate"
				title="营业期限开始"
				v-model="fromValue1.contractstdate"
				placherhold="请选择"
			/>

			<QSPickerDate
				:name="formName1"
				variableName="contractendate"
				ref="ref_contractendate"
				:dataSet="fromValue1.dataSet"
				title="营业期限结束"
				:value="dateValue"
				v-model="fromValue1.contractendate"
				placherhold="请选择"
			/>

			<QSPics
				:name="formName1"
				variableName="business_img"
				ref="ref_business_img"
				customId="typein"
				required
				title="营业执照照片"
				v-model="fromValue1.business_img"
			></QSPics>

			<QSInput
				:name="formName1"
				variableName="business_license"
				ref="ref_business_license"
				title="营业执照注册名称"
				required
				v-model="fromValue1.business_license"
			></QSInput>

			<QSPickerCustom
				:name="formName1"
				variableName="prov_cd"
				ref="ref_prov_cd"
				required
				:steps="fromValue1.steps"
				v-model="fromValue1.prov_cd"
				@change="onChangeProv_cd"
				title="省"
			/>

			<QSPickerCustom
				:name="formName1"
				variableName="city"
				ref="ref_city"
				required
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

			<view class="type-title">企业法人/经办人</view>

			<QSPickerCustom
				:name="formName1"
				variableName="holder_type"
				ref="ref_holder_type"
				required
				v-model="fromValue1.holder_type"
				title="证件持有人类型"
			/>

			<QSInput
				:name="formName1"
				variableName="holder_name"
				ref="ref_holder_name"
				title="证件持有人姓名"
				required
				v-model="fromValue1.holder_name"
			></QSInput>

			<QSPickerCustom
				:name="formName1"
				variableName="document_type"
				ref="ref_document_type"
				required
				v-model="fromValue1.document_type"
				title="证件类型"
			/>

			<QSInput
				:name="formName1"
				variableName="identification_number"
				ref="ref_identification_number"
				title="证件号码"
				required
				v-model="fromValue1.identification_number"
			></QSInput>

			<QSPickerDate
				:name="formName1"
				:dataSet="fromValue1.dataSet"
				variableName="identification_start"
				ref="ref_identification_start"
				title="证件有效期开始"
				v-model="fromValue1.identification_start"
				placherhold="请选择"
			/>

			<QSPickerDate
				:name="formName1"
				variableName="identification_end"
				:dataSet="fromValue1.dataSet"
				ref="ref_identification_end"
				title="证件有效期结束"
				v-model="fromValue1.identification_end"
				placherhold="请选择"
			/>

			<QSPics
				:name="formName1"
				variableName="idcards_front"
				ref="ref_idcards_front"
				customId="typein"
				required
				title="证件扫描件"
				v-model="fromValue1.idcards_front"
			></QSPics>

			<QSPics
				:name="formName1"
				variableName="idcards_back"
				ref="ref_idcards_back"
				customId="typein"
				required
				title="证件扫描件反面"
				v-model="fromValue1.idcards_back"
			></QSPics>

			<QSRadio
				:name="formName1"
				variableName="electronic_invoice"
				title="是否开通电子发票"
				ref="ref_electronic_invoice"
				required
				v-model="fromValue1.electronic_invoice"
				:itemArray="fromValue1.electronic_invoice_itemArray"
			></QSRadio>

			<WButton
				text="下一步"
				:rotate="fromValue1.isRotate"
				@click.native="getStep1()"
				bgColor="rgb(47, 133, 252)"
			></WButton>
		</block>

		<block v-if="stepActive == 2"></block>

		<block v-if="stepActive == 4"></block>
	</view>
</template>

<script>
import { gotoPage } from '@/utils';
import QSApp from '@/components/QS-inputs-split/js/app.js';
import uniSteps from '@/components/uni-steps/uni-steps.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import { getShopsType, getPerfectAgent, saveAgentJjOne, getProvcd, saveAgentJjTwo } from '@/api/agent';

export default {
	components: {
		uniSteps,
		uniIcons,
		uniNavBar
	},
	data() {
		return {
			agentData: {},
			typeOptions: {},

			// ============ 步骤条 ==============
			stepActive: 1,
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
				isRotate: false,
				legal: '',
				mobileNo: '',
				email: '',
				shortername: '',
				picker1: '',
				picker2: '',
				picker3: '',
				picker1Init: false,
				picker2Init: false,
				agentname: '',
				compaddress: '',
				shop_scene: [],
				itemArray: [
					{
						name: '线下',
						value: '线下',
						disabled: true
					},
					{
						name: '公众号',
						value: '公众号'
					},
					{
						name: '小程序',
						value: '小程序'
					},
					{
						name: '网站',
						value: '网站'
					},
					{
						name: 'APP',
						value: 'APP'
					}
				],
				shop_tel: '',
				steps: {
					step_1_value: 'name'
				},
				pic_1: [{ required: true, path: '' }],
				pic_2: [{ required: true, path: '' }]
			},

			// ============ 商户信息 ==============
			formName1: 'step1',
			fromValue1: {
				isRotate: false,
				business_number: '',
				business_scope: '',
				contractstdate: '',
				contractendate: '',
				business_img: [{ required: true, path: '' }],
				business_license: '',
				prov_cd: '',
				picker1Init: false,
				picker2Init: false,
				picker3Init: false,
				city: '',
				areaid: '',
				steps: {
					step_1_value: 'name'
				},
				dataSet: {
					dateFormatArray: ['-', '-', '-']
				},
				holder_type: '',
				holder_name: '',
				document_type: '',
				identification_number: '',
				identification_start: '',
				identification_end: '',
				idcards_front: [{ required: true, path: '' }],
				idcards_back: [{ required: true, path: '' }],
				electronic_invoice: '',
				electronic_invoice_itemArray: [
					{
						name: '是',
						value: '是'
					},
					{
						name: '否',
						value: '否'
					}
				]
			}
		};
	},

	onLoad(options) {
		// console.log(options.agentid)
		this.agentid = '70800072265457';
	},

	onReady() {
		this.initData();
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
		initData() {
			getPerfectAgent({
				agentid: this.agentid
			}).then(data => {
				console.log('data', data);
				this.agentData = data;
				this.initStep1();
			});
		},

		setIntputValueFc(name, data) {
			this.$refs[name].setValue(data);
		},

		setInputDataFc(name, data) {
			this.$refs[name].setData(data);
		},

		initStep0() {
			let data = this.agentData;
			this.initPickerData();
			this.setIntputValueFc('ref_legal', data.legal);
			this.setIntputValueFc('ref_mobileNo', data.mobileNo);
			this.setIntputValueFc('ref_email', data.email);
			this.setIntputValueFc('ref_shortername', data.shortername);
			this.setIntputValueFc('ref_agentname', data.agentname);
			this.setIntputValueFc('ref_compaddress', data.compaddress);
			this.setIntputValueFc('ref_shop_tel', data.shop_tel);
			this.setIntputValueFc('ref_shop_scene', data.shop_scene.split(','));
			if (data.special_qualification != null && data.special_qualification != '') {
				this.setInputDataFc('ref_pic_1', [
					{ required: true, path: 'https://img.facess.net/' + data.special_qualification }
				]);
			}
			if (data.supple_materials != null && data.supple_materials != '') {
				this.setInputDataFc('ref_pic_2', [
					{ required: true, path: 'https://img.facess.net/' + data.supple_materials }
				]);
			}
		},

		initStep1() {
			let data = this.agentData;
			this.initAddressData();
			this.setIntputValueFc('ref_business_number', data.business_number);
			this.setIntputValueFc('ref_business_scope', data.business_scope);
			this.setIntputValueFc('ref_business_license', data.business_license);
			this.setIntputValueFc('ref_holder_name', data.holder_name);
			this.setIntputValueFc('ref_identification_number', data.identification_number);

			this.setInputDataFc('ref_holder_type', [['法人', '经办人']]);
			this.$refs['ref_holder_type'].confirm({
				data: [data.holder_type]
			});

			this.setInputDataFc('ref_document_type', [['身份证', '护照']]);
			this.$refs['ref_document_type'].confirm({
				data: [data.document_type]
			});

			if (data.contractstdate) {
				this.$refs['ref_contractstdate'].confirm({
					data: data.contractstdate
				});
			}
			if (data.contractendate) {
				this.$refs['ref_contractendate'].confirm({
					data: data.contractendate
				});
			}

			if (data.identification_start) {
				this.$refs['ref_identification_start'].confirm({
					data: data.identification_start
				});
			}

			if (data.identification_end) {
				this.$refs['ref_identification_end'].confirm({
					data: data.identification_end
				});
			}

			if (data.business_img != null && data.business_img != '') {
				this.setInputDataFc('ref_business_img', [
					{ required: true, path: 'https://img.facess.net/' + data.business_img }
				]);
			}

			if (data.idcards_front != null && data.idcards_front != '') {
				this.setInputDataFc('ref_idcards_front', [
					{ required: true, path: 'https://img.facess.net/' + data.idcards_front }
				]);
			}

			if (data.idcards_back != null && data.idcards_back != '') {
				this.setInputDataFc('ref_idcards_back', [
					{ required: true, path: 'https://img.facess.net/' + data.idcards_back }
				]);
			}

			this.setIntputValueFc('ref_electronic_invoice', data.electronic_invoice);
		},

		//==================== 商户信息 ====================

		onChangeProv_cd(item) {
			if (this.fromValue1.picker1Init) {
				this.fromValue1.picker1Init = false;
				return;
			}
			this.updateCityType(item.data[0].value.areaid, '', true).then(() => {
				this.updateAreaType(this.fromValue1.city.data[0].value.areaid, '', true);
			});
		},

		onChangeCity(item) {
			if (this.fromValue1.picker2Init) {
				this.fromValue1.picker2Init = false;
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
						// 强制初始化赋值，所以updateOneType在change会调用一次
						//覆盖初始化的值，这里用给一个变量跳过
						this.fromValue1.picker1Init = true;
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
						// 强制初始化赋值，所以updateOneType在change会调用一次
						//覆盖初始化的值，这里用给一个变量跳过
						this.fromValue1.picker2Init = true;
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

		initAddressData() {
			this.updateProvType(this.agentData.proareaid).then(() => {
				this.updateCityType(this.agentData.proareaid, this.agentData.cityareaid).then(() => {
					this.updateAreaType(this.agentData.cityareaid, this.agentData.areaid);
				});
			});
		},

		//==================== 经营信息 ====================

		onChangePicker1(item) {
			if (this.fromValue0.picker1Init) {
				this.fromValue0.picker1Init = false;
				return;
			}
			this.updateTwoType(item.data[0].value.typeid, '', true).then(item => {
				this.updateThreeType(this.fromValue0.picker2.data[0].value.typeid, '', true);
			});
		},

		onChangePicker2(data) {
			if (this.fromValue0.picker2Init) {
				this.fromValue0.picker2Init = false;
				return;
			}
			this.updateThreeType(this.fromValue0.picker2.data[0].value.typeid, '', true);
		},

		//类型一
		updateOneType(one_type) {
			return getShopsType().then(data => {
				let arr = [];
				data.map(item => {
					if (item.typeid == one_type) {
						// 强制初始化赋值，所以updateOneType在change会调用一次
						//覆盖初始化的值，这里用给一个变量跳过
						this.fromValue0.picker1Init = true;
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
				this.setInputDataFc('ref_picker1', [arr]);
			});
		},

		// 更新二级类型
		updateTwoType(one_type, two_type, change) {
			return getShopsType({
				type: 'twotype',
				typeid: one_type
			}).then(data => {
				let arr = [];
				data.map(item => {
					if (two_type && item.typeid == two_type) {
						// 强制初始化赋值，所以updateOneType在change会调用一次
						//覆盖初始化的值，这里用给一个变量跳过
						this.fromValue0.picker2Init = true;
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
						value: item
					});
				});

				// 如果是改变的处理，默认赋第一个值
				if (change) {
					this.$refs['ref_picker2'].confirm({
						data: [arr[0]]
					});
				}
				this.setInputDataFc('ref_picker2', [arr]);
			});
		},

		// 更新三级
		updateThreeType(two_type, three_type, change) {
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
						value: item
					});
				});

				// 如果是改变的处理，默认赋第一个值
				if (change) {
					this.$refs['ref_picker3'].confirm({
						data: [arr[0]]
					});
				}

				this.setInputDataFc('ref_picker3', [arr]);
			});
		},

		initPickerData() {
			// 类型一
			if (this.agentData.one_type) {
				this.updateOneType(this.agentData.one_type).then(() => {
					//类型二
					if (this.agentData.two_type) {
						this.updateTwoType(this.agentData.one_type, this.agentData.two_type).then(() => {
							// 类型三
							if (this.agentData.three_type) {
								this.updateThreeType(this.agentData.two_type, this.agentData.three_type);
							}
						});
					}
				});
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

		/**
		 * 注册第二步
		 */
		getStep1() {
			QSApp.getForm(this.formName1)
				.then(res => {
					console.log(res);
					if (res.verifyErr.length > 0) {
						this.$refs['Message'].error(res.verifyErr[0].title + '输入错误');
						return;
					}
					this.saveRequest2(res.data);
				})
				.catch(err => {
					console.log(`获取表单数据失败: ${JSON.stringify(err)}`);
				});
		},

		/**
		 * 获取上传图片的url
		 */
		getUploadUrl(key, data) {
			//只允许一个/开头
			function splits(url) {
				if (!url) {
					return '';
				}
				let path = url.split('tgimg')[1];
				return '/tgimg' + path;
			}
			let upLoadResult = data[key][0].upLoadResult;
			//是新上传
			if (upLoadResult.length > 0) {
				let data1 = JSON.parse(upLoadResult[1].data);
				return splits(data1.url);
			} else {
				//已存在
				return splits(upLoadResult.data);
			}
		},

		saveRequest1(data) {
			if(this.fromValue0.isRotate){
				return 
			}
			this.fromValue0.isRotate = true;
			let query = {
				agentid: this.agentid,
				agentname: data.agentname,
				areaid: '',
				city: '',
				compaddress: data.compaddress,
				email: data.email,
				legal: data.legal,
				mobileNo: data.mobileNo,
				shop_scene: data.shop_scene,
				shop_tel: data.shop_tel,
				shortername: data.shortername,
				special_qualification: this.getUploadUrl('pic_1', data),
				supple_materials: this.getUploadUrl('pic_2', data),
				one_type: this.fromValue0.picker1.data[0].value.typeid,
				two_type: this.fromValue0.picker2.data[0].value.typeid,
				three_type: this.fromValue0.picker3.data[0].value.typeid,
				userId: this.agentData.userId
			};
			saveAgentJjOne(query)
				.then(data => {
					this.fromValue0.isRotate = false;
					this.stepActive = 1;
				})
				.catch(() => {
					this.fromValue0.isRotate = false;
				});
		},

		saveRequest2(data) {
			if(this.fromValue1.isRotate){
				return 
			}
			this.fromValue1.isRotate = true;
			let query = {
				userId: this.agentData.userId,
				agentid: this.agentid,
				prov_cd: data.prov_cd.data[0].value.areaid,
				city: data.city.data[0].value.areaid,
				areaid: data.areaid.data ? data.areaid.data[0].value.areaid : '',
				business_img: this.getUploadUrl('business_img', data),
				business_license: data.business_license,
				business_number: data.business_number,
				business_scope: data.business_scope,
				contractendate: data.contractendate.data,
				contractstdate: data.contractstdate.data,
				document_type: data.document_type.data[0],
				electronic_invoice: data.electronic_invoice,
				holder_name: data.holder_name,
				holder_type: data.holder_type.data[0],
				idcards_back: this.getUploadUrl('idcards_back', data),
				idcards_front: this.getUploadUrl('idcards_front', data),
				identification_start: data.identification_start.data,
				identification_end: data.identification_end.data,
				identification_number: data.identification_number
			};

			saveAgentJjTwo(query)
				.then(data => {
					this.fromValue1.isRotate = false;
					console.log(213);
					// this.stepActive = 1;
				})
				.catch(() => {
					this.fromValue1.isRotate = false;
				});
		}

		/**
		 * 注册第二步
		//  */
		// getStep1() {
		// 	this.stepActive = 2;
		// }
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
