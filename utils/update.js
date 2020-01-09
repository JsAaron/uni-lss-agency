import {
	upgrade
} from '@/api/user';
import setting from '@/setting.js';
import {
	getPlatform
} from './layer.js'
import {
	cookies
} from './cookies.js'

/**
 * 安卓应用的检测更新实现
 */
export function detectionAndroidUpdate(fn) {
	if (getPlatform() === 'android') {
		upgrade({
			appType: '3',
			appVersion: setting.releases.version.split('.').join(''),
			xt_id: cookies.get('xt_id')
		}).then(data => {
			data = JSON.parse(data);
			if (data.ssupdate == 1) {
				fn(data)
			}
		}).catch((res) => {
			console.log(res)
		})
	}
}
