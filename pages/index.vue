<template>
	<view></view>
</template>

<script>
import * as util from '@/utils';
import { $$set, $$get } from '@/common/global';
import { mapActions } from 'vuex';
export default {
	components: {},
	data() {
		return {};
	},
	props: {},
	created() {},
	onLoad() {
		this.APP_CHECKLOGIN()
			.then(state => {
				console.log(44444444)
				util.gotoPage('switchTab', '/pages/home/index');
			}) 
			.catch(() => {
				console.log(555555555)
				util.gotoPage('/pages/login/index');
			});
	},
	methods: {
		...mapActions(['APP_CHECKLOGIN'])
	}
};
</script>

<style lang="scss"></style>
