<template>
  <!--画布设置-->
  <CanvasSet />
  <!--主渲染区域-->
  <dht-drag class="canvas-area" @drop="onCanvas">
    <template #default>
      <template v-for="(item, index) in components" :key="index">
        <dht-drag :model-value="{ type: 'canvas', data: index }" @drop="onAssemblyDrop">
          <right-mouse-button :modelValue="index" :name="item.name">
            按钮{{ item.id }}
          </right-mouse-button>
        </dht-drag>
      </template>
    </template>
  </dht-drag>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CallData } from './Types'
import { DragDataType } from '../Type'
import CanvasSet from './CanvasSet/index.vue'
import RightMouseButton from './RightMouseButton/index.vue'
import { components } from './Store'
export default defineComponent({
  props: {},
  components: { CanvasSet, RightMouseButton },
  setup() {
    // 画布区域接收
    function onCanvas(CallData: CallData) {
      if (CallData.modelValue.type !== DragDataType.layout) return null

      components.push({
        id: components.length + 1,
        name: CallData.modelValue.data,
      })
    }
    // 子项移动接收数据,属于内部布局元素位置变化
    function onAssemblyDrop(CallData: CallData) {
      if (CallData.modelValue.type !== DragDataType.canvas) return null

      const bindData = CallData.modelValue
      const startIndex: number = Number(bindData.data)
      const startItem = components[startIndex]

      const endIndex = Number(CallData.endData.data)
      const endItem = components[endIndex]

      components.splice(endIndex, 1, startItem) // 放过去
      components.splice(startIndex, 1, endItem) // 反过来
    }

    return {
      onCanvas,
      components,
      onAssemblyDrop,
    }
  },
})
</script>

<style scoped lang="scss">
.canvas-area {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  cursor: default !important;
  /*以下为透明图效果*/
  background-image: linear-gradient(
      45deg,
      $grey-90 25%,
      transparent 0,
      transparent 75%,
      $grey-90 0,
      $grey-90
    ),
    linear-gradient(45deg, $grey-90 25%, transparent 0, transparent 75%, $grey-90 0, $grey-90);
  background-size: 10px 10px;
  background-position: 0 0, 5px 5px;
}
</style>
