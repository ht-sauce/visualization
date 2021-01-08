<template>
  <!--页面组件编辑功能-->
  <LayoutList />
  <ComponentList />
  <!--页面编辑区域-->
  <div class="editor-page"></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import LayoutList from './LayoutList/index.vue'
import ComponentList from './ComponentList/index.vue'
export default defineComponent({
  components: {
    ComponentList,
    LayoutList,
  },
  setup() {
    const data = reactive({
      show: true,
    })
    const open = () => {
      console.log(1111)
    }

    return {
      open,
      data,
    }
  },
})
</script>

<style scoped lang="scss">
.editor-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
