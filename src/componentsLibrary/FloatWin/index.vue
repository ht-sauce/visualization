<script lang="tsx">
import { defineComponent, reactive, toRefs } from 'vue'
import DhtMove from '../Move'
export default defineComponent({
  name: 'DhtFloatWin',
  directives: {
    DhtMove: DhtMove.directive,
  },
  emits: [],
  props: {},
  setup(props, ctx) {
    const Movedata = reactive({ x: 0, y: 0 })
    //console.log(window.innerWidth, window.innerHeight)
    function startmove() {
      console.log()
    }
    function stopmove(e: any) {
      const { left, top } = e
      console.log(left, top)
    }

    return () => (
      <div
        v-dht-move={{
          callmove: startmove,
          callstop: stopmove,
          pwin: true,
          // x: 100,
          // y: 100,
        }}
      >
        {ctx.slots.default && ctx.slots.default()}
      </div>
    )
  },
})
</script>