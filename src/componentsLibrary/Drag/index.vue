<template>
  <div
    @drop="ondrop"
    @drag="ondrag"
    @dragend="ondragend"
    @dragenter="ondragenter"
    @dragexit="ondragexit"
    @dragleave="ondragleave"
    @dragover="ondragover"
    @dragstart="ondragstart"
    :draggable="draggable"
    class="dht-drag"
    :style="{ cursor: draggable ? 'move' : 'default' }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import drag from './drag'
import { SetupContext } from '@vue/runtime-core'
export default defineComponent({
  name: 'DhtDrag',
  emits: ['drag', 'dragend', 'dragenter', 'dragexit', 'dragleave', 'dragover', 'dragstart', 'drop'],
  props: {
    // 绑定的数据类型，因为可能很多，所以就全写上去
    modelValue: {
      type: [String, Number, Object, Array, Boolean, Date, Function, Symbol, Promise],
      default: null,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx: SetupContext) {
    return {
      ...drag(props, ctx as SetupContext),
    }
  },
})
</script>
