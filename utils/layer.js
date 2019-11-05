/*
 * @Author: Aaron
 * @Date: 2019-07-26 22:25:29
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-11 12:10:34
 * @Description: 
 */
function getSystemInfo(arg) {
  var res = uni.getSystemInfoSync()
  return res[arg]
}

/**
 * 操作平台
 * ios 
 */
export function getPlatform() {
  const plat = getSystemInfo("platform")
  return plat
}

/**
 * 获取窗口高度
 */
export function getWindowHeight() {
  return getSystemInfo("windowHeight")
}

export function getWindowWidth() {
  return getSystemInfo("windowWidth")
}


/**
 * 获取元素布局
 * @param {*} e 
 */
export function getRect(selector, callback) {
  uni.createSelectorQuery().select(selector).boundingClientRect(function(rect) {
    callback(rect)
  }).exec()
}

/**
 * 获取内容元素的高度
 * 只有一个容器的情况下
 * @param {*} e 
 */
export function getContainerHeight(selector, callback) {
  getRect(selector, rect => {
    callback(getWindowHeight() - rect.height - rect.top)
  });
}