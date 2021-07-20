import { InitOpt, defaultData } from './Types'
import { getGeolocation } from './Tool'
export default class DhtBuryingPoint {
  constructor(opt: InitOpt) {
    console.log(window.screen)
  }
  // 获取默认系统自带数据
  private async getDefaultData() {
    const { language, userAgent } = navigator
    const defaultData = {
      language,
      userAgent,
      timestamp: new Date().getTime(),
      url: window.location.href,
      scr: {
        width: window.screen.width,
        height: window.screen.height,
      },
    } as defaultData

    // this.defaultData.geolocation = await getGeolocation()
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
