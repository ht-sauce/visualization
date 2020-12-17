<template>
  <div class="experiment">
    <dht-popper cesi="1111">
      <div cesi="1111">{{ ceshi }}</div>
    </dht-popper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(props, ctx) {
    const ceshi = ref('fdsafas')

    return {
      ceshi,
    }
  },
})
</script>

<style scoped lang="scss">
.experiment {
}
</style>
