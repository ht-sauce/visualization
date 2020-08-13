<template>
  <div class="home" ref="root">
    <template v-for="(item, index) in list">
      <div
        :key="index"
        @dragover.prevent
        @drop.prevent="drop($event, index)"
        draggable="true"
        @dragstart="dragstart($event, index)"
        class="ceshi"
      >
        {{ item }}
      </div>
    </template>
    <button @click="setArr">测试响应式</button>
    <button @click="setDynamicComponents">测试动态组件{{ DynamicComponents }}</button>
    <component :is="DynamicComponents"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import DhtDrag from '@/components/Drag/index.vue'
import DhtTest from '@/components/Test/index.vue'
export default defineComponent({
  components: {
    DhtDrag,
    DhtTest,
  },
  mounted(): void {
    console.log(this.http)
  },
  setup(props, ctx) {
    console.log({ ...ctx })

    const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).value
    const setArr = (): void => {
      list[0] = 1111
    }
    // 开始移动
    const dragstart = (ev: Event, index: number): void => {
      ev.dataTransfer.setData('text', index)
    }
    // 放到何处
    const drop = (ev: Event, index: number): void => {
      const startIndex: number = Number(ev.dataTransfer.getData('text'))
      const startLi: number = list[startIndex]
      const endLi: number = list[index]
      list.splice(index, 1, startLi) // 放过去
      list.splice(startIndex, 1, endLi) // 反过来
    }

    const dom = ref(-1).value
    console.log(dom)

    const DynamicComponents = ref('DynamicComponents')
    const setDynamicComponents = (): void => {
      DynamicComponents.value = 'DhtTest'
      console.log(DynamicComponents.value)
    }

    return {
      setDynamicComponents,
      DynamicComponents,
      drop,
      dragstart,
      list,
      setArr,
    }
  },
})
</script>
<style scoped lang="scss">
.home {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  margin-left: 30%;
}
.ceshi {
  width: 200px;
  line-height: 50px;
  height: 50px;
  background: #ff958a;
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin: 20px;
  box-shadow: aqua 0 0 5px;
}
</style>
