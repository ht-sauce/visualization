<template>
  <!--页面组件编辑功能-->
  <LayoutList />
  <ComponentList />
  <!--页面编辑区域-->
  <CanvasArea />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import LayoutList from './LayoutList/index.vue'
import ComponentList from './ComponentList/index.vue'
import CanvasArea from './CanvasArea/index.vue'

export default defineComponent({
  components: {
    ComponentList,
    LayoutList,
    CanvasArea,
  },
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
.editor-page {
}
</style>
