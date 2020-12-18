<script lang="tsx">
import { defineComponent, onMounted, ref, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance, Options } from '@popperjs/core'

export default defineComponent({
  name: 'DhtPopper',
  props: {
    disabled: Boolean,
    placement: {
      type: String,
      default: 'bottom',
    },
    popperOptions: {
      type: Object,
      default: () => {
        // 出现ts问题参考：https://github.com/vuejs/vue-next/issues/2474
        return {}
      },
    },
  },
  setup(props, ctx) {
    let popperInstance: Instance | null = null

    // 被绑定的
    const popper = ref<string | HTMLElement>('popper')
    // 会移动的，这是提示内容
    const tooltip = ref<string | HTMLElement>('tooltip')

    onMounted(() => {
      if (props.disabled) return false

      const popperDom = popper.value as HTMLElement
      const tooltipDom = tooltip.value as HTMLElement

      popperInstance = createPopper(popperDom, tooltipDom, {
        placement: props.placement,
        ...props.popperOptions,
      } as Options)
    })

    onUnmounted(() => {
      ;(popperInstance as Instance)?.destroy()
      popperInstance = null
    })

    return () => (
      <span>
        <span ref={popper}>{ctx.slots.default && ctx.slots.default()}</span>
        {!props.disabled && <span ref={tooltip}>{ctx.slots.tooltip && ctx.slots.tooltip()}</span>}
      </span>
    )
  },
})
</script>
