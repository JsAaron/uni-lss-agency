import {
	$$set,
	$$get
} from '@/common/global';

import {
	md5Ajax
} from './request'

import {
	isEmpty
} from './lang'


//=========================
//	登录数据数据接口存取
//=========================

/**
 * 登录数据数据接口存取
 * logout true 注销清理
 */
export function accessLogin() {
	return new Promise((resolve, reject) => {
		md5Ajax({
			funcode: "0147",
			encrypt: {
				data: {
					openid: $$get.openid()
				}
			},
			request: {
				avatarUrl: $$get.avatarUrl(),
				nickName: $$get.nickName()
			}
		}).then(response => {
			if (response.data) {
				$$set.login(response.data)
				resolve();
			} else {
				reject()
			}
		}).catch(reject);
	});
}
