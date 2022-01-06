import { setConfig } from '../config'
import Bowser from 'bowser'

export function parseNavigator() {
  const navigator = window.navigator
  const { language, userAgent } = navigator

  setConfig({
    language,
    userAgent,
    // useragent解析
    userAgentParse: Bowser.parse(navigator.userAgent),
    timeZoneOffset: new Date().getTimezoneOffset(), // -480 获取时间戳偏移量
  })
}
