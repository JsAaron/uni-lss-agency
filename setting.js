export default {
	
	// 数据请求的api接口
	baseURL:'https://lss.facess.net/7080Sys',
	
	//上传图片处理
	imgPrefixUrl:'https://img.facess.net',	//图片域名替换地址'
	impUpLoadUrl:'https://lss.facess.net/7080Sys/moblieapp/currencyUpload', // 服务器地址(上传图片)

	appName:'消费鼓励金 代理商版',
	
	// 版本
	releases: {
		version: "2.0.4"
	},
	
	// 在读取持久化数据失败时默认用户信息
	user: {
		info: {
			name: 'Ghost'
		}
	}
} 
