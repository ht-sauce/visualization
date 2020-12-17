import { App } from 'vue'

import DhtPopup from './Popup'
import Popper from './Popper'
import ColorPicker from './ColorPicker'

// 批量注册列表
const component = [DhtPopup, ColorPicker, Popper]
// 全局默认配置
interface InstallOptions {
  zIndex: number
}
const defaultInstallOpt = {
  zIndex: 1000,
}

const install = (app: App, opt: InstallOptions = defaultInstallOpt): void => {
  component.forEach(component => {
    app.use(component)
  })

  app.config.globalProperties.$DHT = opt
}

export { install, DhtPopup }

export default {
  install,
}
