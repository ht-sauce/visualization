<template>
  <div class="editor-page">
    <dht-popup></dht-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const open = () => {
      // 打开一个新窗口
      // window.open('https://www.baidu.com/', 'ceshi', 'width=600,height=300,top=100%,left=100%')
    }

    return {
      open,
    }
  },
})
</script>

<style scoped lang="scss">
.editor-page {
  width: 500px;
  height: 500px;
}
</style>
