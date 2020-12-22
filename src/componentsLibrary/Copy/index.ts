import { App } from 'vue'
import Copy from './directive'

export default {
  install(app: App) {
    app.directive('dht-copy', Copy)
  },
  directive: Copy,
}
