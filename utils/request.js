import md5 from "./md5"
import globalConfig from "@/common/config";

/**
 * 字段排序
 */
const objKeySort = arys => {
	var newkey = Object.keys(arys).sort();
	var newObj = {};
	for (var i = 0; i < newkey.length; i++) {
		newObj[newkey[i]] = arys[newkey[i]];
	}
	return newObj;
};

/**
 * 返回通用校验字段
 */
export function processData(data) {
	data.seq = Date.parse(new Date()) + "";
	data.timesamp = new Date().Format("yyyyMMddhhmmss");
	data = objKeySort(data);
	var md5Str = "";
	var d2 = new Array();
	for (var v in data) {
		if (data[v] != null && data[v] != "") {
			md5Str += "&" + v + "=" + data[v];
		}
	}
	var sign = md5.hexMD5(data.seq + data.timesamp);
	data.sign = sign;
	return data;
}

/**
 * 获取返回
 */
export function ajax(config) {
	return new Promise((resolve, reject) => {
		let ajax_data;
		let header = {
			"Content-Type": "application/x-www-form-urlencoded"
		};

		//强制转化string类型
		for (let key in config.data) {
			if (config.data[key] && typeof config.data[key] !== "string") {
				config.data[key] = String(config.data[key])
			}
		}
		
		//加密请求
		if (config.md5Request) {
			ajax_data = config.data;
		} else {
			//普通请求
			ajax_data = {
				reqJson: JSON.stringify(processData(config.data)),
				api: globalConfig.api
			};
		}
		uni.request({
			data: ajax_data,
			url: config.url || globalConfig.requestUrl,
			method: "POST",
			header,
			//return repsone.data {
			//  {retCode: "0001", retMsg: "参数错误,请检查参数合法性"}
			//}
			success: resolve,
			fail: reject
		});
	});
}

/**
 * 统一ajax调用
 * 统一返回的判断
 * items.data.retCode === "0000"
 */
export function unifyAjax(config) {
	return new Promise((resolve, reject) => {
		ajax(config).then(response => {
			if (response.data.retCode == "0000") {
				//统一判断成功
				resolve(response);
			} else {
				reject(response);
			}
		}).catch(errResponse => {
			reject(errResponse);
		});
	});
}

/**
 * 设备使用接口
 */
export function deviceAjax(config) {
	return new Promise((resolve, reject) => {
		uni.request({
			data: JSON.stringify(config.data),
			url: config.url || globalConfig.deviceUrl,
			method: "POST",
			header: {
				//发送json格式数据
				"Content-type": "application/json; charset=utf-8"
			},
			success: resolve,
			fail: reject
		});
	})
}

/**
 * 服务器非对称加密
 */
function serviceMd5(config) {
	return new Promise((resolve, reject) => {
		config.url = globalConfig.md5Url;
		config.md5Request = true;
		ajax(config)
			.then(resolve)
			.catch(reject);
	});
}

/**
 * 带md5的统一请求处理
 * md5Config= ajaxConfig = {
 *  encrypt :{}加密数据
 *  request :{}请求的数据,正式发送，可以覆盖encrypt
 *  funcode 识别码都需要发送
 *  responseType  返回数据类型 "[array object]" 数组对象
 * }
 * return
 *  resolve reject
 */
export function md5Ajax(config) {
	return new Promise((resolve, reject) => {
		const funcode = config.funcode;

		//加密请求
		serviceMd5(Object.assign(config.encrypt, {
			//请求参数,合并funcode
			funcode
		})).then(md5Response => {
			//合并md5Response.data参数
			let ajaxData = {
				data: Object.assign({}, md5Response.data, {
					funcode
				})
			};
			//混入请求的数据
			if (config.request) {
				//request的参数，可以覆盖md5Response.data数据
				Object.assign(ajaxData.data, config.request);
			}

			//发送正式请求
			unifyAjax(ajaxData).then(response => {
				//返回对象合集
				if (config.responseType === "[array object]") {
					resolve([md5Response, response]);
				} else {
					//默认返回请求的
					resolve(response);
				}
			}).catch(reject);

		}).catch(() => {

		});
	});
}

/**
 * 获取手机验证码
 * 需要加密
 * mobileno, vertype,
 * funcode 可配置
 */
export function getPhoneCode(config) {
	return new Promise((resolve, reject) => {
		md5Ajax({
			responseType: config.responseType,
			funcode: config.funcode,
			encrypt: {
				data: {
					mobileno: config.mobileno
				}
			},
			request: {
				vertype: config.vertype
			}
		}).then(oc => {
			resolve(oc);
		}).catch(errResponse => {
			reject(errResponse.data.retMsg);
		});
	});
}

/**
 * 唯一标识
 */
function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

/**
 * 上传文件
 */
export function uploadFile(config) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: "https://lss.facess.net/card-server/oss/webSts",
			method: "get",
			success: res => {
				let filePath = config.filePath || config.path;
				let t = filePath.split(".")
				let imgType = t[t.length - 1]

				let fileName = `${generateUUID()}.${imgType}`
				let keyPath = `${res.data.dir}${fileName}`

				uni.uploadFile({
					url: res.data.host,
					filePath: filePath,
					name: 'file',
					formData: {
						name: "${name}",
						key: keyPath,
						policy: res.data.policy,
						OSSAccessKeyId: res.data.accessid,
						success_action_status: res.data.success_action_status,
						signature: res.data.signature
					},
					success: (res) => {
						resolve(fileName)
					},
					fail: reject
				});
			},
			fail: reject
		});

	})

}

/**
 * 获取银行列表
 */
export function getBankList() {
	return new Promise((resolve, reject) => {
		unifyAjax({
			data: {
				funcode: "0005"
			}
		}).then(resolve).catch(reject);
	});
}

/**
 * 获取业务列表
 */
export function getBusinessList() {
	return new Promise((resolve, reject) => {
		unifyAjax({
			data: {
				funcode: "0018"
			}
		}).then(resolve).catch(reject);
	});
}
