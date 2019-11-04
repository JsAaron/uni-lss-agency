<template>
	<view class="content">
		<view class="content__title">
			<view class="content__line"></view>
			<view class="content__text">业务员发展商户占比</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	computed: {
		list_() {
			return this.list;
		}
	},
	methods: {
		onClick(e) {}
	}
};
</script>

<style lang="scss">
.content {
	margin-top:50rpx;
	&__title{
		@include flex-h-left;
		font-weight: bold;
		font-size: 30rpx;
	}
	&__line {
		margin: 0 20rpx;
		width: 10rpx;
		height: 30rpx;
		background: rgb(96,168,252);
	}
}
</style>
