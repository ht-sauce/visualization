<template>
  <div>
    <div class="dht-calendar-two-picker">
      <dht-calendar-base
        ref="leftCalendar"
        key="left"
        class="calendar calendar-left"
        :year="showYear"
        v-model="checkValue"
        @day-change="onChange"
        :month="showMonth"
        :disabled-date="disabledDate"
        :show-current="showCurrent"
        :show-checkbox="!isRadio"
      >
        <template #header-left>
          <span
            class="el-icon-d-arrow-left icon icon-left"
            @click="dateAddDell('year', 'del')"
          ></span>
          <span
            class="el-icon-arrow-left icon icon-left icon-left-small"
            @click="dateAddDell('month', 'del')"
          ></span>
        </template>
        <template #default="{ li }">
          <ShowDay :li="li" :first-last-date="firstLastDate" />
        </template>
      </dht-calendar-base>
      <dht-calendar-base
        key="right"
        ref="rightCalendar"
        class="calendar calendar-right"
        :year="nextYm.year"
        v-model="checkValue"
        @day-change="onChange"
        :month="nextYm.month"
        :disabled-date="disabledDate"
        :show-current="showCurrent"
        :show-checkbox="!isRadio"
      >
        <template #header-right>
          <span
            class="el-icon-arrow-right icon icon-right icon-right-small"
            @click="dateAddDell('month', 'add')"
          ></span>
          <span
            class="el-icon-d-arrow-right icon icon-right"
            @click="dateAddDell('year', 'add')"
          ></span>
        </template>
        <template #default="{ li }">
          <ShowDay :li="li" :first-last-date="firstLastDate" />
        </template>
      </dht-calendar-base>
    </div>
    <div v-if="!isRadio" style="color: var(--text-color-secondary)">
      <span class="el-icon-warning" style="font-size: 14px; margin-right: 10px"></span>
      <span>按住Ctrl，可快速选择连续的日期区间，点击选择起-止日期即可</span>
    </div>
  </div>
</template>

<script>
import DhtCalendarBase from '@/components/DhtCalendarBase'

import ShowDay from './ShowDay.vue'
import { useData } from './useData'
import useMethods from './useMethods'
export default {
  name: 'DhtCalendarTwoPicker',
  // 双月时间返回事件
  emits: ['twoDate', 'input', 'change'],
  model: {
    prop: 'value',
    event: 'change',
  },
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
    // 当前选中的数据列
    value: {
      type: Array,
      default: () => [],
    },
    // 是否需要展示上中下月数据,全类型：'back', 'current', 'next'
    showCurrent: {
      type: Array,
      default: () => ['back', 'current', 'next'],
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
    // 是否单选
    isRadio: Boolean,
    // 最大选择数量
    maxSel: Number,
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
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        this.checkValue = val
      },
    },
  },
  data() {
    return {
      // 选择的列表
      checkValue: [],
      ...useData(this),
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
    ...useMethods,
  },
}
</script>

<style scoped lang="scss">
$border-base: var(--border-color-1) 1px solid;
.dht-calendar-two-picker {
  display: flex;

  width: 560px;
  border: $border-base;
  border-radius: 2px;
  .c-checkbox {
    margin-top: -2px;
    margin-right: 4px;
  }
  .calendar-left {
    border: none;
    border-right: $border-base;
  }
  .calendar-right {
    border: none;
  }
  .icon {
    font-size: 16px;
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
