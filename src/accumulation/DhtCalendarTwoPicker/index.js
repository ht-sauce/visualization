/*
 * 双月单点选择面板，基于DhtCalendarBase再开发
 * */
import DhtCalendarTwoPicker from './src/index.vue'

DhtCalendarTwoPicker.install = function (Vue) {
  Vue.component(DhtCalendarTwoPicker.name, DhtCalendarTwoPicker)
}

export default DhtCalendarTwoPicker
