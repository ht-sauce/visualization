<template>
  <dht-float-win :y="60" :pwin="true" :boundary="false" :tblr="[false, false, true, true]">
    <div class="component-list">可选组件列表</div>
  </dht-float-win>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'

export default {
  setup() {
    const data = reactive({})
    return {
      ...toRefs(data),
    }
  },
}
</script>

<style scoped lang="scss">
.component-list {
  $lw: 55px;
  width: $lw * 2;
  height: $lw * 0.8;
  background: $primary-color;
  box-shadow: $box-shadow;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: $primary-5;
  }
}
</style>
