import { App } from 'vue'
import DhtResize from './index.vue'

export { DhtResize }

export default (app: App): void => {
  app.component(DhtResize.name, DhtResize)
}
