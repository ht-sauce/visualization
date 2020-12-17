<script lang="tsx">
import { defineComponent, onMounted, ref, PropType } from 'vue'
import { createPopper } from '@popperjs/core'

export default defineComponent({
  name: 'DhtPopper',
  props: {
    options: {
      type: Object,
      default: () => {
        // 出现ts问题参考：https://github.com/vuejs/vue-next/issues/2474
        return {
          placement: 'top',
        }
      },
    },
  },
  setup(props, ctx) {
    // 被绑定的
    const popper = ref<string | HTMLElement>('popper')
    // 会移动的，这是提示内容
    const tooltip = ref<string | HTMLElement>('tooltip')

    onMounted(() => {
      const popperDom = popper.value as HTMLElement
      const tooltipDom = tooltip.value as HTMLElement

      createPopper(popperDom, tooltipDom, props.options)
    })

    return () => (
      <span>
        <span ref={popper}>{ctx.slots.default && ctx.slots.default()}</span>
        <span ref={tooltip}>{ctx.slots.tooltip && ctx.slots.tooltip()}</span>
      </span>
    )
  },
})
</script>
