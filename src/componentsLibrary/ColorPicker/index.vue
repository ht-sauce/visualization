<!--参考来自：https://smohan.net/blog/d5uvpu-->
<template>
  <dht-popper
    :modelValue="modelValue"
    @hide="$emit('update:modelValue', false)"
    trigger="manual"
    :arrow="arrow"
    :offset="offset"
    :click-outside="clickOutside"
    :z-index="zIndex"
  >
    <template #tooltip>
      <div class="dht-color-picker">
        <!--固定颜色部分-->
        <!--<ul class="fixed-color">
          <template v-for="(color, index) in fixedColors" :key="index">
            <li
              class="fixed-color-li"
              :style="{ background: color }"
              @click="confirmColor(color)"
            ></li>
          </template>
        </ul>-->
        <div class="color-board">
          <div class="board" :style="{ background: `hsl(${hsv.h}, 100%, 50%)` }">
            <span
              v-dht-move="{
                boundary: true,
                callback: boardPoint,
                x: boardSelPonit.x,
                y: boardSelPonit.y,
              }"
              class="board-point"
            ></span>
          </div>
          <div class="color-adjust">
            <span
              v-dht-move="{ boundary: true, callback: colorSlider, x: colorx }"
              class="color-slider"
            ></span>
          </div>
          <div
            class="alpha"
            :style="{
              background: `linear-gradient(to right, transparent, hsl(${hsl.h}, ${hsl.s * 100}%, ${
                hsl.l * 100
              }%))`,
            }"
          >
            <span
              v-dht-move="{ boundary: true, callback: alphaSlider, x: alphax }"
              class="alpha-slider"
            ></span>
          </div>
        </div>
        <!--颜色数值展示区域-->
        <div class="color-show">
          <div>{{ hex.toUpperCase() }}</div>
          <div>{{ rgba }}</div>
          <div class="confirm-color" @click="confirmColor">确定</div>
        </div>
      </div>
    </template>
    <slot></slot>
  </dht-popper>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { DhtPopper } from '../Popper'
import { hsv2rgb, hsv2hsl, rgb2hex } from './color'
import { Vmoves } from './types'
import DhtMove from '../Move'
export default defineComponent({
  name: 'DhtColorPicker',
  components: {
    DhtPopper,
  },
  directives: {
    DhtMove: DhtMove.directive,
  },
  emits: ['update:modelValue', 'confirm'],
  props: {
    modelValue: Boolean,
    arrow: Boolean,
    offset: {
      type: Number,
      default: 16,
    },
    clickOutside: {
      type: Boolean,
      default: true,
    },
    zIndex: Number,
  },
  setup(props, ctx) {
    const data = reactive({
      fixedColors: new Array(36).fill(''),
      boardSelPonit: {
        x: 100, // 注意是百分比值
        y: 100,
      },
      colorx: 0,
      alphax: 0, // 透明度
      hsv: {
        // 核心在于此
        h: 0,
        s: 0,
        v: 0,
      },
    })
    const hsl = computed(() => hsv2hsl(data.hsv.h, data.hsv.s, data.hsv.v))
    const rgb = computed(() => hsv2rgb(data.hsv.h, data.hsv.s, data.hsv.v))
    const hex = computed(() => rgb2hex(rgb.value.r, rgb.value.g, rgb.value.b))
    const rgba = computed(
      () => `rgba(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b}, ${data.alphax / 100})`,
    )
    // 确认颜色
    function confirmColor() {
      // const colors = data.fixedColors
      // colors.unshift(hex.value)
      // data.fixedColors = colors.slice(0, 36)
      ctx.emit('confirm', {
        hex: hex.value,
        rgba: rgba.value,
      })
      ctx.emit('update:modelValue', false)
    }
    // 色板选择，饱和度
    function boardPoint(arg: Vmoves) {
      data.boardSelPonit.x = arg.percentX
      data.boardSelPonit.y = arg.percentY
      data.hsv.s = arg.percentX / 100
      data.hsv.v = (100 - arg.percentY) / 100
    }
    // 颜色条子滚动值
    function colorSlider(arg: Vmoves) {
      data.colorx = arg.percentX
      data.hsv.h = (arg.percentX / 100) * 360
    }
    // 透明度条子
    function alphaSlider(arg: Vmoves) {
      data.alphax = arg.percentX
    }

    return {
      ...toRefs(data),
      hsl,
      rgb,
      hex,
      rgba,
      confirmColor,
      boardPoint,
      colorSlider,
      alphaSlider,
    }
  },
})
</script>
