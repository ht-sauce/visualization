<script lang="tsx">
import { reactive, defineComponent } from 'vue'

export default defineComponent({
  name: 'DhtResize',
  props: {},
  setup(props, ctx) {
    const data = reactive({})
    return () => {
      return (
        <div class="dht-resize">
          {ctx.slots.default && ctx.slots.default()}
          <span class="top"></span>
          <span class="bottom"></span>
          <span class="left"></span>
          <span class="right"></span>
          <span class="top-left"></span>
          <span class="top-right"></span>
          <span class="bottom-left"></span>
          <span class="bottom-right"></span>
        </div>
      )
    }
  },
})
</script>
