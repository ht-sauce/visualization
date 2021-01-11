<template>
  <float-drawer :y="300" v-model="show" title="画布初始设置" direction="left">
    <div class="canvas-set"></div>
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
      formData: {
        width: '100%',
        background: '',
      },
    })

    return {
      ...toRefs(data),
    }
  },
}
</script>

<style scoped lang="scss">
.canvas-set {
  background: transparent;
}
</style>
