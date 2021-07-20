<template>
  <router-view />
</template>

<script type="tsx">
import { defineComponent} from 'vue'
import DhtBuryingPoint from '@/DhtBuryingPoint'
export default defineComponent({
  setup() {
    new DhtBuryingPoint()
  }
})
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: $h5-14;
  color: $font-color;
}
</style>
