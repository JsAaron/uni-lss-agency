<script>
import { mapActions, mapMutations } from 'vuex';
export default {
	created() {},
	methods: {
		async getLocation() {
			return await new Promise((resolve, reject) => {
				wx.getLocation({
					success(location) {
						resolve(location);
					},
					fail(err) {
						console.log(err);
						reject(err);
					}
				});
			});
		}
	}
};
</script>

