<template>
	<view class="container">
		<message ref="Message"></message>

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
			/>

			<QSPickerDate
				:name="fromValue0"
				variableName="identification_end"
				:dataSet="fromValue0.dataSet"
				ref="ref_identification_end"
				title="证件有效期结束"
				v-model="fromValue0.identification_end"
				placherhold="请选择"
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
			/>

			<WButton
				text="下一步"
				:rotate="fromValue0.isRotate"
				@click.native="getStep0()"
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
import { getPerfectAgent, getShopsType , saveAgentNewJjOne } from '@/api/agent';

export default {
	components: {
		uniSteps,
		uniIcons,
		uniNavBar,
		uniNumberBox
	},
	data() {
		return {
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
			}
		};
	},

	onLoad(options) {
		this.options = {
			cityareaid: '420100',
			organization_code: '',
			appid: '',
			qkey: 'BSBPPOQCILBIPNFELQMH',
			document_type: '身份证',
			comm_amt: 0,
			jy_lm_ys: '',
			fws_type: '',
			deposit_bank: '',
			is_sole: '',
			businessid_two: '',
			agentchanneltype: 1,
			workkey: '',
			sum_amt: 0,
			wx_num_fy: '',
			agent_shop: '',
			identification_start: 'null',
			municipal_agent: '',
			mobkey: '',
			basCashCouponlist: [],
			special_qualification: '/tgimg/201912/8c36697b-0eb1-4d1b-81a3-139b7c256ddf.png',
			wx_num_gf: '',
			qy_agent: '',
			proareaid: '420000',
			agenttype: 2,
			latitude: '',
			rate_ys: '',
			region: '',
			shop_tel: '15098980000',
			holder_name: '123',
			business_description: '',
			distancecd: '',
			business_license: '454664',
			tradingareaid: '',
			provcdId: '',
			agent_face: '',
			distance: '',
			pingkey: '',
			zfb_pz_type: '',
			zfb_num_gf: '',
			jy_lm_sxf: '',
			bank_account: '',
			one_type_name: '个体工商户',
			business_sector: '',
			contractendate: 'null',
			zfb_num_sxf: '',
			shop_reminder: '',
			goods_list: [],
			rate_sxf: '',
			is_discount: '',
			areaid: '420101',
			idcards_back: '/tgimg/201912/e29a2a0b-75ac-497b-bada-7f48557b20d9.png',
			identitynum: '',
			zfb_num_fy: '',
			bank_branch: '',
			type_id: 1,
			businessid: '',
			identification_end: 'null',
			packtype: 0,
			is_tea_water: '',
			three_type: '60',
			is_fws: '',
			accessIp: '',
			is_stop: '',
			supple_materials: '/tgimg/201912/8006dfe2-97fd-4363-b240-6c28d962f649.png',
			mobileNo: '13000000000',
			is_children_seat: '',
			wx_num_sxf: '',
			contractno: '',
			business_scope: '123',
			areaname: '市辖区',
			cityId: '',
			freeze_amt: 0,
			agentlogo: '',
			zflxtype: '',
			pay_type: '',
			userId: '4244',
			organization_img: '',
			province: '湖北省',
			idcards_hand: '',
			organization_end: '',
			compaddress: '来了解',
			agentaccount: '0',
			longitude: '',
			openid: '',
			shop_scene: '线下',
			basGroupBuyinglist: [],
			wx_pz_type: '',
			lm_agent: '',
			deviceId: '',
			cards: [],
			is_wifi: '',
			one_type: '1',
			is_balcony: '',
			isfact: 0,
			shortername: '123',
			per_capita: '',
			agentid: '70800072265528',
			account_name: '',
			business_number: '123',
			industry_license: '',
			end_time: '',
			email: '1343646@qq.com',
			alipay_account: '',
			business_hours: '',
			legal: '易江峰',
			provincial_agent: '70800072265528',
			desc_content: '',
			is_subscribe: '',
			dl_type: '4',
			order_id: '',
			total_check_out_num: 0,
			electronic_invoice: '是',
			fws_agentid: '',
			is_sofa: '',
			account_city: '',
			identification_number: '4546466767677',
			merchant_agreement: '',
			discount_list: [],
			contractstdate: 'null',
			poskey: '',
			holder_type: '法人',
			shop_introduction: '',
			qq_amt: 0,
			agentname: '小亮',
			two_type: '10',
			real_shop: '',
			organization_start: '',
			pass: '2',
			merchant_total: '',
			pagentid: '70800072265441',
			start_time: '',
			business_img: '/tgimg/201912/c4127f70-a621-4911-9599-c08bb321636c.png',
			cityname: '武汉市',
			idcards_front: '/tgimg/201912/cfe95d89-a03b-4050-830f-2e3e41472a1c.png'
		};

		uni.setNavigationBarTitle({
			title: `录入资料(${this.options.agentname})`
		});
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
				agentid: this.options.agentid
			}).then(data => {
				// console.log('data', data);
				this.agentData = data;
				this.initData0();
			});
		},

		onBackPage() {
			gotoPage('back');
		},

		setIntputValueFc(name, data) {
			this.$refs[name].setValue(data);
		},

		setInputDataFc(name, data) {
			this.$refs[name].setData(data);
		},

		initData0() {
			let data = this.agentData;
			if (data.idcards_front != null && data.idcards_front != '' && data.idcards_front != 'null') {
				this.setInputDataFc('ref_idcards_front', [
					{ required: true, path: 'https://img.facess.net/' + data.idcards_front }
				]);
			}
			if (data.idcards_back != null && data.idcards_back != '' && data.idcards_back != 'null') {
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
					this.saveRequest1(res.data);
				})
				.catch(err => {
					console.log(`获取表单数据失败: ${JSON.stringify(err)}`);
				});
		},

		saveRequest1() { 
			if (this.fromValue0.isRotate) {
				return;
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
			// saveAgentNewJjOne(query)
			// 	.then(data => {
			// 		this.fromValue0.isRotate = false;
			// 		this.onPrevNext();
			// 	})
			// 	.catch(() => {
			// 		this.fromValue0.isRotate = false;
			// 	});
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
