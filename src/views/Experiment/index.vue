<template>
  <div class="experiment">
    <dht-float-win>
      <div class="drag-one">可拖动1</div>
    </dht-float-win>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {},
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
}
</style>
