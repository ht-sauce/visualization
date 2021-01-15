<script lang="tsx">
import { defineComponent, SetupContext } from 'vue'
import Popper from './Popper'
import ClickOutside from '../ClickOutside'
import { Props } from './types'
export default defineComponent({
  name: 'DhtPopper',
  emits: ['update:modelValue', 'hide', 'show'],
  directives: {
    'dht-click-outside': ClickOutside.directive,
  },
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
    clickOutside: {
      type: Boolean,
      default: true,
    },
    zIndex: Number,
  },
  setup(props, ctx: SetupContext) {
    const {
      zIndex,
      clickOutside,
      popper,
      onClick,
      onMouseover,
      onMouseout,
      data,
      tooltip,
    } = Popper(props as Props, ctx)
    return () => (
      <span v-dht-click-outside={clickOutside} class="dht-popper">
        <span ref={popper} onClick={onClick} onMouseover={onMouseover} onMouseout={onMouseout}>
          {ctx.slots.default && ctx.slots.default()}
        </span>
        <span class="tooltip" style={{ visibility: data.show, zIndex: zIndex }} ref={tooltip}>
          {props.arrow && <span class="arrow" data-popper-arrow />}
          {ctx.slots.tooltip && ctx.slots.tooltip()}
        </span>
      </span>
    )
  },
})
</script>
