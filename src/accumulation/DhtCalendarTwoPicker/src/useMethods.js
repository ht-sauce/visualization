import CalendarTool from '@/components/DhtCalendarBase/src/tool'
import { intervalDate } from './tool'

export default {
  // 年月切换
  dateAddDell(type = 'year', optType = 'add') {
    let year = this.showYear
    let month = this.showMonth

    if (type === 'year') {
      if (optType === 'add') {
        this.showYear++
      } else this.showYear--
    }
    if (type === 'month') {
      if (optType === 'add') {
        month = month + 1
        if (month > 12) {
          this.showMonth = month - 12
          this.showYear = year + 1
        } else {
          this.showMonth = month
        }
      } else {
        month = month - 1
        if (month < 1) {
          this.showYear = year - 1
          this.showMonth = month + 12
        } else {
          this.showMonth = month
        }
      }
    }
    this.reCurrentData()
  },

  reCurrentData() {
    const oneDays = CalendarTool.monthHowManyDays({ year: this.showYear, month: this.showMonth })
    const twoDays = CalendarTool.monthHowManyDays({
      year: this.nextYm.year,
      month: this.nextYm.month,
    })

    this.$emit('twoDate', {
      one: {
        year: this.showYear,
        month: this.showMonth,
        days: oneDays,
        startTime: CalendarTool.formatDate({
          year: this.showYear,
          month: this.showMonth,
          day: 1,
        }),
        entTime: CalendarTool.formatDate({
          year: this.showYear,
          month: this.showMonth,
          day: oneDays,
        }),
      },
      two: {
        year: this.nextYm.year,
        month: this.nextYm.month,
        days: twoDays,
        startTime: CalendarTool.formatDate({
          year: this.nextYm.year,
          month: this.nextYm.month,
          day: 1,
        }),
        entTime: CalendarTool.formatDate({
          year: this.nextYm.year,
          month: this.nextYm.month,
          day: twoDays,
        }),
      },
    })
  },

  // v-model数据
  reVModel(val = []) {
    if (this.maxSel) {
      // 超出可选数量不可选中
      if (val.length <= this.maxSel) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    } else {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  onChange(li) {
    let checkList = []
    if (!this.isRadio) {
      // 当未进入点选的时候不可操作
      if (!this.model.includes('radio')) return false
      // 当按住ctrl+快速选择下的另一种模式
      if (this.model.includes('continuous') && this.ctrlKey) {
        this.changeContinuous(li)
        return false
      }

      checkList = [...this.checkValue]
      if (!checkList.includes(li.formatDate)) checkList.push(li.formatDate)
      else {
        const index = checkList.indexOf(li.formatDate)
        if (index !== -1) checkList.splice(index, 1)
      }
    } else {
      // 单选模式
      checkList = [li.formatDate]
    }

    this.reVModel(checkList)
  },
  // 快选模式
  changeContinuous(dayLi) {
    // 已选日期
    this.firstLastDate.push(dayLi)
    if (this.firstLastDate.length === 2) this.DateInSelectedRange()
  },
  // 选中范围内日期
  DateInSelectedRange() {
    const checkList = [...this.checkValue]
    // 日期从小到大排列
    const firstLastDate = this.firstLastDate.sort((li, li2) => {
      return li.timestamp - li2.timestamp
    })
    // 获取两个时间之间的差异值
    const diffDate = intervalDate(firstLastDate[0].timestamp, firstLastDate[1].timestamp)

    // 新的已选列表
    const newCheckList = []
    diffDate.forEach((date) => {
      const { formatDate } = date
      if (
        !this.disabledDate(this.$refs.leftCalendar.formatDisableDate(formatDate)) &&
        !checkList.includes(formatDate)
      ) {
        newCheckList.push(formatDate)
      }
    })

    this.reVModel([...checkList, ...newCheckList])
    setTimeout(() => {
      this.firstLastDate = []
    }, 300)
  },
  // 按键监听
  keyMonitor(event) {
    // 每次按键需要重选
    this.ctrlKey = event.ctrlKey
  },
  keyupMonitor(event) {
    this.firstLastDate = []
    this.ctrlKey = event.ctrlKey
  },
  // 复选框选择月份和周日期
  changeCheck(val, type = 'month', lr = 'left', time = {}) {
    const { year, month } = time
    const formatYM = `${year}-${CalendarTool.isZero(month)}` // 格式化前缀年月
    // 得到左或右月份数据
    const currentMonths = []
    const allMonths = lr === 'left' ? this.$refs.leftCalendar.list : this.$refs.rightCalendar.list
    allMonths.forEach((li) => {
      if (li.type === 'current') currentMonths.push(li)
    })

    const checkList = [...this.checkValue] // 已选中列表

    switch (type) {
      case 'week': {
        const { week } = time

        // 先获取到当前周
        const currentWeeks = []
        const strWeeks = []
        currentMonths.forEach((li) => {
          const { formatDate } = li
          if (!this.disabledDate(li) && li.type === 'current' && li.week === week.key) {
            strWeeks.push(formatDate)
            currentWeeks.push(li)
          }
        })

        if (val) {
          const newCheckList = []
          currentWeeks.forEach((li) => {
            const { formatDate } = li
            if (!checkList.includes(formatDate)) {
              newCheckList.push(formatDate)
            }
          })
          this.reVModel([...checkList, ...newCheckList])
        } else {
          const newList = []
          checkList.forEach((li) => {
            if (!strWeeks.includes(li)) newList.push(li)
          })
          this.reVModel(newList)
        }
        break
      }
      case 'month': {
        if (val) {
          // 新的已选列表
          const newCheckList = []
          currentMonths.forEach((li) => {
            const { formatDate } = li
            // 得到当月未选数据
            if (!this.disabledDate(li) && !checkList.includes(formatDate))
              newCheckList.push(formatDate)
          })
          this.reVModel([...checkList, ...newCheckList])
        } else {
          const newList = []
          checkList.forEach((li) => {
            if (formatYM !== li.substring(0, 7)) newList.push(li)
          })
          this.reVModel(newList)
        }
        break
      }
    }
  },
}
