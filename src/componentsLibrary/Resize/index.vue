<!--suppress CheckTagEmptyBody -->
<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import DhtDc from './DirectionCommand'
import { Direction, PropsCallback, PropsCallstop } from './Type'
import Resize from './Resize'
import { Props } from './Type'
export default defineComponent({
  name: 'DhtResize',
  directives: {
    DhtDc,
  },
  props: {
    maxw: Number,
    maxh: Number,
    minw: Number,
    minh: Number,
    callback: {
      type: Function as PropType<PropsCallback>,
      default: () => {
        return {}
      },
    },
    callstop: {
      type: Function as PropType<PropsCallstop>,
      default: () => {
        return {}
      },
    },
  },
  setup(props, ctx) {
    const { data, rootDom, dcCallback, setDirection, onStop } = Resize(props as Props, ctx)

    return () => {
      return (
        <div ref={rootDom} class="dht-resize" style={{ width: data.width, height: data.height }}>
          {ctx.slots.default && ctx.slots.default()}

          <span
            class="top"
            v-dht-dc={{ callback: dcCallback, stop: onStop }}
            onMouseover={() => setDirection(Direction.top)}
          ></span>
          <span
            class="bottom"
            v-dht-dc={{ callback: dcCallback, stop: onStop }}
            onMouseover={() => setDirection(Direction.bottom)}
          ></span>
          <span
            class="left"
            onMouseover={() => setDirection(Direction.left)}
            v-dht-dc={{ callback: dcCallback, stop: onStop }}
          ></span>
          <span
            class="right"
            onMouseover={() => setDirection(Direction.right)}
            v-dht-dc={{ callback: dcCallback, stop: onStop }}
          ></span>
          <span
            class="top-left"
            onMouseover={() => setDirection(Direction.topLeft)}
            v-dht-dc={{ callback: dcCallback, stop: onStop }}
          ></span>
          <span
            class="top-right"
            onMouseover={() => setDirection(Direction.topRight)}
            v-dht-dc={{ callback: dcCallback, stop: onStop }}
          ></span>
          <span
            class="bottom-left"
            onMouseover={() => setDirection(Direction.bottomLeft)}
            v-dht-dc={{ callback: dcCallback, stop: onStop }}
          ></span>
          <span
            class="bottom-right"
            onMouseover={() => setDirection(Direction.bottomRight)}
            v-dht-dc={{ callback: dcCallback, stop: onStop }}
          ></span>
        </div>
      )
    }
  },
})
</script>
