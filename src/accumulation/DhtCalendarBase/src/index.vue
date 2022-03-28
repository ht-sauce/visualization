<template>
  <div class="dht-calendar-base">
    <div class="header">
      <slot name="header-left"></slot>
      <slot name="header-center">
        <div>
          <el-checkbox
            v-if="showCheckbox"
            class="c-checkbox"
            v-model="monthCheck.value"
            :indeterminate="monthCheck.uncertain"
            @change="
              (val) => {
                checkboxChange(val, 'month')
              }
            "
          ></el-checkbox>
          <span>{{ year }}年</span>
          <span>{{ month }}月</span>
        </div>
      </slot>
      <slot name="header-right"></slot>
    </div>
    <div v-if="isHr" class="hr"></div>

    <div class="header-week">
      <template v-for="week in weeks">
        <div :key="week.key" class="week">
          <el-checkbox
            v-if="showCheckbox"
            class="c-checkbox"
            v-model="weekCheck[week.type].value"
            :indeterminate="weekCheck[week.type].uncertain"
            @change="
              (val) => {
                checkboxChange(val, 'week', week)
              }
            "
          ></el-checkbox>
          <slot name="week" :li="week">{{ week.name }}</slot>
        </div>
      </template>
    </div>
    <div class="content-day">
      <template v-for="li in list">
        <div
          :key="li.formatDate"
          @click="clickChange(li)"
          class="day"
          v-if="showCurrent.includes(li.type)"
          :class="{
            'check-day': value.includes(li.formatDate) && li.type === 'current',
            'disabled-day': disabledDate(li) || li.type !== 'current',
          }"
        >
          <slot :li="li">{{ li.day }}</slot>
        </div>
        <template v-else>
          <!--占位元素-->
          <div :key="li.formatDate" class="no-show-day"></div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import CalendarTool from './tool'
