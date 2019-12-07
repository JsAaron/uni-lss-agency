<template>
	<view class="container">
		<m-header></m-header>

		<view class="content">
			<view class="content__title">
				<view class="content__line"></view>
				<view class="content__text">支付通道占比</view>
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
		</view>

		<view class="qiun-columns">
			<view class="qiun-charts">
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
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
var _self;
var canvaRing = null;

export default {
	data() {
		return {
			tooggleDateIndex: 0,
			tooggleDate: ['交易金额', '交易笔数'],

			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: '',
			serieNames: []
		};
	},
	onLoad() {
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getServerData();
	},
	components: {
		mHeader
	},
	mounted() {
		this.getTableDataPayjyje();
	},
	computed: {},
	methods: {
		...mapActions('home', ['getHomeData']),

		onHandleToggleDate(item, index) {
			this.tooggleDateIndex = index;
		},

		dateConversion(value) {
			var d = new Date(value);
			var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
			return date;
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

		getServerData() {
			uni.request({
				url: 'https://www.ucharts.cn/data.json',
				data: {},
				success: function(res) {
					console.log(res.data.data);
					let Ring = { series: [] };
					//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					Ring.series = res.data.data.Ring.series;
					//自定义文案示例，需设置format字段
					for (let i = 0; i < Ring.series.length; i++) {
						Ring.series[i].format = () => {
							return Ring.series[i].name + Ring.series[i].data;
						};
					}
					_self.textarea = JSON.stringify(res.data.data.Ring);
					_self.serieNames = Ring.series;

					console.log('Ring', res.data.data.Ring);

					_self.showRing('canvasRing', Ring);
				},
				fail: () => {
					_self.tips = '网络错误，小程序端请检查合法域名';
				}
			});
		},

		showRing(canvasId, chartData) {
			canvaRing = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'ring',
				fontSize: 11,
				padding: [20, 5, 5, 5],
				legend: {
					show: false
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: false,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				disablePieStroke: true,
				dataLabel: true,
				subtitle: {
					name: '70%',
					color: '#7cb5ec',
					fontSize: 25 * _self.pixelRatio
				},
				title: {
					name: '收益率',
					color: '#666666',
					fontSize: 15 * _self.pixelRatio
				},
				extra: {
					pie: {
						offsetAngle: 0,
						ringWidth: 40 * _self.pixelRatio,
						labelWidth: 15
					}
				}
			});
		}

		// getServerData() {
		// 	let chartData = {
		// 		series: []
		// 	};
		// 	for (var i = 0; i < 20; i++) {
		// 		chartData.series.push({
		// 			name: '业务员' + i,
		// 			data: 5
		// 		});
		// 	}
		// 	_self.showRing('canvasPie', chartData);
		// },

		//===================================
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

.header {

	&__date {
		display: inline-block;
		// height: 30px;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		// display: flex;
		// align-items: center;
		// margin-left: 20rpx;
			position: absolute;
			right: 20rpx;
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
</style>
