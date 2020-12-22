import { App } from 'vue'
import { InstallOptions } from './types/index'
import DhtPopup from './Popup'
import Popper from './Popper'
import ColorPicker from './ColorPicker'
import Drag from './Drag'
// 指令类插件
import ClickOutside from './ClickOutside'
import Copy from './Copy'

const plugins = [ClickOutside, Copy]

// 批量注册列表
const component = [DhtPopup, ColorPicker, Popper, Drag]

const defaultInstallOpt = {
  zIndex: 1000,
}

const install = (app: App, opt: InstallOptions = defaultInstallOpt): void => {
  component.forEach((component) => {
    app.use(component)
  })

  plugins.forEach((plugin) => {
    app.use(plugin)
  })

  app.config.globalProperties.$DHT = opt
}

export { install, DhtPopup, ColorPicker, Popper, Drag, ClickOutside }

export default {
  install,
}
