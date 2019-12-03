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
				<scroll-view class="panel-scroll-box" scroll-y="true" >
					<child1 :agentid="agentid" v-if="index == 0"></child1>
					<child2 :agentid="agentid" v-if="index == 1"></child2>
					<child3 v-if="index == 2"></child3>
					<child4 v-if="index == 3"></child4>
					<child5 v-if="index == 4"></child5>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import * as util from '@/utils';
import uniIcon from '@/components/uni-icon/uni-icon';
import { getAgentPagedList } from '@/api/agent';
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
			tabCurrentIndex: 0, //当前选项卡索引
			scrollLeft: 0, //顶部选项卡左滑距离
			enableScroll: true,
			tabBars: []
		};
	},
	onLoad(options) {
		let data = {
			appid: '',
			city: '',
			mch_id: '',
			fws_type: '',
			sinaOpenId: '',
			is_sole: '',
			businessid_two: '',
			agentchanneltype: 1,
			roleId: '',
			gm_wx_agentid: '',
			three_type_name: '图书音像/文具乐器',
			agent_shop: '',
			prize_pz_id: '',
			municipal_agent: '',
			tjagentid: '70800072265474',
			sumAmt: 0,
			sub_mch_id: '',
			join_time: '',
			qy_agent: '',
			agenttype: 0,
			latitude: '',
			xt_id: '5f88e268-aa9a-47d7-bd76-6e31da8694f3',
			accPasswd: '',
			freezeAmt: 0,
			user_level: '',
			shop_tel: '',
			type_agentid: '',
			tradingareaid: '',
			agent_face: '',
			face_device: '',
			is_signing: '',
			one_type_name: '个体工商户',
			lastLoginTime: null,
			create_times: '2019-12-02 14:35:16',
			qqOpenId: '',
			contractendate: '2020-12-24',
			areaid: '',
			idcards_back: '',
			identitynum: '',
			type_id: 0,
			businessid: '',
			three_type: '35',
			is_fws: '',
			usertypeId: 0,
			accessIp: '',
			prov_cd: '430000',
			mobileNo: '13787166275',
			contractno: '',
			areaname: '',
			two_type_name: '线下零售',
			roleName: '',
			type: '',
			password: '',
			agentlogo: '',
			pay_type: '',
			wx_appid: '',
			userId: 4184,
			avatarUrl: '',
			idcards_hand: '',
			province: '',
			userName: 'Derek文具店',
			actUrl: '',
			compaddress: '岳麓区新民路403号',
			longitude: '',
			openid: '',
			headimgurl: '',
			lm_agent: '',
			one_type: '1',
			isfact: 0,
			userCode: '13787166274',
			isAdd: '0',
			iszt: '',
			agentid: '70800072265475',
			salesman: '',
			industry_license: '',
			business_number: '',
			email: '1773219087@qq.com',
			open_payment: '',
			legal: '黎康',
			desc_content: '',
			provincial_agent: '',
			sex: 0,
			zmImage: '',
			dl_type: '4',
			fws_agentid: '',
			is_signingimg: '',
			gm_wx_appid: '',
			contractstdate: '2019-12-31',
			app_auth_token: '',
			cashing: 0,
			packType: 0,
			qrcodeid: '',
			agentname: 'Derek文具店',
			qq_amt: 0,
			real_shop: '',
			two_type: '6',
			pass: '0',
			pagentid: '易惠易购',
			wx_key: '',
			faceid: '',
			cityname: '',
			parts_no: '',
			idcards_front: '',
			disabled: 0,
			passName: '已签约'
		};
		this.options = data;
		this.agentid = this.options.agentid;
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
		},

		//================================

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
	height:100%;
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
