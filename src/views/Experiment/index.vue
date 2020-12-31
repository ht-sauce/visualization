<template>
  <div class="experiment">
    <dht-drag>
      <div class="drag-one">可拖动1</div>
    </dht-drag>
    <dht-drag>
      <div class="drag-two">可拖动2</div>
    </dht-drag>
  </div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, ctx) {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.experiment {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.drag-one,
.drag-two {
  width: 100px;
  height: 100px;
  background: #1890ff;
  margin: 20px;
}
</style>
