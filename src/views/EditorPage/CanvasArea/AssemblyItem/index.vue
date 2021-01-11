<template>
  <div class="assembly-item"></div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const data = reactive({})
    return {
      ...toRefs(data),
    }
  },
}
</script>

<style scoped lang="scss">
.assembly-item {
}
</style>
