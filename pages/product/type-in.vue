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
import { getShopsType, getPerfectAgent, saveAgentJjOne } from '@/api/agent';

export default {
	components: {
		uniSteps,
		uniIcons,
		uniNavBar
	},
	data() {
		return {
			agentData: {},

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
			}
		};
	},

	onLoad(options) {
		// console.log(options.agentid)
		this.agentid = '70800072265457';
	},

	onReady() {
		this.getTableData().then(data => {
			// console.log('init',data,data.shop_scene.split(","))
			this.agentData = data;
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
		});
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
		getTableData() {
			return getPerfectAgent({
				agentid: this.agentid
			});
		},

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

		setIntputValueFc(name, data) {
			this.$refs[name].setValue(data);
		},

		setInputDataFc(name, data) {
			this.$refs[name].setData(data);
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
					console.log('form', res);
					if (res.verifyErr.length > 0) {
						this.$refs['Message'].error(res.verifyErr[0].title + '输入错误');
						return;
					}
					this.saveRequest1(res.data);
					// this.stepActive = 1;
				})
				.catch(err => {
					// uni.showToast({
					// 	title: '获取表单数据失败'
					// });
					console.log(`获取表单数据失败: ${JSON.stringify(err)}`);
				});
		},

		/**
		 * 获取上传图片的url
		 */
		getUploadUrl(key, data) {
			let upLoadResult = data[key][0].upLoadResult;
			//是新上传
			if (upLoadResult.length > 0) {
				let data1 = JSON.parse(upLoadResult[1].data);
				return data1.url;
			} else {
				//已存在
				return upLoadResult.data;
			}
		},

		saveRequest1(data) {
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
			saveAgentJjOne(query).then(data=>{
				console.log(111,data)
			})
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
