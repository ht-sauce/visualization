import { App } from 'vue'
import DhtCopy from './directive'

export default {
  install(app: App) {
    app.directive('dht-copy', DhtCopy)
  },
  directive: DhtCopy,
}
