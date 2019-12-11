<template>
	<mescroll-uni @down="downCallback" :up="upOption">
		
		<view class="container">
			<m-header :totalData.sync='totalData'></m-header>

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
					<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
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
	</mescroll-uni>
</template>

<script>
import * as util from '@/utils';
import { mapState, mapActions } from 'vuex';
import { getStatisticsHomedl, getStatisticsHomePay} from '@/api/agent';
import mHeader from './header.vue';
import uCharts from '@/components/u-charts/u-charts.js';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
export default {
	components: {
		mHeader,
		MescrollUni
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			upOption: {
				use: false
			},
			
			totalData:{},
			tooggleDateIndex: 0,
			tooggleDate: ['交易金额', '交易笔数'],
			startDataValue: this.getDate('pre'),
			endDataValue: currentDate,

			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: ''
		};
	},
	onLoad() {
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(550);
		this.getTableDataPayjyje();
		this.getTableData()
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
		
		downCallback(mescroll) {
			this.getTableData()
				.then(() => {
					mescroll.endSuccess();
				})
				.catch(() => {
					mescroll.endErr();
				});
		},
		
		getTableData() {
			return getStatisticsHomedl({
				agentid: util.cookies.get('agentid')
			}).then(data => {
				if (data != null && data != '') {
					this.totalData = data
				}
			});
		},
		
		onHandleToggleDate(item, index) {
			this.tooggleDateIndex = index;
			this.updateCharts();
		},

		updateCharts() {
			if (this.tooggleDateIndex == 0) {
				return this.getTableDataPayjyje();
			} else if (this.tooggleDateIndex == 1) {
				return this.getTableDataPayjybs();
			}
		},

		bindStartDateChange(e) {
			this.startDataValue = e.target.value;
			this.updateCharts();
		},

		bindEndDateChange(e) {
			this.endDataValue = e.target.value;
			this.updateCharts();
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
			} else if (type === 'pre') {
				month = month - 1;
			}

			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},

		getTableDataPayjyje() {
			let query = {
				agentid: util.cookies.get('agentid'),
				type: '0',
				start_time: this.startDataValue,
				end_time: this.endDataValue
			};
			return this.getChartData(query);
		},

		getTableDataPayjybs() {
			let query = {
				agentid: util.cookies.get('agentid'),
				type: '1',
				start_time: this.startDataValue,
				end_time: this.endDataValue
			};
			return this.getChartData(query);
		},

		getChartData(query) {
			return getStatisticsHomePay(query).then(data => {
				if (data != null && data != '') {
					let series = [];
					series.push({
						name: `微信:${data.wx_num_bf}% | ${data.wx_num_amount}`,
						key: '微信',
						data: data.wx_num_bf
					});
					series.push({
						name: `支付宝:${data.zfb_num_bf}% | ${data.zfb_num_amount}`,
						key: '支付宝',
						data: data.zfb_num_bf
					});
					series.push({
						name: `银行卡:${data.yhk_num_bf}% | ${data.yhk_num_amount}`,
						key: '银行卡',
						data: data.yhk_num_bf
					});
					series.push({
						name: `会员卡:${data.fyk_num_bf}% | ${data.fyk_num_amount}`,
						key: '会员卡',
						data: data.fyk_num_bf
					});
					series.push({
						name: `未知:${data.wz_num_bf}% | ${data.wz_num_amount}`,
						key: '未知',
						data: data.wz_num_bf
					});

					for (let i = 0; i < series.length; i++) {
						if (series[i].data) {
							series[i].data = Number(series[i].data);
						}
						series[i].legendShape = 'rect';
						series[i].format = () => {
							return series[i].key + series[i].data + '%';
						};
					}

					this.showRing(series);
				}
			});
		},

		showRing(series) {
			this.canvaRing = new uCharts({
				$this: this,
				canvasId: 'canvasRing',
				type: 'ring',
				fontSize: 11,
				padding: [5, 5, 5, 5],
				legend: {
					show: true,
					float: 'center',
					itemGap: 10,
					padding: 5,
					lineHeight: 26,
					margin: 20,
					// backgroundColor:'rgba(41,198,90,0.2)',
					// borderColor :'rgba(41,198,90,0.5)',
					borderWidth: 1
				},
				background: '#FFFFFF',
				pixelRatio: this.pixelRatio,
				series: series,
				animation: false,
				width: this.cWidth * this.pixelRatio,
				height: this.cHeight * this.pixelRatio,
				disablePieStroke: true,
				dataLabel: true,
				dataPointShape: true,
				extra: {
					pie: {
						offsetAngle: 0,
						ringWidth: 80 * this.pixelRatio,
						labelWidth: 15
					}
				}
			});
		},
		touchRing(e) {
			this.canvaRing.touchLegend(e, {
				animation: false
			});
			this.canvaRing.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
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
	margin-top: 50rpx;
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
