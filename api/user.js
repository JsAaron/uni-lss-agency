import request from '@/plugin/axios'

export function getCheckUser(data) {
	return request({
		url: '/moblieapp/checkUser',
		method: 'post',
		data: data
	})
}


export function upgrade(data){
	return request({
		url: '/moblieapp/versionUpgrade',
		method: 'post',
		data: data
	})
} 