<template>
  <div class="experiment">
    <dht-float-win>
      <div class="drag-one">12313</div>
    </dht-float-win>
    <dht-color-picker v-model="show">
      <span class="drag-two">12313</span>
    </dht-color-picker>
    <dht-button @click="show = !show">按钮</dht-button>
  </div>
</template>

<script lang="tsx">
import { defineComponent, toRefs, reactive } from 'vue'
export default defineComponent({
  components: {},
  setup(props, ctx) {
    const data = reactive({
      show: false,
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss" scoped>
.experiment {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 500px;
  border: 1px saddlebrown solid;
}
.drag-one,
.drag-two {
  width: 100px;
  height: 100px;
  background: #1890ff;
}
.drag-two {
  background: red;
}
</style>
