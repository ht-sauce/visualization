<script lang="tsx">
import { defineComponent, onMounted, ref, reactive, onUnmounted, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance, Options } from '@popperjs/core'

export default defineComponent({
  name: 'DhtPopper',
  props: {
    trigger: {
      type: String,
      default: 'hover', // hover,click,manual
    },
    modelValue: Boolean, // 手动绑定
    disabled: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: Boolean,
      default: true,
    },
    offset: {
      type: Number,
      default: 16,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    options: {
      type: Object,
      default: () => null, // 出现ts问题参考：https://github.com/vuejs/vue-next/issues/2474
    },
  },
  setup(props, ctx) {
    let popperInstance: Instance | null = null

    interface dataType {
      show: string
    }
    const data = reactive({
      show: 'hidden',
    } as dataType)

    // 被绑定的
    const popper = ref<string | HTMLElement>('popper')
    // 会移动的，这是提示内容
    const tooltip = ref<string | HTMLElement>('tooltip')

    // 合并参数
    function mergeOptions() {
      const opt = {
        placement: props.placement,
        ...props.options,
      } as Options
      const modifiers = []

      modifiers.push({
        name: 'offset',
        options: {
          offset: [0, props.offset],
        },
      })

      opt.modifiers = [...modifiers]
      return opt
    }

    onMounted(() => {
      if (props.disabled) return false

      const popperDom = popper.value as HTMLElement
      const tooltipDom = tooltip.value as HTMLElement

      popperInstance = createPopper(popperDom, tooltipDom, mergeOptions())
    })

    onUnmounted(() => {
      ;(popperInstance as Instance)?.destroy()
      popperInstance = null
    })

    // 点击事件
    function onClick() {
      if (props.trigger !== 'click') return null
      if (data.show === 'hidden') data.show = 'visible'
      else data.show = 'hidden'
    }

    function onMouseover() {
      if (props.trigger !== 'hover') return null
      data.show = 'visible'
    }

    function onMouseout() {
      if (props.trigger !== 'hover') return null
      data.show = 'hidden'
    }

    watch(
      () => props.modelValue,
      (e) => {
        if (props.trigger !== 'manual') return null

        if (e) data.show = 'visible'
        else data.show = 'hidden'
      },
    )

    return () => (
      <span class="dht-popper">
        <span ref={popper} onClick={onClick} onMouseover={onMouseover} onMouseout={onMouseout}>
          {ctx.slots.default && ctx.slots.default()}
        </span>
        <span class="tooltip" style={{ visibility: data.show } as any} ref={tooltip}>
          <span class="arrow" data-popper-arrow />
          {ctx.slots.tooltip && ctx.slots.tooltip()}
        </span>
      </span>
    )
  },
})
</script>
