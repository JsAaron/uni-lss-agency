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
				util.gotoPage('switchTab', '/pages/home/index');
			})
			.catch(() => {
				util.gotoPage('/pages/login/index');
			});
	},
	methods: {
		...mapActions(['APP_CHECKLOGIN'])
	}
};
</script>

<style lang="scss"></style>
