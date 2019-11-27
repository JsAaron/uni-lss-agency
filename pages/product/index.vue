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

		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh
			ref="mixPulldownRefresh"
			class="panel-content"
			:top="90"
			@refresh="onPulldownReresh"
			@setEnableScroll="setEnableScroll"
		>
			<!-- 内容部分 -->
			<swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore">
						<view
							v-for="(item, index) in tabItem.newsList"
							:key="index"
							class="content__row lss-hairline--bottom"
							@click="navToDetails(item)"
						>
							<view class="content__left">
								<view class="content__name">{{ item.agentname }}</view>
								<view class="content__code">{{ item.userCode }}</view>
							</view>
							<view v-if="item.passName" class="content__right">
								<view>{{ item.passName }}</view>
								<uni-icon type="arrow" size="14" color="#c9c9c9"></uni-icon>
							</view>
						</view>
						<!-- 上滑加载更多组件 -->
						<mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
	</view>
</template>

<script>
import * as util from '@/utils';
import uniIcon from '@/components/uni-icon/uni-icon';
import { getAgentPagedList } from '@/api/agent';
import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
import mixLoadMore from '@/components/mix-load-more/mix-load-more';
let windowWidth = 0,
	scrollTimer = false,
	tabBar;

let tabList = [
	{
		name: '全部',
		pass: ''
	},
	{
		name: '未开通',
		pass: '3'
	},
	{
		name: '待审核',
		pass: '2'
	},
	{
		name: '已签约',
		pass: '0'
	},
	{
		name: '签约失败',
		pass: '4'
	}
];

export default {
	components: {
		uniIcon,
		mixPulldownRefresh,
		mixLoadMore
	},
	data() {
		return {
			tabCurrentIndex: 0, //当前选项卡索引
			scrollLeft: 0, //顶部选项卡左滑距离
			enableScroll: true,
			tabBars: []
		};
	},
	computed: {},
	async onLoad() {
		this.agentid = util.cookies.get('agentid');
		this.dl_type = util.cookies.get('dl_type');
		this.xt_id = util.cookies.get('xt_id');
		// 获取屏幕宽度
		windowWidth = uni.getSystemInfoSync().windowWidth;
		this.initTabbars();
	},
	methods: {
		/**
		 * 数据处理方法在vue和nvue中通用，可以直接用mixin混合
		 * 这里直接写的
		 * mixin使用方法看index.nuve
		 */
		//获取分类
		initTabbars() {
			tabList.forEach(item => {
				item.pageIndex = 0; //页码索引
				item.totalPages = 0; //总数码数
				item.newsList = [];
				item.loadMoreStatus = 0; //加载更多 0加载前，1加载中，2没有更多了
				item.refreshing = 0;
			});
			this.tabBars = tabList;
			this.loadNewsList('add');
		},
		//列表数据
		loadNewsList(type) {
			let tabItem = this.tabBars[this.tabCurrentIndex];

			//type add 加载更多 refresh下拉刷新
			if (type === 'add') {
				if (tabItem.loadMoreStatus === 2) {
					return;
				}
				tabItem.loadMoreStatus = 1;
			} else if (type === 'refresh') {
				tabItem.pageIndex = 0;
				// #ifdef APP-PLUS
				tabItem.refreshing = true;
				// #endif
			}

			//获取指定列表数据
			let query = {
				pageIndex: ++tabItem.pageIndex,
				pageSize: 50,
				sortBy: '',
				agentid: this.agentid,
				dl_type: this.dl_type,
				xt_id: this.xt_id,
				dl_type2: '4',
				descending: false,
				filter: {
					pass: tabItem.pass,
					userName: '',
					userCode: ''
				}
			};
			getAgentPagedList(query).then(async res => {
				if (type === 'refresh') {
					tabItem.newsList = []; //刷新前清空数组
				}
				res.rows.forEach(item => {
					if (item.pass == '0') {
						item.passName = '已签约';
					} else if (item.pass == '1' || item.pass == '3') {
						item.passName = '未开通';
					} else if (item.pass == '2') {
						item.passName = '待审核';
					}
					tabItem.newsList.push(item);
				});
				tabItem.totalPages = res.totalCount;

				//下拉刷新 关闭刷新动画
				if (type === 'refresh') {
					this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
					// #ifdef APP-PLUS
					tabItem.refreshing = false;
					// #endif
					tabItem.loadMoreStatus = 0;
				}

				//上滑加载 处理状态
				if (type === 'add') {
					console.log(tabItem.pageIndex, tabItem.totalPages);
					tabItem.loadMoreStatus = tabItem.pageIndex >= tabItem.totalPages ? 2 : 0;
				}
			});
		},

		//下拉刷新
		onPulldownReresh() {
			this.loadNewsList('refresh');
		},

		//上滑加载
		loadMore() {
			this.loadNewsList('add');
		},

		//================================

		//新闻详情
		navToDetails(item) {
			let data = {
				id: item.id,
				title: item.title,
				author: item.author,
				time: item.time
			};
			let url = item.videoSrc ? 'videoDetails' : 'details';

			uni.navigateTo({
				url: `/pages/details/${url}?data=${JSON.stringify(data)}`
			});
		},

		//设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
		setEnableScroll(enable) {
			if (this.enableScroll !== enable) {
				this.enableScroll = enable;
			}
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
					this.loadNewsList('add');
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
