<template>

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

</style>
