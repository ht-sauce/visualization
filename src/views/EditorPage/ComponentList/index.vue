<template>
  <float-drawer :y="50" :x="x" v-model="show" title="业务组件列表">
    <div class="component-list">业务组件列表</div>
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
    })

    return {
      ...toRefs(data),
    }
  },
}
</script>

<style scoped lang="scss">
.component-list {
}
</style>
