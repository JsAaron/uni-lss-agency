<template>
	<view class="container">
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view
				v-for="(item, index) in tabBars"
				:key="item.id"
				class="nav-item"
				:class="{ current: index === tabCurrentIndex }"
				:id="'tab' + index"
				@click="changeTab(index)"
			>
				{{ item.name }}
			</view>
		</scroll-view>

		<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
			<swiper-item v-for="(item, index) in tabBars" :key="index">
				<scroll-view class="panel-scroll-box" scroll-y="true">
					<child1 :agentData="agentData" v-if="index == 0"></child1>
					<child2 :agentData="agentData" v-if="index == 1"></child2>
					<child3 :agentData="agentData" v-if="index == 2"></child3>
					<child4 :agentData="agentData" v-if="index == 3"></child4>
					<child5 :agentData="agentData" v-if="index == 4"></child5>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import * as util from '@/utils';
import uniIcon from '@/components/uni-icon/uni-icon';
import { getAgentPagedList, getPerfectAgent } from '@/api/agent';
import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
import mixLoadMore from '@/components/mix-load-more/mix-load-more';
import child1 from './child1';
import child2 from './child2';
import child3 from './child3';
import child4 from './child4';
import child5 from './child5';

let windowWidth = 0,
	scrollTimer = false,
	tabBar;

let tabList = [
	{
		name: '基本材料'
	},
	{
		name: '微信'
	},
	{
		name: '支付宝'
	},
	{
		name: '随行付'
	},
	{
		name: '银盛'
	}
];

export default {
	components: {
		child1,
		child2,
		child3,
		child4,
		child5,
		uniIcon,
		mixPulldownRefresh,
		mixLoadMore
	},
	data() {
		return {
			agentid: '',
			agentData: {},
			tabCurrentIndex: 0, //当前选项卡索引
			scrollLeft: 0, //顶部选项卡左滑距离
			enableScroll: true,
			tabBars: []
		};
	},
	onLoad(options) {
		this.agentid = options.agentid;
		this.initTabbars();
	},
	computed: {},
	methods: {
		/**
		 * 数据处理方法在vue和nvue中通用，可以直接用mixin混合
		 * 这里直接写的
		 * mixin使用方法看index.nuve
		 */
		//获取分类
		initTabbars() {
			tabList.forEach(item => {
				item.newsList = [];
				item.loadMoreStatus = 0; //加载更多 0加载前，1加载中，2没有更多了
			});
			this.tabBars = tabList;
			this.getTableData()
		},

		getTableData() {
			getPerfectAgent({
				agentid: this.agentid
			}).then(data => {
				if (data != null && data != '') {
					this.agentData = data;
				}
			});
		},

		//tab切换
		async changeTab(e) {
			if (scrollTimer) {
				//多次切换只执行最后一次
				clearTimeout(scrollTimer);
				scrollTimer = false;
			}
			let index = e;
			//e=number为点击切换，e=object为swiper滑动切换
			if (typeof e === 'object') {
				index = e.detail.current;
			}
			if (typeof tabBar !== 'object') {
				tabBar = await this.getElSize('nav-bar');
			}
			//计算宽度相关
			let tabBarScrollLeft = tabBar.scrollLeft;
			let width = 0;
			let nowWidth = 0;
			//获取可滑动总宽度
			for (let i = 0; i <= index; i++) {
				let result = await this.getElSize('tab' + i);
				width += result.width;
				if (i === index) {
					nowWidth = result.width;
				}
			}
			if (typeof e === 'number') {
				//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
				this.tabCurrentIndex = index;
			}
			//延迟300ms,等待swiper动画结束再修改tabbar
			scrollTimer = setTimeout(() => {
				if (width - nowWidth / 2 > windowWidth / 2) {
					//如果当前项越过中心点，将其放在屏幕中心
					this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
				} else {
					this.scrollLeft = 0;
				}
				if (typeof e === 'object') {
					this.tabCurrentIndex = index;
				}
				this.tabCurrentIndex = index;

				//第一次切换tab，动画结束后需要加载数据
				let tabItem = this.tabBars[this.tabCurrentIndex];
				if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
					// this.loadNewsList('add');
					tabItem.loaded = true;
				}
			}, 300);
		},
		//获得元素的size
		getElSize(id) {
			return new Promise((res, rej) => {
				let el = uni.createSelectorQuery().select('#' + id);
				el.fields(
					{
						size: true,
						scrollOffset: true,
						rect: true
					},
					data => {
						res(data);
					}
				).exec();
			});
		}
	}
};
</script>

<style lang="scss">
page,
.container {
	background-color: #fff;
	height: 100%;
	overflow: hidden;
}

/* 顶部tabbar */
.nav-bar {
	position: relative;
	z-index: 10;
	height: 90upx;
	white-space: nowrap;
	box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
	background-color: #fff;
	.nav-item {
		display: inline-block;
		width: 150upx;
		height: 90upx;
		text-align: center;
		line-height: 90upx;
		font-size: 30upx;
		color: #303133;
		position: relative;
		&:after {
			content: '';
			width: 0;
			height: 0;
			border-bottom: 4upx solid #007aff;
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			transition: 0.3s;
		}
	}
	.current {
		color: #007aff;
		&:after {
			width: 50%;
		}
	}
}

.swiper-box {
	height: calc(100% - 90rpx);
}

.panel-scroll-box {
	height: 100%;
}

.content {
	&__row {
		// width: calc('100% - 40rpx');
		@include flex-h-between;
		padding: 20rpx 20rpx;
	}
	&__row:nth-of-type(odd) {
		background-color: rgb(252, 252, 252);
	}
	&__left {
		font-size: 30rpx;
	}
	&__name {
	}
	&__code {
		color: #999999;
		margin-top: 5rpx;
	}
	&__right {
		@include flex-h-left;
		font-size: 28rpx;
		color: #007aff;
	}
}
</style>
