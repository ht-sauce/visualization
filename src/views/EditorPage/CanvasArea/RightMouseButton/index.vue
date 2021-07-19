<template>
  <dht-popper trigger="manual" v-model="show" placement="bottom">
    <component :is="name" @contextmenu="onContextmenu">
      <slot></slot>
    </component>
    <template #tooltip>
      <ul class="right-mouse-button">
        <li @click="onAssemblyDel">删除</li>
      </ul>
    </template>
  </dht-popper>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
import { components } from '../Store'
export default defineComponent({
  emits: ['assemblyDel'],
  props: {
    name: String,
    modelValue: Number,
  },
  setup(props, ctx) {
    const data = reactive({
      show: false,
    })

    // 鼠标右键
    function onContextmenu(e: MouseEvent) {
      e.preventDefault()

      data.show = true
    }
    // 组件删除
    function onAssemblyDel() {
      data.show = false

      components.splice(props.modelValue as number, 1)
      ctx.emit('assemblyDel', props.modelValue)
    }
    return {
      ...toRefs(data),
      onContextmenu,
      onAssemblyDel,
    }
  },
})
</script>

<style scoped lang="scss">
.right-mouse-button {
  background: $white;
  > li {
    cursor: pointer;
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    &:hover {
      background: $primary-1;
    }
  }
}
</style>
