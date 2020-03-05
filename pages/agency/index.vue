<template>
	<view class="container">
		<view class="container-top">
			<view class="container__segmented">
				<uni-segmented-control
					:current="segmented.current"
					:values="segmented.items"
					:style-type="segmented.styleType"
					:active-color="segmented.activeColor"
					@clickItem="onClickSegmented"
				/>
				<view v-if="showAdd" class="container__add" @click="onAdd">{{ addTitle }}</view>
			</view>

			<!-- 顶部选项卡 -->
			<scroll-view
				id="nav-bar"
				class="nav-bar"
				scroll-x
				scroll-with-animation
				:scroll-left="scrollLeft"
			>
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
		</view>

		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh
			ref="mixPulldownRefresh"
			class="panel-content"
			:top="segmented.top"
			@refresh="onPulldownReresh"
			@setEnableScroll="setEnableScroll"
		>
			<!-- 内容部分 -->
			<swiper
				id="swiper"
				class="swiper-box"
				:duration="300"
				:current="tabCurrentIndex"
				@change="changeTab"
			>
				<swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
					<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore">
						<view
							v-for="(item, index) in tabItem.newsList"
							:key="index"
							class="content__row lss-hairline--bottom"
							@click="navToDetails(index)"
						>
							<view class="content__left">
								<view class="content__name">{{ item.userName }}</view>
								<view class="content__code">{{ item.mobileNo }}</view>
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
import { mapActions } from 'vuex';
import uniIcon from '@/components/uni-icon/uni-icon';
import { getAgentPagedList } from '@/api/agent';
import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import mixLoadMore from '@/components/mix-load-more/mix-load-more';

let app = getApp();

let windowWidth = 0,
	scrollTimer = false,
	tabBar;

let tabList = [
	{
		name: '全部',
		pass: ''
	},
	{
		name: '已签约',
		pass: '3'
	},
	{
		name: '待审核',
		pass: '2'
	}
];

