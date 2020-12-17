import { App } from 'vue'
import Popper from './index.vue'

export { Popper }

export default (app: App): void => {
  app.component(Popper.name, Popper)
}
