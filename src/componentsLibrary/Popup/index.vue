<template>
  <transition name="dht-popup">
    <div
      v-if="show"
      @click.self="maskCloseEvent"
      class="dht-popup"
      :style="{ zIndex: zindex }"
      :class="{ 'dht-popup-no-mask': !mask }"
    >
      <!--居中出现-->
      <template v-if="direction === 'center'">
        <div class="dht-popup-center">
          <slot></slot>
        </div>
      </template>
      <template v-else>
        <div :class="animationShow ? `dht-popup-${direction}-in` : `dht-popup-${direction}-out`">
          <slot></slot>
        </div>
      </template>
    </div>
  </transition>
</template>

<script lang="ts">
// 功能定位，只负责弹窗，没有额外的业务逻辑混杂
import { defineComponent, watch, reactive, toRefs, computed, PropType, nextTick } from 'vue'
import { globalConfig } from '@/componentsLibrary/tool/tool'
export default defineComponent({
  name: 'DhtPopup',
  emits: ['update:modelValue', 'close'],
  props: {
    modelValue: Boolean, // 展示
    zIndex: Number,
    direction: {
      // 出现的位置
      type: String,
      default: 'center', // center、top、bottom、right、left、
    },
    // 关闭之前的事件，传入则控制关闭，和elementUI同理
    beforeClose: Function as PropType<(done: () => void) => void>,
    maskClose: {
      type: Boolean,
      default: true, // 遮罩事件关闭打开
    },
    mask: {
      type: Boolean,
      default: true, // true, 存在遮罩，false不要遮罩
    },
  },
  setup(props, ctx) {
    const $DHT = globalConfig()
    const zindex = computed(() => props.zIndex ?? $DHT.zIndex)

    const data = reactive({
      show: props.modelValue,
      animationShow: props.modelValue, // 保证抽屉动画
    })
    // 全局关闭事件
    function onClose() {
      const done = () => {
        // 需要先让抽屉动画先执行
        nextTick(() => {
          data.show = false
          ctx.emit('update:modelValue', false)
          ctx.emit('close', false)
        })
        data.animationShow = false
      }
      if (typeof props.beforeClose === 'function') props.beforeClose(done)
      else done()
    }

    // 监听数据变化
    watch(
      () => props.modelValue,
      (e) => {
        if (e) {
          data.show = e
          data.animationShow = e
        } else {
          onClose()
        }
      },
    )
    // 遮罩关闭事件
    function maskCloseEvent() {
      if (!props.maskClose) return null
      onClose()
    }

    return {
      ...toRefs(data),
      zindex,
      onClose,
      maskCloseEvent,
    }
  },
})
</script>
