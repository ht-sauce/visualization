<template>
  <div class="experiment">
    <button @click="test">测试</button>
    <dht-popup v-model="show" direction="left">
      <div class="experiment-top"><button @click="test">测试</button></div>
    </dht-popup>
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

    function beforeClose(done: () => void) {
      done()
    }

    return {
      ...toRefs(data),
      test,
      beforeClose,
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

.experiment-2 {
  width: 1000px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
}
.experiment-left {
  width: 300px;
  height: 100%;
  background: deepskyblue;
}

.experiment-top {
  width: 100%;
  height: 100%;
  background: deepskyblue;
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
