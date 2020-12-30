<template>
  <div class="experiment">
    <test-com>
      <template #default="de">{{ de }}</template>
    </test-com>
    <test-a></test-a>
    <NoDcom test="测试props" />
    <div>
      <slot></slot>
    </div>
    <div>
      <slot name="name"></slot>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { TestCom } from './Test'
import NoDcom from './NoDcom'

const TestA = () => <div>fdsafdsa</div>

export default defineComponent({
  components: { TestCom, TestA, NoDcom },
  setup(props, ctx) {
    const dateone = ref('测试')
    const datetwo = reactive({
      test: '测试',
    })
    return {
      dateone,
      ...toRefs(datetwo),
    }
  },
})
</script>

<style lang="scss" scoped>
.experiment {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>
