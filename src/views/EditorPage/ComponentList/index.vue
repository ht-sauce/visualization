<template>
  <float-drawer :y="50" :x="x" v-model="show" title="业务组件列表">
    <div class="component-list">
      <template v-for="item in ComponentList" :key="item">
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
import { DragDataType } from '@/views/EditorPage/Type'
export default {
  emit: ['update:modelValue'],
  components: {
    FloatDrawer,
  },
  props: {
    modelValue: Boolean,
    title: String,
  },
  setup(props, ctx) {
    const data = reactive({
      show: false,
      x: window.innerWidth - 110,
      // 业务组件列表数据
      ComponentList: ['dht-button'],
    })

    // 处理绑定的数据类型
    function handlerModelValue(data) {
      return {
        type: DragDataType.business,
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
.component-list {
}
</style>
