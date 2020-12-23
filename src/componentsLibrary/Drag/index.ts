import { App } from 'vue'
import DhtDrag from './index.vue'

export { DhtDrag }

export default (app: App): void => {
  app.component(DhtDrag.name, DhtDrag)
}
