import { App } from 'vue'
import DhtMove from './directive'

export default {
  install(app: App) {
    app.directive('dht-move', DhtMove)
  },
  directive: DhtMove,
}
