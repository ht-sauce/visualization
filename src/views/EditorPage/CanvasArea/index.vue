<template>
  <dht-drag class="canvas-area" @drop="onCanvas">
    <template #default>
      <template v-for="(item, index) in components" :key="item.id">
        <dht-drag :model-value="index" @drop="onAssemblyDrop">
          <component :is="item.name">{{ index }}</component>
        </dht-drag>
      </template>
    </template>
  </dht-drag>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs } from 'vue'
import { CallData, ComponentsItem } from './Types'
export default defineComponent({
  props: {},
  setup() {
    const data = reactive({})

    // 画布列表区域数据
    const components = reactive([] as ComponentsItem[])
    // 画布区域接收
    function onCanvas(CallData: CallData) {
      if (!CallData.modelValue) return null
      components.push({
        id: components.length + 1,
        name: CallData.modelValue as string,
      })
    }
    // 子项移动接收数据
    function onAssemblyDrop(CallData: CallData) {
      console.log(CallData)
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
