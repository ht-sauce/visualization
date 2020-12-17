import { App } from 'vue'
import { InstallOptions } from './types/index'
import DhtPopup from './Popup'
import Popper from './Popper'
import ColorPicker from './ColorPicker'

// 批量注册列表
const component = [DhtPopup, ColorPicker, Popper]

const defaultInstallOpt = {
  zIndex: 1000,
}

const install = (app: App, opt: InstallOptions = defaultInstallOpt): void => {
  component.forEach((component) => {
    app.use(component)
  })

  app.config.globalProperties.$DHT = opt
}

export { install, DhtPopup }

export default {
  install,
}
