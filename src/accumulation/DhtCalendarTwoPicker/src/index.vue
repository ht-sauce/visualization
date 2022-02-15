<template>
  <div>
    <div class="dht-calendar-two-picker">
      <dht-calendar-base
        ref="leftCalendar"
        class="calendar calendar-left"
        :year="showYear"
        :value="value"
        @change="onChange"
        :month="showMonth"
        :disabled-date="disabledDate"
        :show-current="showCurrent"
        :is-hr="isHr"
      >
        <template #header>
          <div class="header-left">
            <span
              class="el-icon-d-arrow-left icon icon-left"
              @click="dateAddDell('year', 'del')"
            ></span>
            <span
              class="el-icon-arrow-left icon icon-left icon-left-small"
              @click="dateAddDell('month', 'del')"
            ></span>
            <span>
              <span>{{ showYear }}年</span>
              <span>{{ showMonth }}月</span>
            </span>
          </div>
        </template>
        <template #default="{ li }">
          <ShowDay :li="li" :first-last-date="firstLastDate" />
        </template>
      </dht-calendar-base>
      <dht-calendar-base
        class="calendar calendar-right"
        :year="nextYm.year"
        :value="value"
        @change="onChange"
        :month="nextYm.month"
        :disabled-date="disabledDate"
        :show-current="showCurrent"
        :is-hr="isHr"
      >
        <template #header>
          <div class="header-right">
            <span>
              <span>{{ nextYm.year }}年</span>
              <span>{{ nextYm.month }}月</span>
            </span>
            <span
              class="el-icon-arrow-right icon icon-right icon-right-small"
              @click="dateAddDell('month', 'add')"
            ></span>
            <span
              class="el-icon-d-arrow-right icon icon-right"
              @click="dateAddDell('year', 'add')"
            ></span>
          </div>
        </template>
        <template #default="{ li }">
          <ShowDay :li="li" :first-last-date="firstLastDate" />
        </template>
      </dht-calendar-base>
    </div>
    <div style="color: var(--text-color-secondary)">
      <span class="el-icon-warning" style="font-size: 14px; margin-right: 10px"></span>
      <span>按住Ctrl，可快速选择连续的日期区间，点击选择起-止日期即可</span>
    </div>
  </div>
</template>

<script>
import DhtCalendarBase from '@/components/DhtCalendarBase'
import CalendarTool from '@/components/DhtCalendarBase/src/tool'
import { intervalDate } from './tool'
import ShowDay from './ShowDay.vue'
export default {
  name: 'DhtCalendarTwoPicker',
  // 双月时间返回事件
  emits: ['twoDate', 'input', 'change'],
  components: {
    DhtCalendarBase,
    ShowDay,
  },
  props: {
    // radio:单个点击，continuous：按住Ctrl，可快速选择连续的日期区间，点击选择起-止日期即可
    model: {
      type: Array,
      default() {
        return ['radio', 'continuous']
      },
    },
    isHr: {
      type: Boolean,
      default: true,
    },
    // 当前选中的数据列
    value: {
      type: Array,
      default: () => [],
    },
    // 是否需要展示上中下月数据,全类型：'back', 'current', 'next'
    showCurrent: {
      type: Array,
      default: () => ['current'],
    },
    month: {
      required: true,
      type: Number,
    },
    year: {
      required: true,
      type: Number,
    },
    // 禁用时间
    disabledDate: {
      type: Function,
      default() {
        return false
      },
    },
  },
  computed: {
    nextYm() {
      let month = this.showMonth + 1
      let year = this.showYear
      if (month > 12) {
        month = month - 12
        year = year + 1
      }

      return {
        year,
        month,
      }
    },
  },
  data() {
    return {
      showYear: this.year,
      showMonth: this.month,
      // 首尾选择日期，
      firstLastDate: [],
      // 是否按住ctrl键
      ctrlKey: false,
    }
  },
  created() {
    // 初始的时候返回外界双月初始数据
    this.reCurrentData()
    window.addEventListener('keydown', this.keyMonitor, false)
    window.addEventListener('keyup', this.keyupMonitor, false)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyMonitor, false)
    window.addEventListener('keyup', this.keyupMonitor, false)
  },
  methods: {
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
    reVModel(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    onChange(li) {
      // 当未进入点选的时候不可操作
      if (!this.model.includes('radio')) return false
      // 当按住ctrl+快速选择下的另一种模式
      if (this.model.includes('continuous') && this.ctrlKey) {
        this.changeContinuous(li)
        return false
      }

      const checkList = [...this.value]

      if (!checkList.includes(li.formatDate)) checkList.push(li.formatDate)
      else {
        const index = checkList.indexOf(li.formatDate)
        if (index !== -1) checkList.splice(index, 1)
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
      const checkList = [...this.value]
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
  },
}
</script>

<style scoped lang="scss">
.dht-calendar-two-picker {
  display: flex;
  $border-base: var(--border-color-1) 1px solid;
  width: 460px;
  border: $border-base;
  border-radius: 4px;
  // 顶部日期选择
  .calendar {
    //border-bottom: $border-base;
  }
  .calendar-left {
    border-right: $border-base;
    border-radius: 4px 0 0 0;
  }
  .calendar-right {
    border-radius: 0 0 4px 0;
  }
  .header-right,
  .header-left {
    width: 100%;
    padding-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .icon {
    cursor: pointer;
    font-weight: bold;
    &:hover {
      color: var(--primary-color);
    }
  }
  .icon-left,
  .icon-right {
    position: absolute;
  }
  .icon-left {
    left: 10px;
  }
  .icon-left-small {
    left: 30px;
  }
  .icon-right {
    right: 10px;
  }
  .icon-right-small {
    right: 30px;
  }
}
</style>
