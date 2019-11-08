<template>
	<view></view>
</template>

<script>
import * as util from '@/utils';
import { $$set, $$get } from '@/common/global';
import simulate from '@/common/simulate';
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

		this.APP_CHECKLOGIN()
			.then(state => {
				console.log(44444444);
				util.gotoPage('switchTab', '/pages/home/index');
			})
			.catch(() => {
				console.log(555555555);
				util.gotoPage('/pages/login/index');
			});
	},
	methods: {
		...mapActions(['APP_CHECKLOGIN'])
	}
};
</script>

<style lang="scss"></style>
