<template>
	<view class="container">
		<m-header></m-header>

		<view class="content">
			<view class="content__title">
				<view class="content__line"></view>
				<view class="content__text">支付通道占比</view>

				<view class="filter-date-item">
					<picker
						class="filter-date-picker"
						mode="date"
						:value="startDataValue"
						:start="startDate"
						:end="endDate"
						@change="bindStartDateChange"
					>
						<view>{{ startDataValue }}</view>
					</picker>
					<text class="filter-date-text">-</text>
					<picker
						class="filter-date-picker"
						mode="date"
						:value="endDataValue"
						:start="startDate"
						:end="endDate"
						@change="bindEndDateChange"
					>
						<view>{{ endDataValue }}</view>
					</picker>
				</view>
			</view>
		</view>

		<view class="header__date-item">
			<div class="header__date">
				<div
					v-for="(item, index) in tooggleDate"
					:key="index"
					class="header__date-row"
					:class="tooggleDateIndex === index ? 'header__date-row--active' : ''"
					@click="onHandleToggleDate(item, index)"
				>
					{{ item }}
				</div>
			</div>
		</view>

		<view class="qiun-columns">
			<view class="qiun-charts">
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts"></canvas>
			</view>
		</view>

		<view class="qiun-bottom">
			<view class="qiun-names">
				<block v-for="(item, index) in serieNames" :key="index">
					<view class="qiun-row">
						<text class="qiun-dot"></text>
						<text>{{ item.name }}:{{ item.data }}%</text>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
import * as util from '@/utils';
import { mapState, mapActions } from 'vuex';
import { getStatisticsHomedl, getStatisticsHomePay } from '@/api/agent';
import mHeader from './header.vue';
import uCharts from '@/components/u-charts/u-charts.js';
let _self;
let canvaPie = null;

