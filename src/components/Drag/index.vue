<template>
  <div draggable="true" @click="callback">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DhtDrag',
  setup(props, { attrs, emit, slots }) {
    // 在元素开始被拖动时触发,拖动什么
    const dragstart = (ev: Event): void => {
      console.log(1, ev)
    }
    // 放到何处
    const dragover = (ev: Event): void => {
      ev.preventDefault()
      console.log(5, ev)
    }
    // 返回事件
    const callback = (): void => {
      emit('callback', { slots, attrs })
    }

    return {
      dragstart,
      dragover,
      callback,
    }
  },
})
</script>

<style scoped lang="scss"></style>
