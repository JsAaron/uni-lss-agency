<template>
	<view class="container">
		<sl-filter
			class="sl-filter"
			:independence="true"
			:color="titleColor"
			:themeColor="themeColor"
			:menuList.sync="menuList"
			@result="onFilter"
		></sl-filter>
		<mescroll-uni
			@down="downCallback"
			:top="containerTop"
			:up="upOption"
			@up="upCallback"
			@init="mescrollInit"
		>
			<view class="content__row lss-hairline--bottom">
				<view class="content__col">
					<view>订单总数</view>
					<view class="content--gray">{{ totalData.order_num }}笔</view>
				</view>
				<view class="content__col">
					<view>订单总金额</view>
					<view class="content--gray">{{ totalData.order_amount }}元</view>
				</view>
				<view class="content__col">
					<view>退款总金额</view>
					<view class="content--gray">{{ totalData.refund_amount }}元</view>
				</view>
				<view class="content__col">
					<view>顾客实付</view>
					<view class="content--gray">{{ totalData.payment_amount }}元</view>
				</view>
				<view class="content__col">
					<view>优惠</view>
					<view class="content--gray">{{ totalData.discount_amount }}元</view>
				</view>
			</view>

			<view class="content__row lss-hairline--bottom" v-for="(item, index) in agentData" :key="index">
				<view>
					<view>{{ item.agentname }}</view>
					<view>{{ item.mer_order_id }}</view>
					<view>{{ item.order_time2 }}</view>
				</view>
				<view>
					<view class="content__col">
						<view>{{ item.order_amt }}元</view>
						<view>{{ getPayName(item) }}</view>
					</view>
				</view>
				<view>{{ getStateName(item) }}</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
import * as util from '@/utils';
import { getStatisticsHomedl, getStatisticsHomePay } from '@/api/agent';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';
import slFilter from '@/components/sl-filter/sl-filter.vue';
import { getStatisticsJymx, getMobileOrderPagelistJymx } from '@/api/agent';

export default {
	components: {
		slFilter,
		MxDatePicker,
		MescrollUni
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			startDataValue: this.getDate('last'),
			endDataValue: currentDate,

			agentData: [],
			totalData: {
				order_amount: '0',
				order_num: '0',
				refund_amount: '0',
				payment_amount: '0',
				discount_amount: '0'
			},
			containerTop: '',
			mescroll: null,
			searchForm: {
				pay_type: '',
				pay_state: ''
			},
			upOption: {
				// autoShowLoading:true,
				// use: true,
				page: {
					size: 30
				},
				noMoreSize: 1,
				empty: {
					use: true,
					tip: '~ 搜索无结果 ~'
				},
				textNoMore: '-- 数据全部加载完毕 --'
			},

			themeColor: '#00a6ff',
			titleColor: '#666666',
			filterResult: '',
			menuList: [
				{
					title: '支付日期',
					key: 'pay_date',
					detailTitle: '请选择支付时间段',
					isMutiple: false,
					reflexTitle: true,
					detailList: []
				},
				{
					title: '支付方式',
					key: 'pay_type',
					detailTitle: '请选择支付方式（单选）',
					isMutiple: false,
					reflexTitle: true,
					detailList: [
						{
							title: '全部',
							value: ''
						},
						{
							value: '支付宝刷脸',
							title: '支付宝'
						},
						{
							value: '微信刷脸',
							title: '微信'
						},
						{
							value: '银行卡',
							title: '银行卡'
						},
						{
							value: '会员卡',
							title: '会员卡'
						}
					]
				},
				{
					title: '支付状态',
					key: 'pay_state',
					detailTitle: '请选择支付状态（单选）',
					isMutiple: false,
					reflexTitle: true,
					detailList: [
						{
							title: '全部',
							value: ''
						},
						{
							value: '0000',
							title: '支付成功'
						},
						{
							value: '0001',
							title: '支付失败'
						},
						{
							value: '0002',
							title: '全额退款成功'
						}
					]
				}
			]
		};
	},
	onLoad() {
		this.agentid = util.cookies.get('agentid');
		const query = wx.createSelectorQuery();
		query.select('.sl-filter').boundingClientRect();
		query.selectViewport().scrollOffset();
		query.exec(res => {
			this.containerTop = res[0].height * 2;
			this.getTableDataMx();
		});
	},
	computed: {},
	methods: {
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},

		downCallback(mescroll) {
			mescroll.resetUpScroll();
		},

		upCallback(mescroll) {
			let pageNum = mescroll.num;
			let pageSize = mescroll.size;
			let query = {
				pageIndex: pageNum,
				pageSize: pageSize,
				sortBy: '',
				parent_agentid: this.agentid,
				start_time: this.startDataValue,
				end_time: this.endDataValue,
				descending: false,
				filter: this.searchForm
			};
			getMobileOrderPagelistJymx(query)
				.then(data => {
					if (mescroll.num == 1) this.agentData = [];
					this.agentData = this.agentData.concat(data.rows);
					mescroll.endByPage(data.rows.length, data.totalpage);
				})
				.catch(() => {
					mescroll.endErr();
				});
		},

		getPayName(item) {
			if (item.refund_no != '') {
				return '退款';
			} else {
				if (item.pay_type == '微信刷脸') {
					return '微信';
				} else if (item.pay_type == '支付宝刷脸') {
					return '支付宝';
				} else if (item.pay_type == '银行卡') {
					return '银行卡';
				} else if (item.pay_type == '会员卡') {
					return '会员卡';
				}
			}
		},

		getStateName(item) {
			if (item.return_code == '0000') {
				if (item.refund_no != '') {
					return '退款成功';
				} else {
					return '支付成功';
				}
			} else {
				return '支付失败';
			}
		},

		resetPageData() {
			this.getTableDataMx();
			this.mescroll.resetUpScroll();
		},

		onFilter(val) {
			if (val.hasOwnProperty('pay_date')) {
				if (val.pay_date.start) {
					this.startDataValue = val.pay_date.start;
				}
				if (val.pay_date.end) {
					this.endDataValue = val.pay_date.end;
				}
				this.resetPageData();
			}
			if (val.hasOwnProperty('pay_type')) {
				this.searchForm.pay_type = val.pay_type;
				this.resetPageData();
			}
			if (val.hasOwnProperty('pay_state')) {
				this.searchForm.pay_state = val.pay_state;
				this.resetPageData();
			}
		},

		getTableDataMx() {
			let query = {
				parent_agentid: this.agentid,
				start_time: this.startDataValue,
				end_time: this.endDataValue,
				pay_type: this.searchForm.pay_type,
				pay_state: this.searchForm.pay_state
			};
			getStatisticsJymx(query).then(data => {
				this.totalData = data;
			});
		},

		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			} else if (type === 'last') {
				month = month - 1;
			}

			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style lang="scss">
.container {
	width: 100vw;
	min-height: 100vh;
	background: #fff;
	overflow-y: scroll;
}

.content {
	&--gray {
		color: #7d7e80;
	}
	&__row {
		@include flex-h-between;
		padding: 20rpx 20rpx;
		font-size: 25rpx;
	}
	&__col {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	&__first {
		color: #7d7e80;
	}
	&__row:nth-of-type(odd) {
		background-color: rgb(252, 252, 252);
	}
}
</style>
