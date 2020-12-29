<template>
  <div class="experiment">
    <dht-button @click="month = month + 1">{{ month }}月份+</dht-button>
    <dht-button @click="month = month - 1">{{ month }}月份-</dht-button>
    <calendar-base :month="month" :year="2020">
      <template #week="{ li }">
        <slot>{{ li }}</slot>
      </template>
      <template #default="{ li }">
        <slot>{{ li.day }}</slot>
      </template>
    </calendar-base>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    const data = reactive({
      show: false,
      show2: false,
      month: 10,
    })

    function test() {
      data.show = !data.show
    }

    function testFun(e: Event) {
      data.show2 = !data.show2
    }

    return {
      ...toRefs(data),
      test,
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
  background: #eb2f96;
  transition: left 0.3s ease-in;
}
</style>
