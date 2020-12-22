import { App } from 'vue'
import DhtClickOutside from './directive'

export default {
  install(app: App) {
    app.directive('dht-click-outside', DhtClickOutside)
  },
  directive: DhtClickOutside,
}
