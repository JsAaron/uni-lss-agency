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

