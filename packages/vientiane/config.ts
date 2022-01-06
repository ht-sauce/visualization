import generateUid from './utils/generateUid'
type Config = {
  [key: string]: undefined | string | number | object | []
  sign?: string
  uid?: string // 当前埋点的标志
  language?: string
  userAgent?: string
  timeZoneOffset?: number // 获取时间戳偏移量,分钟
  userAgentParse?: object
  url?: string // 上报地址
  appid?: number | string // 平台标志
  userid?: number | string // 用户标识
}

const config: Config = {
  sign: 'vientiane',

  url: '',

  language: '',
  userAgent: '',
  userAgentParse: {}, // 二次解析的useragent
  // 默认为-480,代表中国大部分区域，也可以通过时区差值分钟推算时区和地区
  timeZoneOffset: -480,
  uid: generateUid(),
  appid: 0,
  userid: 0,
}
// 当前唯一标识
const sign = config.sign + '-uid'
if (localStorage.getItem(sign)) {
  config.uid = localStorage.getItem(sign) as string
}

function setConfig(options: Config): void {
  for (const key in config) {
    if (options[key]) {
      config[key] = options[key]
    }
  }
}

export { config, setConfig, Config }
