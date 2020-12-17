<template>
  <div ref="popper">
    <div ref="tooltip"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { createPopper } from '@popperjs/core'

export default defineComponent({
  name: 'DhtPopper',
  setup(props, ctx) {
    const popper = ref<string | Element>('popper')
    const tooltip = ref<string | Element>('tooltip')

    onMounted(() => {
      const popperDom = popper.value as Element
      const tooltipDom = tooltip.value as Element
      console.log(ctx.slots, { ...ctx.attrs })
      // createPopper(dom, dom, {})
    })

    return {
      popper,
      tooltip,
    }
  },
})
</script>

<style scoped lang="scss"></style>
