import { deepCopy } from './utils'
import { config } from '../config'
const cache: unknown[] = []

export function getCache() {
  return deepCopy(cache)
}

export function addCache(data: object) {
  const { appid, uid, userid, language, userAgent, timeZoneOffset } = config
  if (!appid) return console.error('未设置平台id')
  if (!uid) return console.error('唯一标识丢失')

  // 所有上报必定需要的字段部分
  const dataCopy = {
    ...data,

    timestamp: new Date().getTime(), // 时间戳到毫秒
    location: window.location.href, // 当前地址
    language,
    userAgent,
    appid,
    uid,
    userid,
    timeZoneOffset,
  }

  cache.push(dataCopy)
}

export function clearCache() {
  cache.length = 0
}
