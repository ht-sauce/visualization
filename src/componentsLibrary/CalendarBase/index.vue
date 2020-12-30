<template>
  <ul class="calendar-base">
    <template v-for="week in weeks" :key="week">
      <li class="day">
        <slot name="week" :li="week">{{ week }}</slot>
      </li>
    </template>
    <div class="hr"></div>
    <template v-for="(li, index) in list" :key="index">
      <li @click="onChange(li)" class="day" :class="{ gary: li.type !== 'current' }">
        <slot :li="li">{{ li.day }}</slot>
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import CalendarTool from './tool'
import { ListType, YMD, ListTypeEnum } from './types'
export default defineComponent({
  name: 'CalendarBase',
  emits: ['change'],
  props: {
    month: {
      required: true,
      type: Number,
    },
    year: {
      required: true,
      type: Number,
    },
  },
  setup(props, ctx) {
    interface Idata {
      list: ListType[]
      weeks: string[]
    }
    const data = reactive({
      list: [],
      weeks: ['一', '二', '三', '四', '五', '六', '七'],
    } as Idata)

    function days({ year, month }: YMD) {
      let backMonth = month - 1
      backMonth = backMonth < 1 ? 1 : backMonth
      const getWeekSeveral = CalendarTool.getWeekSeveral({ year, month: month, day: 1 })
      const monthHowManyDays = CalendarTool.monthHowManyDays({ year, month: month })
      const oldMonths = CalendarTool.monthHowManyDays({ year, month: backMonth })
      const d = { oneWeek: getWeekSeveral, months: monthHowManyDays, oldMonths: oldMonths }
      return CalendarTool.calculusMouth(d)
    }

    watch(
      [() => props.year, () => props.month],
      ([year, month]) => {
        data.list = days({ year, month })
      },
      {
        immediate: true,
      },
    )

    // 是否补0前缀
    function isZero(num: number | string) {
      const newNum = num.toString()
      return newNum.length >= 2 ? newNum : '0' + newNum
    }
    // 日期格式化
    function formatDate(e: ListType) {
      let month = props.month
      let year = props.year
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
      e.formatDate = `${year}-${isZero(month)}-${isZero(day)}`
      return e
    }

    function onChange(e: ListType) {
      const newE = formatDate(e)
      ctx.emit('change', newE)
    }

    return {
      ...toRefs(data),
      onChange,
    }
  },
})
</script>
