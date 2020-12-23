<template>
  <button class="dht-button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from 'vue'
export default defineComponent({
  name: 'DhtButton',
  emits: [],
  props: {
    type: {
      type: String,
      default: 'text', // text,main,success,error,info
    },
  },
  setup(props, ctx) {
    const data = reactive({})

    return {
      ...toRefs(data),
    }
  },
})
</script>
