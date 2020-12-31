import { App } from 'vue'
import Cascade from './index.vue'

export { Cascade }

export default (app: App): void => {
  app.component(Cascade.name, Cascade)
}
