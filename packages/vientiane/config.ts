import generateUid from './utils/generateUid'
type Config = {
  [key: string]: string | number
  sign: string
  uid: string // 当前埋点的标志
  url: string
  appid: number
  userid: number
}

const config: Config = {
  sign: 'vientiane',
  uid: generateUid(),
  url: '',
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
