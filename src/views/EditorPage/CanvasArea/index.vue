<template>
  <dht-drag class="canvas-area" @drop="onCanvas">
    <template #default>
      <template v-for="(item, index) in components" :key="index">
        <dht-drag :model-value="{ type: 'canvas', data: index }" @drop="onAssemblyDrop">
          <component :is="item.name">按钮{{ item.id }}</component>
        </dht-drag>
      </template>
    </template>
  </dht-drag>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs } from 'vue'
import { CallData, ComponentsItem } from './Types'
import { DragDataType } from '../Type'
export default defineComponent({
  props: {},
  setup() {
    const data = reactive({})

    // 画布列表区域数据
    const components = reactive([] as ComponentsItem[])
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
      ...toRefs(data),
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
