import { App } from 'vue'
import Popup from './index.vue'

export { Popup }

export default (app: App): void => {
  app.component(Popup.name, Popup)
}
