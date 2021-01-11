import { App } from 'vue'
import LineTips from './index.vue'

export { LineTips }

export default (app: App): void => {
  app.component(LineTips.name, LineTips)
}
