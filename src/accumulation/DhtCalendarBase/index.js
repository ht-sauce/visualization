import CalendarBase from './src/index.vue'

/* istanbul ignore next */
CalendarBase.install = function (Vue) {
  Vue.component(CalendarBase.name, CalendarBase)
}

export default CalendarBase
