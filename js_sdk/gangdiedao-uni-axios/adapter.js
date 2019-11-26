import { isObject, isString } from 'axios/lib/utils'

import createError from 'axios/lib/core/createError'
import buildUrl from 'axios/lib/helpers/buildURL'
import settle from 'axios/lib/core/settle'

export const adapter = config => {
  return new Promise((resolve, reject) => {
    const requestMethod = (isString(config.method) ? config.method : 'GET').toUpperCase()
    const requestUrl = buildUrl(config.url, config.params, config.paramsSerializer)
    const requestHeaders = isObject(config.headers) ? config.headers : {}

    // 请求数据
    let requestData = config.data

    // 请求任务
    let requestTask = null

    // 中断请求任务
    let abortRequestTask = null

    // 普通请求
    if (!requestTask) {
      const request = uni.request({
        method: requestMethod,
        url: requestUrl,
        header: requestHeaders,
        data: requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'PATCH' ? requestData : '',
        responseType: config.responseType === 'arraybuffer' ? 'arraybuffer' : 'text',
        dataType: config.responseType === 'json' ? 'json' : config.responseType,
      })
      abortRequestTask = request.abort
      requestTask = request.then(([error, res]) => {
        return {
          data: res.data,
          status: res.statusCode,
          statusText: '',
          headers: res.header,
          config: config,
          request: request,
        }
      })
    }

    // 请求任务结果处理
    requestTask
      .then(response => {
        settle(resolve, reject, response)
      })
      .catch(() => {
        const error = createError('网络错误', config, undefined, requestTask)
        reject(error)
      })

    // 支持取消请求任务
    if (config.cancelToken) {
      config.cancelToken.promise.then(cancel => {
        abortRequestTask && abortRequestTask()
        reject(cancel)
      })
    }
  })
}
