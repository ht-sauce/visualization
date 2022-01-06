import { addCache, getCache, clearCache } from './cache'
import { config } from '../config'

export function isSupportSendBeacon() {
  return !!window.navigator?.sendBeacon
}

export function reportXHR(data: object) {
  const xhr = new XMLHttpRequest()
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
  xhr.responseType = 'json'
  xhr.timeout = 10000 // 10秒
  xhr.open('POST', config.url as string, false)
  xhr.send(JSON.stringify(data))
}

// 自动选择上报方式
const sendBeacon = (data: object) => {
  if (isSupportSendBeacon()) {
    window.navigator.sendBeacon(config.url as string, JSON.stringify(data))
  } else {
    reportXHR(data)
  }
}
// 上报函数
export function report(data: object, isImmediate = false) {
  if (!config.url) {
    console.error('请设置上传 url 地址')
  }

  if (isImmediate) {
    sendBeacon(data)
    return
  }

  // 浏览器空闲的时候执行上报
  if (window.requestIdleCallback) {
    window.requestIdleCallback(
      () => {
        sendBeacon(data)
      },
      { timeout: 3000 }, // 最大延迟
    )
  } else {
    setTimeout(() => {
      sendBeacon(data)
    })
  }
}

// 延时上报
let timer: number
export function lazyReportCache(data: object, timeout = 3000) {
  addCache(data)

  clearTimeout(timer)
  timer = setTimeout(() => {
    const data = getCache()
    if (data.length > 0) {
      report(data)
      clearCache()
    }
  }, timeout)
}
