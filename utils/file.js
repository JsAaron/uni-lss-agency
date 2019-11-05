/**
 * 图片转化编码
 * @param {*} path 
 * @param {*} callback 
 */
const fs = uni.getFileSystemManager()

export function converFileEncode(path, encode) {
  return new Promise((resolve, reject) => {
    fs.readFile({
      filePath: path,
      encoding: encode || "base64",
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 获取文件尺寸
 */
export function getFileSize(path) {
  return new Promise((resolve, reject) => {
    wx.getFileInfo({
      filePath: path,
      complete(res) {
        resolve(res.size)
      }
    })
  })
}