import { App } from 'vue'
import DhtPopper from './index.vue'

export { DhtPopper }

export default (app: App): void => {
  app.component(DhtPopper.name, DhtPopper)
}
