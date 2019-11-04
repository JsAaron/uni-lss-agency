<template>
	<view class="container">
		<m-header></m-header>
		<m-content></m-content>
	</view>
</template>  

<script>
import { mapState, mapActions } from 'vuex';
import { uniDrawer } from '@dcloudio/uni-ui';
import mHeader from './header.vue';
import mContent from './content.vue';
import marketList from '../../components/marketList.vue';
import settingDrawer from '../../components/settingDrawer.vue';
export default {
	data() {
		return {
			bannerList: [],
			noticeList: [],
			recommentMarketList: [],
			marketList: [],
			drawerVisible: false
		};
	},
	onHide() {
		this.drawerVisible = false;
	},
	onNavigationBarButtonTap(e) {
		this.drawerVisible = !this.drawerVisible;
	},
	components: {
		mHeader,
		mContent,
		settingDrawer,
		uniDrawer
	},
	mounted() {
		
	},
	computed: {
		/* ...mapState('home', ['data']),
			content() {
			  return this.data;
			} */
	},
	methods: {
		...mapActions('home', ['getHomeData']),
		/* async initPage() {
			  await this.getHomeData()
			} */

		closeDrawer() {
			this.drawerVisible = false;
		}
	}
};
</script>

<style lang="scss">
	
.container{
	width: 100vw;
	height: 100vh;
	background:$background-color-gray--light;
}
	
</style>
