<template>
  <div class="test">
    <button @click="one">正常测试</button>
    <div>{{ api }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Ajax from '@/sdk/ajax'
export default defineComponent({
  name: '',
  setup() {
    const ajax = new Ajax()
    interface Ceshi {
      appid: string
      secret: string
      js_code: string
      grant_type: string
    }
    const one = () => {
      ajax
        .request({
          url: '/sns/jscode2session',
          prefix: 'https://api.weixin.qq.com',
          data: {
            appid: 'wx5918c20ef3c671c4',
            secret: '1b17e49cf31366d12d08680826701e00',
            js_code: '081xypFa1uVBRz0WUoGa1Yd9zF4xypFb',
            grant_type: 'authorization_code',
          } as Ceshi,
        })
        .then(e => {
          console.log(e)
        })
        .catch(e => {
          console.log(e)
        })
    }
    const js_code = '041CC30w3aHbcV2R0Q0w3p8wxo4CC30-'
    const api = ref(
      `https://api.weixin.qq.com/sns/jscode2session?appid=wx5918c20ef3c671c4&secret=1b17e49cf31366d12d08680826701e00&js_code=${js_code}&grant_type=authorization_code`,
    ).value
    return {
      api,
      one,
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
  flex-flow: column;
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
