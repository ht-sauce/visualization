<template>
  <popper v-model="show" trigger="manual" :arrow="false" :offset="8">
    <template #tooltip>
      <div class="color-picker">
        <!--固定颜色部分-->
        <ul class="fixed-color">
          <template v-for="color in fixedColors" :key="color">
            <li class="fixed-color-li" @click="confirmColor(color)"></li>
          </template>
        </ul>
        <div class="color-board">
          <div class="board"></div>
          <div class="adjust"></div>
        </div>
      </div>
    </template>
    <slot></slot>
  </popper>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from 'vue'
import { Popper } from '../Popper'
export default defineComponent({
  name: 'DhtColorPicker',
  components: {
    Popper,
  },
  emits: ['update:modelValue', 'confirm'],
  props: {
    modelValue: Boolean,
  },
  setup(props, ctx) {
    const data = reactive({
      show: props.modelValue,
      fixedColors: new Array(36).fill(''),
    })
    watch(
      () => props.modelValue,
      (e) => {
        data.show = e
      },
    )
    watch(
      () => data.show,
      (e) => {
        ctx.emit('update:modelValue', e)
      },
    )
    // 确认颜色
    function confirmColor(color: string) {
      ctx.emit('confirm', color)
      data.show = false
    }

    return {
      ...toRefs(data),
      confirmColor,
    }
  },
})
</script>
