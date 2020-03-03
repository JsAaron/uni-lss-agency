import request from '@/plugin/axios'

export function getOneclass(data) {
	console.log(data)
	return request({
		url: '/moblieapp/getOneclass',
		method: 'post',
		data: data
	})
}
