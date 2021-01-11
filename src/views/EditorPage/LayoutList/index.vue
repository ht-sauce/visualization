<template>
  <float-drawer :x="x" v-model="show" title="布局组件列表">
    <div class="layout-list">
      <template v-for="item in LayoutList" :key="item">
        <dht-drag :model-value="item">
          <component :is="item"></component>
        </dht-drag>
      </template>
    </div>
  </float-drawer>
</template>

<script>
import { reactive, toRefs } from 'vue'
import FloatDrawer from '@/componentsBusiness/FloatDrawer/index'
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
      // 布局组件列表数据
      LayoutList: ['dht-button'],
    })

    return {
      ...toRefs(data),
    }
  },
}
</script>

<style scoped lang="scss">
.layout-list {
}
</style>
