import { App } from 'vue'
import ReachBottom from './index.vue'

export { ReachBottom }

export default (app: App): void => {
  app.component(ReachBottom.name, ReachBottom)
}