export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			tooggleDateIndex: 0,
			tooggleDate: ['交易金额', '交易笔数'],
			startDataValue: this.getDate('last'),
			endDataValue: currentDate,

			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: '',
			piearr: [],

			chartData: {
				series: [
					{
						name: '会员:一班',
						data: 25,
						format(value){
							return value + 'test'
						}
					},
					{
						name: '会员:一班',
						data: 25
					},
					{
						name: '会员:一班',
						data: 25
					},
					{
						name: '会员:一班',
						data: 25
					},
					{
						name: '会员:一班',
						data: 25
					}
				]
			}
		};
	},
	onLoad() {},
	components: {
		mHeader
	},
	onLoad() {
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(450);
		this.showPie();
		_self = this;
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
		onHandleToggleDate(item, index) {
			this.tooggleDateIndex = index;
		},

		bindStartDateChange(e) {
			this.startDataValue = e.target.value;
		},

		bindEndDateChange(e) {
			this.endDataValue = e.target.value;
		},

		dateConversion(value) {
			var d = new Date(value);
			var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
			return date;
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
				month = month - 6;
			}

			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},

		getTableDataPayjyje() {
			let query = {
				agentid: util.cookies.get('agentid'),
				type: '1',
				start_time: '2019-05-01',
				end_time: '2019-12-01'
			};

			getStatisticsHomePay(query).then(data => {
				if (data != null && data != '') {
					this.showPie();
					// //循环遍历,将穿回来的list转换为chart需要的键值对形式
					// let countlistmap = {};
					// countlistmap['type'] = '微信: ' + data.wx_num_bf + '% | ' + data.wx_num_amount;
					// countlistmap['percentage'] = data.wx_num_amount;
					// countlistArray.push(countlistmap);
					// let countlistmap2 = {};
					// countlistmap2['type'] = '支付宝: ' + data.zfb_num_bf + '% | ' + data.zfb_num_amount;
					// countlistmap2['percentage'] = data.zfb_num_amount;
					// countlistArray.push(countlistmap2);
					// let countlistmap3 = {};
					// countlistmap3['type'] = '银行卡: ' + data.yhk_num_bf + '% | ' + data.yhk_num_amount;
					// countlistmap3['percentage'] = data.yhk_num_amount;
					// countlistArray.push(countlistmap3);
					// let countlistmap4 = {};
					// countlistmap4['type'] = '会员卡: ' + data.fyk_num_bf + '% | ' + data.fyk_num_amount;
					// countlistmap4['percentage'] = data.fyk_num_amount;
					// countlistArray.push(countlistmap4);
					// let countlistmap5 = {};
					// countlistmap5['type'] = '未知: ' + data.wz_num_bf + '% | ' + data.wz_num_amount;
					// countlistmap5['percentage'] = data.wx_num_amount;
					// countlistArray.push(countlistmap5);
					// //将键值对形式加到array数组里
					// //将行和列分别赋值给chartdata的行和列
					// this.chartData.rows = countlistArray;
				}
			});
		},

		showPie() {
			console.log(11, this.chartData.series);
			this.canvaPie = new uCharts({
				$this: this,
				canvasId: 'canvasPie',
				type: 'pie',
				fontSize: 13,
				padding: [20, 5, 5, 5],
				legend: {
					show: false
				},
				background: '#FFFFFF',
				pixelRatio: this.pixelRatio,
				series: this.chartData.series,
				animation: true,
				width: this.cWidth * this.pixelRatio,
				height: this.cHeight * this.pixelRatio,
				disablePieStroke: true,
				dataPointShape:true,
				dataLabel: true,
				extra: {
					pie: {
						labelWidth: 15
					}
				}
			});
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
	margin: 20rpx 0;
	&__title {
		@include flex-h-left;
		font-weight: bold;
		font-size: 30rpx;
		position: relative;
	}
	&__line {
		margin: 0 20rpx;
		width: 10rpx;
		height: 30rpx;
		background: rgb(96, 168, 252);
	}
}
.qiun-padding {
	padding: 2%;
	width: 96%;
}
.qiun-wrap {
	display: flex;
	flex-wrap: wrap;
}
.qiun-rows {
	display: flex;
	flex-direction: row !important;
}
.qiun-columns {
	display: flex;
	flex-direction: column !important;
}
.qiun-common-mt {
	margin-top: 10upx;
}
.qiun-bg-white {
	background: #ffffff;
}
.qiun-title-bar {
	width: 96%;
	padding: 10upx 2%;
	flex-wrap: nowrap;
}
.qiun-title-dot-light {
	border-left: 10upx solid #0ea391;
	padding-left: 10upx;
	font-size: 32upx;
	color: #000000;
}
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}

.qiun-bottom {
	padding: 30rpx 20rpx;
	font-size: 12px;
}

.qiun-names {
	@include flex-h-left;
	flex-wrap: wrap;
}
.qiun-row {
	@include flex-h;
	width: 25%;
	padding: 10rpx 0;
}
.qiun-dot {
	width: 20rpx;
	height: 20rpx;
	border-radius: 50%;
	background: red;
	background: #0069d9;
	margin-right: 5rpx;
}

.header__date-item {
	display: flex;
	justify-content: flex-end;
	margin-right: 20rpx;
	margin-top: 30rpx;
}

.header {
	&__date {
		display: inline-block;
		// height: 30px;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		// display: flex;
		// align-items: center;
		// margin-left: 20rpx;
		overflow: hidden;
	}
	&__date-row {
		padding: 0.3rem;
		// height: 26px;
		float: left;
		font-size: 12px;
		display: flex;
		align-items: center;
	}
	&__date-row--active {
		background-color: #409eff !important;
		color: #fff;
	}
	&__date-row:not(:last-child) {
		border-right: 1px solid #dcdfe6;
	}
}

.filter-date-item {
	position: absolute;
	right: 20rpx;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.filter-date {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.filter-date-text {
	margin: 0 10rpx;
}

.filter-date-picker {
	padding: 10rpx 20rpx;
	background-color: #fff;
	background-image: none;
	border-radius: 4px;
	border: 1px solid #dcdfe6;
	font-size: 25rpx;

	// font-weight: bold;
}

.filter-date-picker:active {
	border-color: #409eff;
}
</style>
