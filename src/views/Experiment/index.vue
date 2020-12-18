<template>
  <div class="experiment">
    <div class="chengda">
      <dht-popper>
        <template #tooltip>
          <div class="ceshi">显隐内容</div>
        </template>
        <div class="ceshi2">绑定的内容</div>
      </dht-popper>
    </div>

    <div>ceshi</div>
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
  width: 500px;
  height: 200px;
  display: flex;
  overflow: auto;
}
.chengda {
  width: 300px;
  height: 900px;
}
.ceshi2 {
  margin-top: 100px;
  width: 100px;
  height: 100px;
  background: red;
}
.ceshi {
  width: 100px;
  height: 200px;
  background: #13c2c2;
}
</style>
