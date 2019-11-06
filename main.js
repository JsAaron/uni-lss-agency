import Vue from 'vue'
import App from './App'
import store from './store'
import config from '@/common/config'

import {
	unifyAjax,
	md5Ajax,
	gotoPage,
	showBusy,
	hideBusy,
	showToast,
	hideToast,
	showModal,
	accessLogin
} from '@/utils'

import {
	$$set,
	$$get
}
from '@/common/global';


import QSWavesButton from '@/components/QS-WavesButton/QS-WavesButton.vue';
Vue.component('QSWavesButton',QSWavesButton);

/* 全局注册QS-inputs-split组件 */
import QSInput from './components/QS-inputs-split/elements/QS-input/index.vue';
import QSRadio from './components/QS-inputs-split/elements/QS-radio/index.vue';
import QSCheckbox from './components/QS-inputs-split/elements/QS-checkbox/index.vue';
import QSTextarea from './components/QS-inputs-split/elements/QS-textarea/index.vue';
import QSPickerDate from './components/QS-inputs-split/elements/QS-picker-date/index.vue';
import QSPickerCity from './components/QS-inputs-split/elements/QS-picker-city/index.vue';
import QSPickerCustom from './components/QS-inputs-split/elements/QS-picker-custom/index.vue';
import QSPickerCustom2 from './components/QS-inputs-split/elements/QS-picker-custom2/index.vue';
import QSPics from './components/QS-inputs-split/elements/QS-pics/index.vue';
import QSInfinitePics from './components/QS-inputs-split/elements/QS-infinitePics/index.vue';
import QSwitch from './components/QS-inputs-split/elements/QS-switch/index.vue';
Vue.component('QSInput',QSInput);
Vue.component('QSRadio',QSRadio);
Vue.component('QSCheckbox',QSCheckbox);
Vue.component('QSTextarea',QSTextarea);
Vue.component('QSPickerDate',QSPickerDate);
Vue.component('QSPickerCity',QSPickerCity);
Vue.component('QSPickerCustom',QSPickerCustom);
Vue.component('QSPickerCustom2',QSPickerCustom2);
Vue.component('QSPics',QSPics);
Vue.component('QSInfinitePics',QSInfinitePics);
Vue.component('QSwitch',QSwitch);
/*  结束 */


Vue.config.productionTip = false
Vue.prototype.$host = 'https://unidemo.dcloud.net.cn/';

Vue.prototype.$store = store;
Vue.prototype.$api = {
	showBusy,
	hideBusy,
	showToast,
	hideToast,
	showModal,
	gotoPage,
	accessLogin,
	/**
	 * 检测是否已经登录
	 *  hint  是否提示
	 * isBack 是否回退
	 * backUrl 如果是新注册，返回的url，给固码使用
	 */
	hasLogin({
		hint = false,
		isBack = "",
		backUrl = ""
	} = {}) {
		if ($$get.login('taccountid')) {
			return true
		}
		if (hint) {
			showModal({
				content: `亲,您还没有注册/登录哦！`,
				confirmText: "确定",
				success(res) {
					if (res.confirm) {
						console.log('1111111111111111111')
						//	util.gotoPage(`/common/login/login?pageType=user&isBack=${isBack}&backUrl=${backUrl}`)
					}
				}
			})
		}
		return false
	},
	imgDomain: config.imgDomain,
	refresh(callback) {
		callback(() => {
			uni.showNavigationBarLoading()
		}, () => {
			uni.stopPullDownRefresh();
			uni.hideNavigationBarLoading()
		})
	}
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
