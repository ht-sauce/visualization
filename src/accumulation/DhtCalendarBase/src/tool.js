import { ListTypeEnum } from './types'
class CalendarTool {
  // 获取这个月多少天
  monthHowManyDays({ year, month }) {
    const date = new Date(year, month, 0)
    return date.getDate()
  }
  // 这天周几
  getWeekSeveral({ year, month, day }) {
    const date = new Date(`${year},${month},${day}`)
    const Several = date.getDay()
    if (Several === 0) return 7
    else return Several
  }
  // 计算一个月的日周关系
  calculationDayMonth({ oneWeek, months, type }) {
    const list = []
    for (let i = 1; i <= months; i++) {
      list.push({
        day: i,
        week: oneWeek,
        type: type,
      })
      // 星期几推算
      oneWeek++
      if (oneWeek > 7) oneWeek = 1
    }
    return list
  }
  // 固定一行7个，根据第一排是周几，然后推算当月日历数据值
  calculusMouth({ oneWeek, months, oldMonths }) {
    // 当月得到天数和周几对应关系
    let list = []
    list = list.concat(this.calculationDayMonth({ oneWeek, months, type: ListTypeEnum.current }))
    // 得到1号之前的日周关系
    let oldM = oldMonths
    for (let j = 1; j < oneWeek; j++) {
      list.unshift({
        day: oldM,
        week: oneWeek - j,
        type: ListTypeEnum.back,
      })
      oldM--
    }
    // 计算下个月日周关系, 一个月最少28天，够用了
    const nextOneWeek = list[list.length - 1].week + 1
    list = list.concat(
      this.calculationDayMonth({
        oneWeek: nextOneWeek,
        months: 28,
        type: ListTypeEnum.next,
      }),
    )

    return list.slice(0, 42)
  }

  // 是否补0前缀
  isZero(num) {
    const newNum = num.toString()
    return newNum.length >= 2 ? newNum : '0' + newNum
  }

  // 获取当天
  getToday() {
    // 当天的数据
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()
    return {
      y,
      m,
      d,
      formatDate: this.formatDate({ year: y, month: m, day: d }),
    }
  }

  formatDate({ year, month, day }) {
    return `${year}-${this.isZero(month)}-${this.isZero(day)}`
  }
}
export default new CalendarTool()
