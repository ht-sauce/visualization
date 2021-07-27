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
export interface DefaultData {
  timestamp: number // 时间戳
  userAgent: string // 操作系统
  os: string // 操作系统
  // 页面分辨率
  scr: {
    width: number
    height: number
  }
  url: string // 页面地址
  userId: string | number // 用户id
  uuid: string // 访客唯一标识
}
