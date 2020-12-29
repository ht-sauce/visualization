<template>
  <div class="experiment">
    <test-com>
      <template #default="de">{{ de }}</template>
    </test-com>
    <test-a></test-a>
  </div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue'
import { TestCom } from './Test'

const TestA = () => <div>fdsafdsa</div>

export default defineComponent({
  components: { TestCom, TestA },
  setup(props, ctx) {
    return {}
  },
})
</script>

<style lang="scss">
.experiment {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
