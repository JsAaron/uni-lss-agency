import request from '@/plugin/axios'

export function getCheckUser(data) {
	return request({
		url: '/moblieapp/checkUser',
		method: 'post',
		data: data
	})
}
