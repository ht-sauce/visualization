<template>
  <div class="experiment">
    <!--<button v-dht-click-outside="testFun" @click="test">测试</button>-->
    <!--<button v-on:click="shuffle">Shuffle</button>-->
    <dht-color-picker v-model="show">
      <button @click="test">测试</button>
    </dht-color-picker>
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

    function shuffle() {
      // data.items = shuffle2(data.items)
    }

    return {
      ...toRefs(data),
      test,
      shuffle,
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
</style>
