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
      show: true,
    } as initData)

    function test() {
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
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ceshi2 {
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  background: red;
}
.ceshi {
  width: 100px;
  height: 100px;
  background: #13c2c2;
}
</style>
