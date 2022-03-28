import Vue from 'vue'
export function useData(self) {
  return Vue.observable({
    showYear: self.year,
    showMonth: self.month,
    // 首尾选择日期，
    firstLastDate: [],
    // 是否按住ctrl键
    ctrlKey: false,
  })
}
