<template>
	<view>
		<message ref="Message"></message>

		<uni-nav-bar
			left-icon="arrowleft"
			fixed
			status-bar
			right-text="编辑"
			background-color="#2F85FC"
			:title="titleText"
			color="#ffffff"
			@click-left="onBack"
			@click-right="onAmend"
		/>

		<QSInput
			:name="formName0"
			variableName="legal"
			ref="ref_legal"
			title="姓名"
			required
			:tapClear="!disabled"
			:disabled="disabled"
			v-model="fromValue0.legal"
		></QSInput>

		<QSInput
			:name="formName0"
			variableName="userName"
			ref="ref_userName"
			title="公司/个人"
			required
			:tapClear="!disabled"
			:disabled="disabled"
			v-model="fromValue0.userName"
		></QSInput>

		<QSInput
			:name="formName0"
			variableName="mobileNo"
			ref="ref_mobileNo"
			required
			verifyType="Tel"
			inputType="number"
			title="手机"
			:tapClear="!disabled"
			:disabled="disabled"
			v-model="fromValue0.mobileNo"
		></QSInput>

		<QSPickerCustom
			:name="formName0"
			variableName="prov_cd"
			ref="ref_prov_cd"
			required
			:steps="fromValue0.steps"
			v-model="fromValue0.prov_cd"
			@change="onChangeProv_cd"
			title="省"
		/>

		<QSPickerCustom
			:name="formName0"
			variableName="city"
			ref="ref_city"
			:steps="fromValue0.steps"
			v-model="fromValue0.city"
			title="市"
			@change="onChangeCity"
		/>

		<QSPickerCustom
			:name="formName0"
			variableName="areaid"
			ref="ref_areaid"
			:steps="fromValue0.steps"
			v-model="fromValue0.areaid"
			title="区"
		/>

		<QSInput
			:name="formName0"
			variableName="compaddress"
			ref="ref_compaddress"
			title="地址"
			:tapClear="!disabled"
			:disabled="disabled"
			v-model="fromValue0.compaddress"
		></QSInput>

		<QSPickerCustom
			v-if="pageType == 'business'"
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
			v-if="pageType == 'business'"
			:name="formName0"
			variableName="picker2"
			ref="ref_picker2"
			:steps="fromValue0.steps"
			@change="onChangePicker2"
			autoHide
			v-model="fromValue0.picker2"
			title="二级经营类型"
		/>
		<QSPickerCustom
			v-if="pageType == 'business'"
			:name="formName0"
			variableName="picker3"
			ref="ref_picker3"
			:steps="fromValue0.steps"
			v-model="fromValue0.picker3"
			title="三级经营类型"
		/>

		<QSPickerDate
			:name="formName0"
			dateFormatArray="-"
			variableName="contractstdate"
			:dataSet="fromValue0.dataSet"
			ref="ref_contractstdate"
			title="合同开始日期"
			v-model="fromValue0.contractstdate"
			placherhold="请选择"
		/>

		<QSPickerDate
			:name="formName0"
			variableName="contractendate"
			ref="ref_contractendate"
			:dataSet="fromValue0.dataSet"
			title="合同结束日期"
			:value="dateValue"
			v-model="fromValue0.contractendate"
			placherhold="请选择"
		/>

		<WButton
			v-if="!disabled"
			text="确定修改"
			:rotate="fromValue0.isRotate"
			@click.native="onEnsure()"
			bgColor="rgb(47, 133, 252)"
		></WButton>
	</view>
</template>

<script>
import * as util from '@/utils';
import QSApp from '@/components/QS-inputs-split/js/app.js';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import { getProvcd, saveAgent, getShopsType } from '@/api/agent';

