<template>
  <div class="index" v-html="test"></div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const test =
      ref(`<p>PUB115009<img class="wscnph" style="width: auto; height: auto; max-width: 100%; max-height: 100%;" src="https://sit-private-api.cits.com.cn/images/public/6f886395-84ec-4686-9b35-8340dde02dc4.jpeg" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><img class="wscnph" style="width: auto; height: auto; max-width: 100%; max-height: 100%;" src="https://sit-private-api.cits.com.cn/images/public/e461c821-e29a-49fd-854d-643e23427817.jpeg" /></p>`)
    return {
      test,
    }
  },
}
</script>

<style scoped lang="scss">
.index {
}
</style>
