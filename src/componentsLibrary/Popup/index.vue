<template>
  <div class="dht-popup" :style="{ zIndex: zindex }">
    <!--居中出现-->
    <template v-if="direction === 'center'">
      <div class="dht-popup-center"></div>
    </template>
  </div>
</template>

<script lang="ts">
// 功能定位，只负责弹窗，没有额外的业务逻辑混杂
import { defineComponent, ref, onMounted, computed } from 'vue'
import { globalConfig } from '@/componentsLibrary/tool/tool'

export default defineComponent({
  name: 'DhtPopup',
  props: {
    zIndex: Number,
    direction: {
      // 出现的位置
      type: String,
      default: 'center',
    },
    show: Boolean, // 展示
  },
  setup(props, ctx) {
    const $DHT = globalConfig()
    const zindex = computed(() => props.zIndex || $DHT.zIndex)

    return {
      zindex,
    }
  },
})
</script>
