import Bowser from 'bowser'
import { report } from '../utils/report'
import { Type, BaseSonType } from '../types/reportEnum'

// 对浏览器navigator解析
export function parseNavigator() {
  const navigator = window.navigator
  const { language, userAgent } = navigator

  report({
    language,
    userAgent,
    // useragent解析
    userAgentParse: Bowser.parse(navigator.userAgent),
    timeZoneOffset: new Date().getTimezoneOffset(), // -480 获取时间戳偏移量
    type: Type.base,
    sonType: BaseSonType.userAgent,
  })
}
