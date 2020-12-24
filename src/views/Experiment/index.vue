<template>
  <div class="experiment">
    <dht-button>按钮测试</dht-button>
    <div class="ceshi">
      <button dht-move-x="false" v-dht-move.boundary="shuffle">剪切板测试</button>
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
    }
    const data = reactive({
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      show: false,
    } as initData)

    function test() {
      data.show = !data.show
    }

    function shuffle2(arry: any) {
      var sortArr = []
      var len = arry.length //获取数组长度指定随机次数

      for (var i = 0; i < len; ) {
        var index = Math.floor(Math.random() * len)
        if (arry[index] != null) {
          sortArr.push(arry[index])
          i++
          arry[index] = null
        }
      }
      return sortArr
    }

    function shuffle(e: any) {
      // console.log(e)
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
  margin-top: 200px;
  margin-left: 200px;
  height: 300px;
  width: 400px;
  background: #eb2f96;
}
</style>
