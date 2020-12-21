<template>
  <transition name="dht-popup">
    <div v-if="modelValue" @click.self="onClose" class="dht-popup" :style="{ zIndex: zindex }">
      <!--居中出现-->
      <template v-if="direction === 'center'">
        <div class="dht-popup-center">
          <slot></slot>
        </div>
      </template>
    </div>
  </transition>
</template>

<script lang="ts">
// 功能定位，只负责弹窗，没有额外的业务逻辑混杂
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { globalConfig } from '@/componentsLibrary/tool/tool'

export default defineComponent({
  name: 'DhtPopup',
  emits: ['update:modelValue', 'close'],
  props: {
    zIndex: Number,
    direction: {
      // 出现的位置
      type: String,
      default: 'center', // center、top、bottom、right、left、
    },
    modelValue: Boolean, // 展示
    closeEvent: {
      type: Boolean,
      default: true,
    },
    mask: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const $DHT = globalConfig()
    const zindex = computed(() => props.zIndex ?? $DHT.zIndex)

    function onClose() {
      if (!props.closeEvent) return null
      ctx.emit('update:modelValue', false)
      ctx.emit('close', false)
    }

    return {
      zindex,
      onClose,
    }
  },
})
</script>
