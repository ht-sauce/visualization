<!--参考来自：https://juejin.cn/post/6844903908339351560#heading-6-->
<template>
  <dht-popper
    :modelValue="modelValue"
    @hide="$emit('update:modelValue', false)"
    trigger="manual"
    :arrow="false"
    :offset="8"
  >
    <template #tooltip>
      <div class="color-picker">
        <!--固定颜色部分-->
        <ul class="fixed-color">
          <template v-for="color in fixedColors" :key="color">
            <li class="fixed-color-li" @click="confirmColor(color)"></li>
          </template>
        </ul>
        <div class="color-board">
          <div class="board">
            <div class=""></div>
          </div>
          <div class="adjust"></div>
          <!--<div
            class="alpha"
            :style="{
              background: `linear-gradient(to right, transparent, hsl(${hsl.h}, ${hsl.s * 100}%, ${
                hsl.l * 100
              }%))`,
            }"
          ></div>-->
        </div>
      </div>
    </template>
    <slot></slot>
  </dht-popper>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from 'vue'
import { DhtPopper } from '../Popper'
import { hsv2rgb, rgb2hsv, hsv2hsl, hsl2hsv, hex2rgb, rgb2hex, parseColor } from './color'
export default defineComponent({
  name: 'DhtColorPicker',
  components: {
    DhtPopper,
  },
  emits: ['update:modelValue', 'confirm'],
  props: {
    modelValue: Boolean,
  },
  setup(props, ctx) {
    const data = reactive({
      fixedColors: new Array(36).fill(''),
    })
    // 确认颜色
    function confirmColor(color: string) {
      ctx.emit('confirm', color)
      ctx.emit('update:modelValue', false)
    }

    return {
      ...toRefs(data),
      confirmColor,
    }
  },
})
</script>
