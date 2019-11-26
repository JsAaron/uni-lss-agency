import setting from '@/setting.js'
import {
	localStorage
} from '@/js_sdk/mp-storage/index.js'

const cookies = {}

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
cookies.set = function(name = 'default', value = '') {
	localStorage.setItem(`lss-${setting.releases.version}-${name}`, value)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function(name = 'default') {
	return localStorage.getItem(`lss-${setting.releases.version}-${name}`)
}


/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function(name = 'default') {
	return localStorage.removeItem(`lss-${setting.releases.version}-${name}`)
}

export {cookies}
