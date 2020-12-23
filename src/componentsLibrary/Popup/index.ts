import { App } from 'vue'
import DhtPopup from './index.vue'

export { DhtPopup }

export default (app: App): void => {
  app.component(DhtPopup.name, DhtPopup)
}
