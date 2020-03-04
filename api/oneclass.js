import request from '@/plugin/axios'

export function getOneclass(data) {
	return request({
		url: '/moblieapp/getOneclass',
		method: 'post',
		data: data
	})
}


export function getTwoclass(data) {
	return request({
		url: '/moblieapp/getTwoclass',
		method: 'post',
		params: data
	})
}
