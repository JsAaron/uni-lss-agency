import request from '@/plugin/axios'

export function getAgentPagedList(query) {
	return request({
		url: '/moblieapp/agentPagedlist',
		method: 'post',
		params: query
	})
}

export function getPerfectAgent(query) {
	return request({
		url: '/moblieapp/getPerfectAgent',
		method: 'post',
		params: query
	})
}


export function getShopsType(data) {
	return request({
		url: '/moblieapp/getShopsType',
		method: 'post',
		params: data
	})
}


export function getStatisticsHomedl(data) {
	return request({
		url: '/moblieapp/getStatisticsHomedl',
		method: 'post',
		params: data
	})
}

export function saveAgentJjOne(data) {
	console.log(data)
	return request({
		url: '/moblieapp/AgentSaveJjOne',
		method: 'post',
		data: data
	})
}

export function getProvcd(data) {
	return request({
		url: '/moblieapp/getProvcd',
		method: 'post',
		params: data
	})
}
