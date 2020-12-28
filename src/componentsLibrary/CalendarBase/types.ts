export enum ListTypeEnum {
  back = 'back',
  current = 'current',
  next = 'next',
}

export interface YMD {
  year: number // 年
  month: number // 月
  day?: number // 日
}
export interface CalculusMouth {
  oneWeek: number // 1号星期几
  months: number // 这个月几天
  oldMonths?: number // 上个月几天
  type?: ListTypeEnum
}

export interface ListType {
  day: number
  week: number
  type: ListTypeEnum //存在back,current,next
}
