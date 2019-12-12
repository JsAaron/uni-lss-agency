<template>
	<view class="container">
		<sl-filter
			class="sl-filter"
			:independence="true"
			:color="titleColor"
			:themeColor="themeColor"
			:menuList.sync="menuList"
			:topFixed="true"
			@result="onFilter"
		></sl-filter>
		<mix-pulldown-refresh 
			ref="mixPulldownRefresh"
			class="panel-content"
			:top="panelTop"
			@refresh="onPulldownReresh"
			@setEnableScroll="setEnableScroll"
		>
			<view class="swiper-box">
				<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore">
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

					<view
						class="content__row lss-hairline--bottom"
						v-for="(item, index) in agentData.newsList"
						:key="index"
					>
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
						<view v-bind:style="{ color: getColor(item) }">{{ getStateName(item) }}</view>
					</view>
					<!-- 上滑加载更多组件 -->
					<mix-load-more :status="agentData.loadMoreStatus"></mix-load-more>
				</scroll-view>
			</view>
		</mix-pulldown-refresh>
	</view>
</template>

<script>
import * as util from '@/utils';
import { getStatisticsHomedl, getStatisticsHomePay } from '@/api/agent';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';
import slFilter from '@/components/sl-filter/sl-filter.vue';
import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
import mixLoadMore from '@/components/mix-load-more/mix-load-more';

import { getStatisticsJymx, getMobileOrderPagelistJymx } from '@/api/agent';

export default {
	components: {
		slFilter,
		MxDatePicker,
		MescrollUni,
		mixLoadMore,
		mixPulldownRefresh
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			panelTop: 0,
			enableScroll: true,
			agentData: {
				pageIndex: 0,
				totalPages: 0,
				newsList: [],
				loadMoreStatus: 0,
				refreshing: 0
			},

			startDataValue: this.getDate('last'),
			endDataValue: currentDate,

			totalData: {
				order_amount: '0',
				order_num: '0',
				refund_amount: '0',
				payment_amount: '0',
				discount_amount: '0'
			},
			containerTop: '',
			searchForm: {
				pay_type: '',
				pay_state: ''
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
			this.panelTop = res[0].height * 2;
			this.getTableDataMx();
			this.loadNewsList('add');
		});
	},
	computed: {},
	methods: {
		//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
		setEnableScroll(enable) {
			if (this.enableScroll !== enable) {
				this.enableScroll = enable;
			}
		},

		//下拉刷新
		onPulldownReresh() {
			this.loadNewsList('refresh');
		},

		//上滑加载
		loadMore() {
			this.loadNewsList('add');
		},

		//列表数据
		loadNewsList(type) {
			let agentItem = this.agentData;

			//type add 加载更多 refresh下拉刷新
			if (type === 'add') {
				if (agentItem.loadMoreStatus === 2) {
					return;
				}
				agentItem.loadMoreStatus = 1;
			} else if (type === 'refresh') {
				agentItem.pageIndex = 0;
				// #ifdef APP-PLUS
				agentItem.refreshing = true;
				// #endif
			}

			let query = {
				pageIndex: ++agentItem.pageIndex,
				pageSize: 30,
				sortBy: '',
				parent_agentid: this.agentid,
				start_time: this.startDataValue,
				end_time: this.endDataValue,
				descending: false,
				filter: this.searchForm
			};

			getMobileOrderPagelistJymx(query).then(async res => {
				if (type === 'refresh') {
					agentItem.newsList = []; //刷新前清空数组
				}
				res.rows.forEach(item => {
					agentItem.newsList.push(item);
				});
				agentItem.totalPages = res.totalpage;

				//下拉刷新 关闭刷新动画
				if (type === 'refresh') {
					this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
					// #ifdef APP-PLUS
					agentItem.refreshing = false;
					// #endif
					agentItem.loadMoreStatus = 0;
				} 

				//上滑加载 处理状态
				if (type === 'add') {
					agentItem.loadMoreStatus = agentItem.pageIndex >= agentItem.totalPages ? 2 : 0;
				}
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
		
		getColor(item) {
			if (item.return_code == '0000') {
				if (item.refund_no != '') {
					return '#FF7F24';
				} else {
					return '#6495ED';
				}
			} else {
				return 'red';
			}
		},
		

		resetPageData() {
			this.getTableDataMx();
			this.loadNewsList('refresh');
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
		color: #363636;
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

.swiper-box {
	height: 100%;
}

.panel-scroll-box {
	height: 100%;

	.panel-item {
		background: #fff;
		padding: 30px 0;
		border-bottom: 2px solid #000;
	}
}
</style>
