import { App } from 'vue'
import DhtColorPicker from './index.vue'

export { DhtColorPicker }

export default (app: App): void => {
  app.component(DhtColorPicker.name, DhtColorPicker)
}
