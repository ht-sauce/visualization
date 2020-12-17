<template>
  <div class="experiment">
    <button @click="test">测试数据变化</button>
    <dht-popper>
      <div id="ceshi2">5252</div>
      <template #tooltip>
        <div id="ceshi">fdsafas</div>
      </template>
    </dht-popper>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    interface initData {
      ceshi: number[]
      show: boolean
    }
    const data = reactive({
      ceshi: [],
      show: false,
    } as initData)

    function test() {
      data.ceshi = [1, 2, 3, 4]
      data.show = !data.show
    }

    return {
      ...toRefs(data),
      test,
    }
  },
})
</script>

<style lang="scss">
.experiment {
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#ceshi,
#ceshi2 {
  width: 100px;
  height: 100px;
  background: red;
}
#ceshi2 {
  width: 300px;
  height: 300px;
  background: #13c2c2;
}
</style>
