import { App } from 'vue'
import FloatWin from './index.vue'

export { FloatWin }

export default (app: App): void => {
  app.component(FloatWin.name, FloatWin)
}
