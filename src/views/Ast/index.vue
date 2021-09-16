<template>
  <pre v-html="test" class="test"></pre>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const test = ref(``)
    return {
      test,
    }
  },
}
</script>

<style scoped lang="scss">
.test {
  white-space: pre-wrap;
}
</style>
