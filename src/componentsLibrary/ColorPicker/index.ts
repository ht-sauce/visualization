import { App } from 'vue'
import ColorPicker from './index.vue'

export { ColorPicker }

export default (app: App): void => {
  app.component(ColorPicker.name, ColorPicker)
}