export default {
	components: {
		uniIcon,
		mixPulldownRefresh,
		mixLoadMore,
		uniSegmentedControl
	},
	data() {
		//-1窝单方，0-合伙人商，1-城市领导人商，2-推广者商，4商家
		let dl_type = util.cookies.get('dl_type');

		let items = [];
		let type;
		if (dl_type == -1) {
			type = 'all';
			items = ['合伙人', '城市领导人', '推广者', '商户'];
		}
		if (dl_type == 0) {
			type = 'one';
			items = ['城市领导人', '推广者', '商户'];
		}
		if (dl_type == 1) {
			type = 'two';
			items = ['推广者', '商户'];
		}
		if (dl_type == 2) {
			type = 'three';
			items = ['商户'];
		}
		return {
			segmented: {
				type: type,
				top: 0,
				items: items,
				current: 0,
				activeColor: '#1aad19',
				styleType: 'button'
			},
			searchForm: {
				userName: '',
				userCode: ''
			},
			tabCurrentIndex: 0, //当前选项卡索引
			scrollLeft: 0, //顶部选项卡左滑距离
			enableScroll: true,
			tabBars: []
		};
	},
	computed: {
		showAdd() {
			return this.tabCurrentIndex == 0 ? true : false;
		},
		addTitle() {
			if (this.segmented.type == 'all') {
				if (this.segmented.current == 0) {
					return '新增代理';
				} else if (this.segmented.current == 1) {
					return '新增代理';
				} else if (this.segmented.current == 2) {
					return '新增代理';
				} else if (this.segmented.current == 3) {
					return '新增商户';
				}
			} else if (this.segmented.type == 'one') {
				if (this.segmented.current == 0) {
					return '新增代理';
				} else if (this.segmented.current == 1) {
					return '新增代理';
				} else if (this.segmented.current == 2) {
					return '新增商户';
				}
			} else if (this.segmented.type == 'two') {
				if (this.segmented.current == 0) {
					return '新增代理';
				} else if (this.segmented.current == 1) {
					return '新增商户';
				}
			} else if (this.segmented.type == 'three') {
				if (this.segmented.current == 0) {
					return '新增商户';
				}
			}
		}
	},
	onShow() {
		// 强制更新状态
		if (app.globalData.agencyVar.action == 'update') {
			this.updateState();
			app.globalData.agencyVar = {};
		}
		//新增强制刷新
		if (app.globalData.agencyVar.action == 'add') {
			this.loadNewsList('refresh');
			app.globalData.agencyVar = {};
		}
		// 未开通，审核
		if (app.globalData.agencyVar.action == 'examine') {
			this.loadNewsList('refresh');
			app.globalData.agencyVar = {};
		}
	},
	async onLoad() {
		this.agentid = util.cookies.get('agentid');
		this.dl_type = util.cookies.get('dl_type');
		this.xt_id = util.cookies.get('xt_id');
		windowWidth = uni.getSystemInfoSync().windowWidth;
		let height = await util.getContainerHeight('.container-top');
		this.segmented.top = height * 2;
		this.initTabbars();
	},
	methods: {
		updateState() {
			let tabItem = this.tabBars[this.tabCurrentIndex];
			if (tabItem.newsList) {
				tabItem.newsList.map((item, index) => {
					if (item.agentid == app.globalData.agencyVar.agentid) {
						Object.assign(item, app.globalData.agencyVar.agentData);
					}
				});
			}
		},

		/**
		 * 新增代理用户
		 */
		onAdd() {
			let title;
			let pageType = 'agency';
			let dl_type = '';

			if (this.segmented.type == 'all') {
				if (this.segmented.current == 0) {
					title = '新增合伙人商';
					dl_type = 0;
				} else if (this.segmented.current == 1) {
					title = '新增城市领导人商';
					dl_type = 1;
				} else if (this.segmented.current == 2) {
					title = '新增推广者商';
					dl_type = 2;
				} else if (this.segmented.current == 3) {
					title = '新增商户';
					dl_type = 4;
					pageType = 'business';
				}
			} else if (this.segmented.type == 'one') {
				if (this.segmented.current == 0) {
					title = '新增城市领导人商';
					dl_type = 1;
				} else if (this.segmented.current == 1) {
					title = '新增推广者商';
					dl_type = 2;
				} else if (this.segmented.current == 2) {
					title = '新增商户';
					dl_type = 4;
					pageType = 'business';
				}
			} else if (this.segmented.type == 'two') {
				if (this.segmented.current == 0) {
					title = '新增推广者商';
					dl_type = 2;
				} else if (this.segmented.current == 1) {
					title = '新增商户';
					dl_type = 4;
					pageType = 'business';
				}
			} else if (this.segmented.type == 'three') {
				if (this.segmented.current == 0) {
					title = '新增商户';
					dl_type = 4;
					pageType = 'business';
				}
			}
			util.gotoPage(
				`/pages/agency/access?title=${title}&pageType=${pageType}&action=add&dl_type=${dl_type}`
			);
		},

		onClickSegmented(index) {
			if (this.segmented.current !== index) {
				this.segmented.current = index;
				this.resetTabbars(index);
			}
		},

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

		resetTabbars(tabIndex) {
			this.tabCurrentIndex = 0;
			this.tabBars.map((item, index) => {
				if (index == 2) {
					item.name = tabIndex == 3 ? '未签约' : '待审核';
				}
				item.loaded = false;
				item.pageIndex = 0;
				item.totalPages = 0;
				item.newsList = [];
				item.loadMoreStatus = 0;
				item.refreshing = 0;
			});
			this.loadNewsList('add');
		},

		oneParam(param) {
			param.dl_type2 = '0';
			if (this.tabCurrentIndex == 0) {
			} else if (this.tabCurrentIndex == 1) {
				param.state_type = '0';
			} else if (this.tabCurrentIndex == 2) {
				param.state_type = '2';
			}
		},

		twoParam(param) {
			param.dl_type2 = '1';
			if (this.tabCurrentIndex == 1) {
				param.state_type = '0';
			} else if (this.tabCurrentIndex == 2) {
				param.state_type = '2';
			}
		},

		threeParam(param) {
			param.dl_type2 = '2';
			if (this.tabCurrentIndex == 1) {
				param.state_type = '0';
			} else if (this.tabCurrentIndex == 2) {
				param.state_type = '2';
			}
		},

		shopParam(param) {
			param.dl_type2 = '4';
			if (this.tabCurrentIndex == 1) {
				param.state_type = '0';
			} else if (this.tabCurrentIndex == 2) {
				param.state_type = '2';
			}
		},

		getQueryParam() {
			let param = {};

			if (this.segmented.type == 'all') {
				if (this.segmented.current == 0) {
					this.oneParam(param);
				} else if (this.segmented.current == 1) {
					this.twoParam(param);
				} else if (this.segmented.current == 2) {
					this.threeParam(param);
				} else if (this.segmented.current == 3) {
					this.shopParam(param);
				}
			}

			//一级
			if (this.segmented.type == 'one') {
				if (this.segmented.current == 0) {
					this.twoParam(param);
				} else if (this.segmented.current == 1) {
					this.threeParam(param);
				} else if (this.segmented.current == 2) {
					this.shopParam(param);
				}
			}

			//城市领导人商，二项
			if (this.segmented.type == 'two') {
				if (this.segmented.current == 0) {
					this.threeParam(param);
				} else if (this.segmented.current == 1) {
					this.shopParam(param);
				}
			}

			//推广者商，一项
			if (this.segmented.type == 'three') {
				if (this.segmented.current == 0) {
					this.shopParam(param);
				}
			}

			return param;
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

			//合伙人
			let query = {
				pageIndex: ++tabItem.pageIndex,
				pageSize: 30,
				sortBy: '',
				agentid: this.agentid,
				dl_type: this.dl_type,
				xt_id: this.xt_id,
				descending: false,
				filter: {
					userCode: '',
					userName: ''
				},
				filter: this.searchForm,
				sortBy: ''
			};

			Object.assign(query, this.getQueryParam());

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
						item.passName = this.segmented.current == 3 ? '未签约' : '待审核';
					} else if (item.pass == '5') {
						item.passName = '待服务商审核签约';
					}
					tabItem.newsList.push(item);
				});

				tabItem.totalPages = res.totalpage;

				//下拉刷新 关闭刷新动画
				if (type === 'refresh') {
					this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
					// #ifdef APP-PLUS
					tabItem.refreshing = false;
					// #endif
					tabItem.loadMoreStatus = 0;
				}

				//上滑加载.刷新处理状态
				if (type === 'add' || type == 'refresh') {
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

		getDetailsParam() {
			let title;
			let pageType = 'agency';
			if (this.segmented.type == 'all') {
				if (this.segmented.current == 0) {
					title = '合伙人商信息';
				} else if (this.segmented.current == 1) {
					title = '城市领导人商信息';
				} else if (this.segmented.current == 2) {
					title = '推广者商信息';
				} else if (this.segmented.current == 3) {
					title = '商户信息';
					pageType = 'business';
				}
			}

			if (this.segmented.type == 'one') {
				if (this.segmented.current == 0) {
					title = '城市领导人商信息';
				} else if (this.segmented.current == 1) {
					title = '推广者商信息';
				} else if (this.segmented.current == 2) {
					title = '商户信息';
					pageType = 'business';
				}
			}

			if (this.segmented.type == 'two') {
				if (this.segmented.current == 0) {
					title = '推广者商信息';
				} else if (this.segmented.current == 1) {
					title = '商户信息';
					pageType = 'business';
				}
			}

			if (this.segmented.type == 'three') {
				if (this.segmented.current == 0) {
					title = '商户信息';
					pageType = 'business';
				}
			}

			return {
				title,
				pageType
			};
		},

		//新闻详情
		navToDetails(index) {
			let tabItem = this.tabBars[this.tabCurrentIndex];
			let data = tabItem.newsList[index];
			let param = this.getDetailsParam();
			util.gotoPage(
				`/pages/agency/access?agentData=${JSON.stringify(data)}&title=${param.title}&pageType=${
					param.pageType
				}`
			);
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
			}, 100);
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
	&__segmented {
		position: relative;
		padding-top: 20rpx;
	}
	&__add {
		font-size: 22rpx;
		position: absolute;
		right: 10rpx;
		top: 32rpx;
		color: #1aad19;
		&:active {
			color: #000000;
		}
	}
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
			border-bottom: 4upx solid #1aad19;
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			transition: 0.3s;
		}
	}
	.current {
		color: #1aad19;
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
		max-width: 500rpx;
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
		color: #1aad19;
	}
}
</style>
