import generateUid from './utils/generateUid'

// 平台类型，初始由前端定义，后端需要存储枚举值
export enum AppType {
  pc = 'pc', // 电脑端
  wechatApplet = 'wechat-applet', // 微信小程序
  alipayApplet = 'alipay-applet', // 支付宝小程序
}

type Config = {
  [key: string]: undefined | string | number | object | []
  sign?: string
  uid?: string // 当前埋点的标志
  url?: string // 上报地址
  appid?: string // 平台标志
  appType?: string
  SonType?: string
  userid?: number | string // 用户标识
}

const config: Config = {
  sign: 'vientiane',

  url: '',

  uid: generateUid(),
  appid: '',
  userid: 0,
  appType: AppType.pc,
}

// 生成缓存uid
export function generateStorageUid() {
  const sign = config.sign + '-uid'
  if (localStorage.getItem(sign)) {
    config.uid = localStorage.getItem(sign) as string
  } else {
    config.uid = generateUid()
    localStorage.setItem(sign, config.uid)
  }
}

function setConfig(options: Config): void {
  for (const key in config) {
    if (options[key]) {
      config[key] = options[key]
    }
  }
}

export { config, setConfig, Config }
