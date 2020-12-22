<template>
  <div class="dht-drag">{{ ceshi }}</div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'

export default defineComponent({
  name: 'DhtDrag',
  setup(props, ctx) {
    const data = reactive({
      ceshi: 1321,
    })

    function start() {
      console.log(data)
    }

    return {
      ...toRefs(data),
    }
  },
})
</script>