import { ListTypeEnum } from './types'
export default {
  name: 'CalendarBase',
  // 选择数组和，单个选择日期
  emits: ['change', 'day-change'],
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    isHr: Boolean,
    value: {
      type: Array,
      default: () => ['2019-11-15'],
    },
    month: {
      required: true,
      type: Number,
    },
    year: {
      required: true,
      type: Number,
    },
    // 是否需要展示上中下月数据
    showCurrent: {
      type: Array,
      default: () => ['back', 'current', 'next'],
    },
    // 禁用时间
    disabledDate: {
      type: Function,
      default() {
        return false
      },
    },
    // 是否展示
    showCheckbox: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    my: {
      immediate: true,
      deep: true,
      handler(my) {
        const { year, month } = my
        this.list = this.days({ year, month })
        // 年月变化
        this.uncertainCheck(this.value)
      },
    },
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        this.checkList = val
        // 回显的时候控制checkbox状态
        this.uncertainCheck(val)
      },
    },
  },
  computed: {
    my() {
      return {
        month: this.month,
        year: this.year,
      }
    },
  },
  created() {},
  data() {
    return {
      list: [],
      weeks: Object.freeze([
        { name: '一', type: 'one', key: 1 },
        { name: '二', type: 'two', key: 2 },
        { name: '三', type: 'three', key: 3 },
        { name: '四', type: 'four', key: 4 },
        { name: '五', type: 'five', key: 5 },
        { name: '六', type: 'six', key: 6 },
        { name: '日', type: 'seven', key: 7 },
      ]),
      weekKey: Object.freeze({
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
      }),
      monthCheck: {
        value: false,
        uncertain: false,
      },
      weekCheck: {
        one: {
          value: false,
          uncertain: false,
        },
        two: {
          value: false,
          uncertain: false,
        },
        three: {
          value: false,
          uncertain: false,
        },
        four: {
          value: false,
          uncertain: false,
        },
        five: {
          value: false,
          uncertain: false,
        },
        six: {
          value: false,
          uncertain: false,
        },
        seven: {
          value: false,
          uncertain: false,
        },
      },
    }
  },
  methods: {
    days({ year, month }) {
      let backMonth = month - 1
      backMonth = backMonth < 1 ? 1 : backMonth
      const getWeekSeveral = CalendarTool.getWeekSeveral({ year, month, day: 1 })
      const monthHowManyDays = CalendarTool.monthHowManyDays({ year, month })
      const oldMonths = CalendarTool.monthHowManyDays({ year, month: backMonth })
      const d = { oneWeek: getWeekSeveral, months: monthHowManyDays, oldMonths: oldMonths }
      return CalendarTool.calculusMouth(d).map((li) => {
        return this.formatDate(li)
      })
    },
    // 通过年月日得出需要传递给禁用函数的数据结构
    // @formatDate = '2021-09-11'
    formatDisableDate(formatDate = '') {
      const year = Number(formatDate.substring(0, 4))
      const month = Number(formatDate.substring(5, 7))
      const day = Number(formatDate.substring(8, 11))

      return {
        formatDate,
        today: CalendarTool.getToday().formatDate === formatDate,
        year,
        month,
        day,
        timestamp: new Date(`${year},${month},${day}`).getTime(), // 时间戳
        week: CalendarTool.getWeekSeveral({ year, month, day }),
      }
    },
    formatDate(e) {
      let month = this.month
      let year = this.year
      const day = e.day
      if (e.type === ListTypeEnum.back) {
        if (month - 1 < 1) {
          year = year - 1
          month = 12
        } else {
          month = month - 1
        }
      }
      if (e.type === ListTypeEnum.next) {
        if (month + 1 > 12) {
          year = year + 1
          month = 1
        } else {
          month = month + 1
        }
      }

      const formatDate = `${year}-${CalendarTool.isZero(month)}-${CalendarTool.isZero(day)}`
      e.formatDate = formatDate

      e = {
        ...e,
        formatDate,
        today: CalendarTool.getToday().formatDate === formatDate,
        year,
        month,
        day,
        timestamp: new Date(`${year},${month},${day}`).getTime(), // 时间戳
      }

      return e
    },

    clickChange(e) {
      if (this.disabledDate(e) || e.type !== 'current') return false
      this.$emit('day-change', e)
    },
    reChange(e) {
      this.$emit('change', e)
    },
    checkboxChange(val, type = 'month', week) {
      const formatYM = `${this.year}-${CalendarTool.isZero(this.month)}` // 格式化前缀年月
      // 得到左或右月份数据
      const currentMonths = []
      this.list.forEach((li) => {
        if (li.type === 'current') currentMonths.push(li)
      })

      const checkList = [...this.value] // 已选中列表

      switch (type) {
        case 'week': {
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
            this.reChange([...checkList, ...newCheckList])
          } else {
            const newList = []
            checkList.forEach((li) => {
              if (!strWeeks.includes(li)) newList.push(li)
            })
            this.reChange(newList)
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
            this.reChange([...checkList, ...newCheckList])
          } else {
            const newList = []
            checkList.forEach((li) => {
              if (formatYM !== li.substring(0, 7)) newList.push(li)
            })
            this.reChange(newList)
          }
          break
        }
      }
    },
    uncertainCheck(val = []) {
      const formatYM = `${this.year}-${CalendarTool.isZero(this.month)}` // 格式化前缀年月
      // 这个月应该被选择的数量
      const currentMonths = []
      const currentWeeks = {} // 采用周week值作为对象key
      this.list.forEach((li) => {
        if (!this.disabledDate(li) && li.type === 'current') {
          currentMonths.push(li)
          // 周数据拆分
          const { week } = li
          if (currentWeeks[week]) {
            currentWeeks[week].push(li)
          } else {
            currentWeeks[week] = [li]
          }
        }
      })
      // 得到当月数据，value中可能存在其他月份，需要筛选
      const valDays = []
      const valWeeks = {}
      val.forEach((li) => {
        if (formatYM === li.substring(0, 7)) {
          valDays.push(li)
          // 周数据拆分
          const { y, m, d } = CalendarTool.toYMD(li, 2)
          const week = CalendarTool.getWeekSeveral({ year: y, month: m, day: d })
          if (valWeeks[week]) {
            valWeeks[week].push(li)
          } else {
            valWeeks[week] = [li]
          }
        }
      })
      // 月份的状态
      let monthCheck = { ...this.monthCheck }
      if (valDays.length === 0) {
        // 一个都未选中
        monthCheck = {
          value: false,
          uncertain: false,
        }
      } else if (currentMonths.length === valDays.length) {
        // 全选状态
        monthCheck = {
          value: true,
          uncertain: false,
        }
      } else if (valDays.length < currentMonths.length) {
        // 部分选择
        monthCheck = {
          value: false,
          uncertain: true,
        }
      }
      this.monthCheck = monthCheck
      //------周checkbox操作-------
      const weekCheck = { ...this.weekCheck }
      for (let i = 0; i < 7; i++) {
        const j = i + 1
        const cW = currentWeeks[j]
        const vW = valWeeks[j]
        const weekKey = this.weekKey[j]
        if (!vW) {
          // 一个都未选中
          weekCheck[weekKey] = {
            value: false,
            uncertain: false,
          }
        } else if (cW.length === vW.length) {
          // 全选状态
          weekCheck[weekKey] = {
            value: true,
            uncertain: false,
          }
        } else if (vW.length < cW.length) {
          // 部分选择
          weekCheck[weekKey] = {
            value: false,
            uncertain: true,
          }
        }
      }
      this.weekCheck = weekCheck
    },
  },
}
</script>
<style lang="scss" scoped>
.dht-calendar-base {
  box-sizing: content-box;
  $height: 30px;
  width: 280px;
  display: flex;
  flex-flow: column;
  align-items: center;
  border: 1px var(--border-color-1) solid;
  // 顶部年月
  .header {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .c-checkbox {
    margin-top: -2px;
    margin-right: 4px;
  }
  .li-base {
    margin: 4px;
    box-sizing: border-box;
    font-size: var(--h3);
    display: inline-block;
    width: 30px;
    height: $height;
    text-align: center;
    vertical-align: top;
    color: var(--text-color-primary);
    cursor: pointer;
    border-radius: 2px;
  }
  .header-week,
  .content-day {
    width: 266px;
  }
  .week {
    @extend .li-base;
  }
  .content-day {
    display: flex;
    flex-flow: wrap;
  }
  .day {
    @extend .li-base;
    &:hover {
      background: var(--primary-w6);
      color: #ffffff;
    }
  }
  .no-show-day {
    margin: 4px;
    width: 30px;
    height: $height;
  }
  .disabled-day {
    cursor: not-allowed;
    color: var(--text-color-secondary);
    &:hover {
      background: var(--c-white);
      cursor: not-allowed;
      color: var(--text-color-secondary);
    }
  }

  .check-day {
    background: var(--primary-color);
    color: #ffffff !important;
  }
}
</style>
