<template>
  <div class="home">
    <div class="one">
      <template v-for="(item, index) in colorCard" :key="index">
        <div :class="'bg' + (index + 1)">{{ index + 1 }}</div>
      </template>
    </div>
    <div class="two">
      <template v-for="(item, index) in colorCard" :key="index">
        <div :class="'wb' + (index + 1)">{{ index + 1 }}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import { ComponentInternalInstance } from '@vue/runtime-core'
import style from '@/styles/variables.scss' // 需要支持css modules
export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const self = getCurrentInstance() as ComponentInternalInstance
    const colorCard = ref(new Array(10)).value
    onMounted(() => {
      console.log(style)
    })
    return {
      colorCard,
    }
  },
})
</script>
<style lang="scss" scoped>
.one,
.two {
  display: flex;
}
.bg1 {
  background: $primary-1;
  width: 100px;
  height: 200px;
}
.bg2 {
  @extend .bg1;
  background: $primary-2;
}
.bg3 {
  @extend .bg1;
  background: $primary-3;
}
.bg4 {
  @extend .bg1;
  background: $primary-4;
}
.bg5 {
  @extend .bg1;
  background: $primary-5;
}
.bg6 {
  @extend .bg1;
  background: $primary-color;
}
.bg7 {
  @extend .bg1;
  background: $primary-6;
}
.bg8 {
  @extend .bg1;
  background: $primary-7;
}
.bg9 {
  @extend .bg1;
  background: $primary-8;
}
.bg10 {
  @extend .bg1;
  background: $primary-9;
}

.wb1 {
  @extend .bg1;
  background: $black-1;
}
.wb2 {
  @extend .bg1;
  background: $black-2;
}
.wb3 {
  @extend .bg1;
  background: $black-3;
}
.wb4 {
  @extend .bg1;
  background: $black-4;
}
.wb5 {
  @extend .bg1;
  background: $black-5;
}
.wb6 {
  @extend .bg1;
  background: $black-main;
}
.wb7 {
  @extend .bg1;
  background: $black-6;
}
.wb8 {
  @extend .bg1;
  background: $black-7;
}
.wb9 {
  @extend .bg1;
  background: $black-8;
}
.wb10 {
  @extend .bg1;
  background: $black-9;
}
</style>
