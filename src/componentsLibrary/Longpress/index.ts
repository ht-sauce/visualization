import { App } from 'vue'
import Longpress from './directive'

export default {
  install(app: App) {
    app.directive('dht-longpress', Longpress)
  },
  directive: Longpress,
}
