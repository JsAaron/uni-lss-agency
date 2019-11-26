import request from '@/plugin/axios'

export function AccountLogin(data) {
	return request({
		url: '/moblieapp/login',
		method: 'post',
		data
	})
}
