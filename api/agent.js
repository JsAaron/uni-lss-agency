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

export function saveAgentJjTwo(data) {
	return request({
		url: '/moblieapp/AgentSaveJjTwo',
		method: 'post',
		data: data
	})
}

export function saveAgentJjThree(data) {
	return request({
		url: '/moblieapp/AgentSaveJjThree',
		method: 'post',
		data: data
	})
}

export function saveAgentJjFour(data) {
	return request({
		url: '/moblieapp/AgentSaveJjFour',
		method: 'post',
		data: data
	})
}


export function delAgent(data) {
	return request({
		url: '/moblieapp/agentDel',
		method: 'post',
		data: data,
	})
}


export function getStatisticsHomePay(data) {
	console.log(data)
	return request({
		url: '/moblieapp/getStatisticsHomePay',
		method: 'post',
		params: data
	})
}
