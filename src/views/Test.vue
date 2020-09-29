<template>
  <div class="test">
    <div class="ceshi"></div>
    <div>fsdafsasasasasasasasasasasasasasa</div>
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
    ajax.image({
      data: {
        ceshi: '11111',
        dht: 12321,
      } as Ceshi,
    })
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
