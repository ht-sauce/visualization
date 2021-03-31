import { App } from 'vue'
import DhtCopy from './directive'
import Copy from './Copy'
export default {
  install(app: App) {
    app.directive('dht-copy', DhtCopy)
  },
  directive: DhtCopy,
  Copy: Copy,
}
