export default {
	namespaced: true,
	state: {
		agentid: '',
		pass: ''
	},
	actions: {

		setType({
			state,
			dispatch
		}, data) {
			state.agentid = data.agentid
			state.pass = data.pass
		},

		updateType({
			state,
			dispatch
		}, data) {
			state.pass = 2
		}
	},

	getters: {
		getType({
			state,
			dispatch
		}, info) {
			return {
				agentid: state.agentid,
				pass: state.pass
			}
		}
	}
}
