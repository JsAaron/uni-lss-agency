import axios from '@/js_sdk/gangdiedao-uni-axios'

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("请求地址：" + req.url, req.data || req.params)
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	if (process.env.NODE_ENV === 'development') {
		console.log(`${res.config.url}响应结果：`, res)
	}
}

// 创建自定义接口服务实例
const service = axios.create({
	baseURL: "http://47.104.153.115:8080/7080Sys",
	timeout: 6000,
	// #ifdef H5
	withCredentials: true,
	// #endif
	// headers: {
	// 	'Content-Type': 'application/json',
	// 	//'X-Requested-With': 'XMLHttpRequest',
	// },
})

// 拦截器 在请求之前拦截
service.interceptors.request.use(config => {
	// code...

	// 在请求发送之前做一些处理
	// if (!(/^https:\/\/|http:\/\//.test(config.url))) {
	// 	const token = util.cookies.get('token')
	// 	if (token && token !== 'undefined') {
	// 		// 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
	// 		config.headers['Authorization'] = 'Bearer ' + token
	// 	}
	// }
	return config
}, error => {
	// 发送失败
	Promise.reject(error)
})

// 拦截器 在请求之后拦截
service.interceptors.response.use(response => {
	const res = response.data;
	if (res.code !== 200) {
		return Promise.reject(res.msg);
	} else {
		return res.data;
	}
}, error => {
	return Promise.reject(error)
})

export default service
