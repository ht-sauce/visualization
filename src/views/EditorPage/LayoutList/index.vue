<template>
  <!--布局组件随着需求要求，把页面进行拆分，然后实现特定的布局组件-->
  <float-drawer :x="x" v-model="show" title="布局组件列表">
    <div class="layout-list">
      <template v-for="item in LayoutList" :key="item">
        <dht-drag :model-value="handlerModelValue(item)">
          <component :is="item"></component>
        </dht-drag>
      </template>
    </div>
  </float-drawer>
</template>

<script>
import { reactive, toRefs } from 'vue'
import FloatDrawer from '@/componentsBusiness/FloatDrawer/index'
import { DragDataType } from '../Type'
export default {
  emit: ['update:modelValue'],
  components: {
    FloatDrawer,
  },
  props: {
    modelValue: Boolean,
    title: String,
  },
  setup() {
    const data = reactive({
      show: false,
      x: window.innerWidth - 110,
      // 布局组件列表数据
      LayoutList: ['dht-button'],
    })
    // 处理绑定的数据类型
    function handlerModelValue(data) {
      return {
        type: DragDataType.layout,
        data: data,
      }
    }

    return {
      ...toRefs(data),
      handlerModelValue,
    }
  },
}
</script>

<style scoped lang="scss">
.layout-list {
}
</style>