export default {
	components: {
		uniNavBar
	},
	data() {
		return {
			titleText: '',
			disabled: true,
			pageType: '',

			formName0: 'step0',
			fromValue0: {
				isRotate: false,
				legal: '',
				userName: '',
				mobileNo: '',
				compaddress: '',
				prov_cd: '',
				city: '',
				areaid: '',

				picker1: '',
				picker2: '',
				picker3: '',

				picker1Init: false,
				picker2Init: false,

				type1Init: false,
				type2Init: false,

				steps: {
					step_1_value: 'name'
				},
				dataSet: {
					dateFormatArray: ['-', '-', '-']
				}
			}
		};
	},
	props: {},
	created() {},
	onLoad(options) {
		this.agentData = JSON.parse(options.agentData);
		this.titleText = options.title;
		this.pageType = options.pageType;
	},
	onReady() {
		this.initData();
	},
	computed: {},
	methods: {
		initData() {
			let data = this.agentData;
			this.initAddressData();
			if (this.pageType == 'business') {
				this.initPickerData();
			}
			this.setIntputValueFc('ref_legal', data.legal);
			this.setIntputValueFc('ref_userName', data.userName);
			this.setIntputValueFc('ref_mobileNo', data.mobileNo);
			this.setIntputValueFc('ref_compaddress', data.compaddress);
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
		},

		//=============== 类型 ==================

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

		onChangePicker1(item) {
			if (this.fromValue0.type1Init) {
				this.fromValue0.type1Init = false;
				return;
			}
			this.updateTwoType(item.data[0].value.typeid, '', true).then(item => {
				this.updateThreeType(this.fromValue0.picker2.data[0].value.typeid, '', true);
			});
		},

		onChangePicker2(data) {
			if (this.fromValue0.type2Init) {
				this.fromValue0.type2Init = false;
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
						this.fromValue0.type1Init = true;
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
						this.fromValue0.type2Init = true;
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

		//=============== 范围 ==================

		initAddressData() {
			this.updateProvType(this.agentData.prov_cd).then(() => {
				this.updateCityType(this.agentData.prov_cd, this.agentData.city).then(() => {
					this.updateAreaType(this.agentData.city, this.agentData.areaid);
				});
			});
		},

		onChangeProv_cd(item) {
			if (this.fromValue0.picker1Init) {
				this.fromValue0.picker1Init = false;
				return;
			}
			this.updateCityType(item.data[0].value.areaid, '', true).then(() => {
				this.updateAreaType(this.fromValue0.city.data[0].value.areaid, '', true);
			});
		},

		onChangeCity(item) {
			if (this.fromValue0.picker2Init) {
				this.fromValue0.picker2Init = false;
				return;
			}
			this.updateAreaType(this.fromValue0.city.data[0].value.areaid, '', true);
		},

		// 省会
		updateProvType(proareaid, change) {
			return getProvcd().then(data => {
				let arr = [];
				data.map(item => {
					if (item.areaid == proareaid) {
						// 强制初始化赋值，所以updateOneType在change会调用一次
						//覆盖初始化的值，这里用给一个变量跳过
						this.fromValue0.picker1Init = true;
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
						this.fromValue0.picker2Init = true;
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

		setInputDataFc(name, data) {
			this.$refs[name].setData(data);
		},

		setIntputValueFc(name, data) {
			this.$refs[name].setValue(data);
		},

		//===============  提交  ==================

		onEnsure() {
			QSApp.getForm(this.formName0)
				.then(res => {
					if (res.verifyErr.length > 0) {
						this.$refs['Message'].error(res.verifyErr[0].title + '输入错误');
						return;
					}
					this.saveRequest(res.data);
				})
				.catch(err => {
					console.log(`获取表单数据失败: ${JSON.stringify(err)}`);
				});
		},

		onBack() {
			util.gotoPage('back');
		},

		onAmend() {
			this.disabled = false;
		},

		saveRequest(data) {
			if (this.fromValue0.isRotate) {
				return;
			}
			this.fromValue0.isRotate = true;

			let query = {
				agentid: util.cookies.get('agentid'),
				agentids: this.agentData.agentid,
				legal: data.legal,
				userName: data.userName,
				mobileNo: data.mobileNo,
				prov_cd: data.prov_cd.data[0].value.areaid,
				userCode: this.agentData.userCode,
				id: this.agentData.userId,

				city: data.city.data ? data.city.data[0].value.areaid : '',
				areaid: data.areaid.data ? data.areaid.data[0].value.areaid : '',
				compaddress: data.compaddress ? data.compaddress : '',
				contractendate: data.contractendate.data ? data.contractendate.data : '',
				contractstdate: data.contractstdate.data ? data.contractstdate.data : ''
			};

			//商户补充
			if (this.pageType == 'business') {
				query.one_type = this.fromValue0.picker1.data[0].value.typeid;
				query.two_type = this.fromValue0.picker2.data ? this.fromValue0.picker2.data[0].value.typeid : '';
				query.three_type = this.fromValue0.picker3.data ? this.fromValue0.picker3.data[0].value.typeid : '';
			}

			saveAgent(query)
				.then(data => {
					this.fromValue0.isRotate = false;
					this.disabled = true;
					this.$refs['Message'].success('修改成功');
					getApp().globalData.agency = {
						agentid: this.agentData.agentid,
						agentData: query,
						update: true
					};
				})
				.catch(() => {
					this.fromValue0.isRotate = false;
					this.$refs['Message'].error('修改失败');
				});
		}
	}
};
</script>

<style lang="scss"></style>
