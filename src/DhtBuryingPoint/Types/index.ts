export interface InitOpt {
  url: string // 发送地址
  time: number // 多久发送一次
  maxStrip: number // 最大存储堆条数
}

// 地理位置
export interface geolocation {
  latitude: number | null
  longitude: number | null
}

// 基础发送数据格式
export interface defaultData {
  timestamp: number // 时间戳
  language: string // 语言
  userAgent: string // 操作系统
  // 地理位置
  geolocation: geolocation
  os: string // 操作系统
  // 页面分辨率
  scr: {
    width: number
    height: number
  }
  userId: string | number // 用户id
  url: string // 页面地址
}
