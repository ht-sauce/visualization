import { App } from 'vue'
import { InstallOptions } from './types/index'

// 组件类型
import DhtPopup from './Popup'
import DhtPopper from './Popper'
import DhtColorPicker from './ColorPicker'
import DhtDrag from './Drag'
import DhtIcon from './Icon'
import DhtButton from './Button'
import CalendarBase from './CalendarBase'
// 指令类插件
import DhtClickOutside from './ClickOutside'
import DhtCopy from './Copy'
import DhtMove from './Move'

const plugins = [DhtClickOutside, DhtCopy, DhtMove]

// 批量注册列表
const component = [DhtPopup, DhtColorPicker, DhtPopper, DhtDrag, DhtIcon, DhtButton, CalendarBase]

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

export { install, DhtPopup, DhtColorPicker, DhtPopper, DhtDrag, DhtClickOutside }

export default {
  install,
}
