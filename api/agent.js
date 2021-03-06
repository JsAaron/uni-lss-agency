import request from '@/plugin/axios'

export function getPassword(data) {
	return request({
		url: '/moblieapp/getPassword',
		method: 'post',
		data: data
	})
}


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
	return request({
		url: '/moblieapp/getStatisticsHomePay',
		method: 'post',
		params: data
	})
}

export function saveAgent(data) {
	return request({
		url: '/moblieapp/AgentSave',
		method: 'post',
		data: data
	})
}

export function getShareAgent(data) {
	return request({
		url: '/moblieapp/getShareAgent',
		method: 'post',
		params: data
	})
}


export function saveShareAgent(data) {
	return request({
		url: '/moblieapp/ShareAgentSave',
		method: 'post',
		data: data
	})
}


export function getStatisticsJymx(data) {
	return request({
		url: '/moblieapp/getStatisticsJymx',
		method: 'post',
		params: data
	})
}

export function getMobileOrderPagelistJymx(query) {
	return request({
		url: '/moblieapp/mobileOrderPagelistJymx',
		method: 'post',
		params: query
	})
}

export function getStatisticsHome(data) {
	return request({
		url: '/moblieapp/getStatisticsHome',
		method: 'post',
		params: data
	})
}

export function getStatisticsOrderYj(data) {
	return request({
		url: '/moblieapp/getStatisticsOrderYj',
		method: 'post',
		params: data
	})
}

export function saveAgentNewJjOne(data) {
	return request({
		url: '/moblieapp/AgentSaveNewJjOne',
		method: 'post',
		data: data
	})
}

export function saveAgentNewJjTwo(data) {
	return request({
		url: '/moblieapp/AgentSaveNewJjTwo',
		method: 'post',
		data: data
	})
}

export function saveAgentNewJjThree(data) {
	return request({
		url: '/moblieapp/AgentSaveNewJjThree',
		method: 'post',
		data: data
	})
}
