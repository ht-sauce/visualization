<template>
  <div class="experiment">
    <dht-float-win>
      <div class="drag-one">上下左右自动贴边组件</div>
    </dht-float-win>
    <dht-color-picker v-model="show">
      <dht-button @click="show = !show">颜色选择器</dht-button>
    </dht-color-picker>

    <dht-resize :minw="100" :minh="100" :maxw="200" :maxh="200">
      <div class="drag-three">元素随意缩放实验</div>
    </dht-resize>
  </div>
</template>

<script lang="tsx">
import { defineComponent, toRefs, reactive } from 'vue'
import Ajax from '@/services/ajax/ajax'
import Concurrent from '@/tool/Concurrent'
export default defineComponent({
  components: {},
  setup(props, ctx) {
    const data = reactive({
      show: false,
    })
    const ajax = new Ajax()
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
  width: 1000px;
  height: 800px;
  border: 1px saddlebrown solid;
}
.experiment-div {
  padding: 10px;
  width: 100px;
  height: 100px;
  background: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.drag-one {
  @extend .experiment-div;
}
.drag-two {
  @extend .experiment-div;
  background: red;
}
.drag-three {
  @extend .experiment-div;
  background: #fa8c16;
  width: 200px;
}
</style>
