import { App } from 'vue'
import Icon from './index.vue'

export { Icon }

export default (app: App): void => {
  app.component(Icon.name, Icon)
}
