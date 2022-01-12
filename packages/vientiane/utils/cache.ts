import { deepCopy } from './utils'
import { config } from '../config'
const cache: object[] = []

export function getCache() {
  return deepCopy(cache)
}

export function baseData(data: object) {
  const { appid, uid, userid, appType } = config
  return {
    ...data,

    timestamp: new Date().getTime(), // 时间戳到毫秒
    location: window.location.href, // 当前地址
    appid,
    uid,
    appType,
    userid,
  }
}

export function addCache(data: object) {
  const { appid, uid } = config
  if (!appid) return console.info('未设置平台id')
  if (!uid) return console.info('唯一标识丢失')

  // 所有上报必定需要的字段部分
  const dataCopy = baseData(data)

  cache.push(dataCopy)
}

export function clearCache() {
  cache.length = 0
}
