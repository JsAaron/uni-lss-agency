<template>
	<view class="container">
		<m-header></m-header>

		<view class="content">
			<view class="content__title">
				<view class="content__line"></view>
				<view class="content__text">业务员发展商户占比</view>
			</view>
		</view>

		<view class="qiun-columns">
			<view class="qiun-charts"><canvas canvas-id="canvasPie" id="canvasPie" class="charts"></canvas></view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import mHeader from './header.vue';
import uCharts from '@/components/u-charts/u-charts.js';
var _self;
var canvaRing = null;
var canvaPie = null;

export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: ''
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
	mounted() {},
	computed: {},
	methods: {
		...mapActions('home', ['getHomeData']),

		getServerData() {
			let chartData = {
				series: []
			};
			for (var i = 0; i < 20; i++) {
				chartData.series.push({
					name: '业务员' + i,
					data: 5
				});
			}
			_self.showRing('canvasPie', chartData);
		},

		//===================================

		showRing(canvasId, chartData) {
			canvaPie = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'ring',
				fontSize: 11,
				legend: {
					show: false
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: true,
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
	height: 500rpx;
	background-color: #ffffff;
}
.charts {
	width: 750upx;
	height: 500rpx;
	background-color: #ffffff;
}
</style>
