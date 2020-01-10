<template>
	<view></view>
</template>

<script>
import * as util from '@/utils';
import simulate from '@/simulate';
import { mapActions } from 'vuex';
export default {
	components: {},
	data() {
		return {};
	},
	props: {},
	created() {},
	onLoad() {

		//跳过广告
		let testUrl = simulate();
		if (testUrl) {
			util.gotoPage('reLaunch', testUrl);
			return;
		}

		this.checklogin()
			.then(state => {
				//#ifdef APP-PLUS-NVUE
				plus.navigator.closeSplashscreen();
				//#endif
				util.gotoPage('switchTab', '/pages/home/index');
			})
			.catch(() => {
				//#ifdef APP-PLUS-NVUE
				plus.navigator.closeSplashscreen();
				//#endif
				util.gotoPage('/pages/login/index');
			});
	},
	methods: {
		...mapActions("account", ["checklogin"])
	}
};
</script>

<style lang="scss"></style>
