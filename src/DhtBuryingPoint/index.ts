import { InitOpt, DefaultData } from './Types'
import { getUuid } from './Tool'
export default class DhtBuryingPoint {
  uuid: string = ''
  constructor(opt: InitOpt) {
    this.uuid = getUuid()
  }
  // 获取默认系统自带数据
  private getDefaultData(): DefaultData {
    const { userAgent } = navigator
    const defaultData: DefaultData = {
      userAgent,
      timestamp: new Date().getTime(),
      url: window.location.href,
      scr: {
        width: window.screen.width,
        height: window.screen.height,
      },
      os: userAgent,
      userId: 1231,
      uuid: this.uuid,
    }

    // this.defaultData.geolocation = await getGeolocation()

    return defaultData
  }
  // 内部发送数据
  private send(SendData: any) {
    console.log(SendData)
  }
  // 自定义发送数据
  customSend(SendData: any) {
    this.ajax(SendData)
  }
  // 发送接口函数
  private ajax(SendData: any) {
    console.log(1)
  }
}
