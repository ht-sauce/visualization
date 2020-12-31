<template>
  <div class="editor-page"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const open = () => {
      console.log(1111)
    }

    return {
      open,
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
