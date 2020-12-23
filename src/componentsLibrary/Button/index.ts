import { App } from 'vue'
import DhtButton from './index.vue'

export { DhtButton }

export default (app: App): void => {
  app.component(DhtButton.name, DhtButton)
}
