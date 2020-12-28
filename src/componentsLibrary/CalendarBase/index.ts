import { App } from 'vue'
import CalendarBase from './index.vue'

export { CalendarBase }

export default (app: App): void => {
  app.component(CalendarBase.name, CalendarBase)
}
