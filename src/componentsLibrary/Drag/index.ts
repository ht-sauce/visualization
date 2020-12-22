import { App } from 'vue'
import Drag from './index.vue'

export { Drag }

export default (app: App): void => {
  app.component(Drag.name, Drag)
}
