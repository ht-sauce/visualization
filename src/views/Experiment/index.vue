<template>
  <div class="experiment">
    <dht-button>按钮测试</dht-button>
    <div class="ceshi">
      <button v-dht-move.boundary="{ callback: shuffle, x: 100, y: 100 }">剪切板测试</button>
    </div>
    <!--<button v-on:click="shuffle">Shuffle</button>-->
    <dht-color-picker v-model="show">
      <button @click="test">测试</button>
    </dht-color-picker>
    <dht-icon name="electronics"></dht-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    interface initData {
      ceshi: number[]
      show: boolean
      items: number[]
      xy: { x: 10; y: 10 }
    }
    const data = reactive({
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      show: false,
    } as initData)

    function test() {
      data.show = !data.show
    }

    function shuffle(e: any) {
      console.log(e)
      // data.items = shuffle2(data.items)
    }

    function testFun(e: Event) {
      console.log(e)
      //navigator.clipboard.writeText('fdafsa')
      //document.execCommand('Copy')
    }

    return {
      ...toRefs(data),
      test,
      shuffle,
      testFun,
    }
  },
})
</script>

<style lang="scss">
.experiment {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ceshi {
  height: 300px;
  width: 400px;
  background: #eb2f96;
  transition: left 0.3s ease-in;
}
</style>
