import CalendarTool from '../../DhtCalendarBase/src/tool'

// 获取两个日期之间的所有日期，包括本身起始
// 传入开始结束日期的时间戳,返回数组，格式为yyyy-mm-dd
export function intervalDate(startTime, endTime) {
  const oneDayTime = 3600000 * 24 // 一整天的时间戳
  // 采用时间戳方式
  const diffDay = (endTime - startTime) / oneDayTime
  const diffDayList = [startTime]
  for (let i = 0; i < diffDay; i++) {
    diffDayList.push(startTime + oneDayTime * (i + 1))
  }

  const reDate = []

  diffDayList.forEach((li) => {
    const { y, m, d } = toYMD(li)
    reDate.push({
      formatDate: CalendarTool.formatDate({ year: y, month: m, day: d }),
      y,
      m,
      d,
      timestamp: li,
    })
  })

  return reDate
}

// 转年月日,type: 1时间戳，2yyyy-mm-dd
export function toYMD(time, type = 1) {
  if (type === 1) {
    const date = new Date(time)
    return {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
    }
  }
  if (type === 2) {
    return {
      y: Number(time.substring(0, 4)),
      m: Number(time.substring(5, 7)),
      d: Number(time.substring(8, 11)),
    }
  }
}
