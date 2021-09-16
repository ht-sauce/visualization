import { YMD, CalculusMouth, ListType, ListTypeEnum } from './types'
class CalendarTool {
  // 获取这个月多少天
  monthHowManyDays({ year, month }: YMD): number {
    const date = new Date(year, month, 0)
    return date.getDate()
  }
  // 这天周几
  getWeekSeveral({ year, month, day }: YMD): number {
    const date = new Date(`${year},${month},${day}`)
    const Several = date.getDay()
    if (Several === 0) return 7
    else return Several
  }
  // 计算一个月的日周关系
  private static calculationDayMonth({ oneWeek, months, type }: CalculusMouth): ListType[] {
    const list = []
    for (let i = 1; i <= months; i++) {
      list.push({
        day: i,
        week: oneWeek,
        type: type as ListTypeEnum,
      })
      // 星期几推算
      oneWeek++
      if (oneWeek > 7) oneWeek = 1
    }
    return list
  }
  // 固定一行7个，根据第一排是周几，然后推算当月日历数据值
  calculusMouth({ oneWeek, months, oldMonths }: CalculusMouth): ListType[] {
    // 当月得到天数和周几对应关系
    let list: ListType[] = []
    list = list.concat(
      CalendarTool.calculationDayMonth({ oneWeek, months, type: ListTypeEnum.current }),
    )
    // 得到1号之前的日周关系
    let oldM = oldMonths as number
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
      CalendarTool.calculationDayMonth({
        oneWeek: nextOneWeek,
        months: 28,
        type: ListTypeEnum.next,
      }),
    )

    return list.slice(0, 42)
  }
}
export default new CalendarTool()
