<template>
  <div class="dht-calendar-base">
    <div style="width: inherit">
      <slot name="header"></slot>
    </div>
    <div v-if="isHr" class="hr"></div>

    <div class="header-week">
      <template v-for="week in weeks">
        <div :key="week" class="week">
          <slot name="week" :li="week">{{ week }}</slot>
        </div>
      </template>
    </div>

    <!--    <div v-if="isHr" class="hr"></div>-->
    <div class="content-day">
      <template v-for="li in list">
        <div
          :key="li.formatDate"
          @click="onChange(li)"
          class="day"
          v-if="showCurrent.includes(li.type)"
          :class="{
            gary: li.type !== 'current',
            'check-day': value.includes(li.formatDate),
            'disabled-day': disabledDate(li),
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
  emits: ['change'],
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
  },
  watch: {
    my: {
      immediate: true,
      deep: true,
      handler(my) {
        const { year, month } = my
        this.list = this.days({ year, month })
      },
    },
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        this.checkList = val
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
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
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
    onChange(e) {
      if (this.disabledDate(e)) return false
      this.$emit('change', e)
    },
  },
}
</script>
<style lang="scss" scoped>
.dht-calendar-base {
  box-sizing: content-box;
  $height: 30px;
  width: 230px;
  display: flex;
  flex-flow: column;
  align-items: center;
  .hr {
    margin: 4px 0;
    border-bottom: 1px var(--border-color-1) solid;
  }
  .li-base {
    box-sizing: border-box;
    font-size: var(--h3);
    display: inline-block;
    width: 30px;
    height: $height;
    text-align: center;
    border-bottom: #ffffff 1px solid;
    border-right: #ffffff 1px solid;
    vertical-align: top;
    color: var(--text-color-primary);
    cursor: pointer;
    border-radius: 2px;
  }
  .header-week,
  .content-day {
    width: 210px;
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
  .gary {
    color: #909399;
  }
}
</style>
