<template>
  <div class="test">
    <button @click="one">正常测试</button>
    <button @click="timeout">延迟测试</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Ajax from '@/sdk/ajax'
export default defineComponent({
  name: '',
  setup() {
    const ajax = new Ajax()
    interface Ceshi {
      ceshi: string
      dht: number
    }
    const one = () => {
      ajax
        .request({
          url: '/test/one',
          data: {
            ceshi: '11111',
            dht: 12321,
          } as Ceshi,
        })
        .then(e => {
          console.log(e)
        })
        .catch(e => {
          console.log(e)
        })
    }
    const timeout = () => {
      ajax
        .request({
          url: '/test/timeout',
          timeout: 1000 * 10,
          data: {
            ceshi: '11111',
            dht: 12321,
          } as Ceshi,
        })
        .then(e => {
          console.log(e)
        })
        .catch()
    }
    return {
      one,
      timeout,
    }
  },
})
</script>

<style scoped lang="scss">
.test {
  //background: #000;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    margin: 20px;
    width: 80px;
    height: 40px;
    line-height: 40px;
    background: #ff958a;
    color: #fff;
    text-align: center;
    border: none;
    &:hover {
      background: darkorange;
    }
  }
}
.ceshi {
  position: absolute;
  width: 82px;
  height: 30px;
  /*border-right: 8px solid #65a7ef;*/
  /*border-bottom: 4.5px solid #65a7ef;*/
  transform: rotate(-145deg) skew(51deg);
  box-shadow: red 0 0 6px inset;
  clip: rect(10px 82px 31px 30px);
}
</style>
