<template>
  <dht-float-win
    @stop="floatStop"
    :disabled="false"
    :y="0"
    :pwin="true"
    :boundary="false"
    :tblr="[false, false, true, true]"
  >
    <div v-dht-longpress="{ callback: longpress }" class="layout-list">布局组件列表</div>
  </dht-float-win>
  <!--布局组件展示部分-->
  <dht-popup v-model="show" :mask="false" ToBody direction="left">
    <div class="layout-popup">
      <div class="header">
        <span class="title">布局组件列表</span>
        <i class="dht-icon-close-bold icon-close" @click="show = !show"></i>
      </div>
    </div>
  </dht-popup>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const data = reactive({
      show: false,
      direction: 'left',
    })
    function floatStop(callData) {
      const { direction } = callData
      data.direction = direction
    }

    function longpress(el, bindata) {
      console.log(2222)
    }
    return {
      ...toRefs(data),
      floatStop,
      longpress,
    }
  },
}
</script>

<style scoped lang="scss">
.layout-list {
  $lw: 55px;
  width: $lw * 2;
  height: $lw * 0.8;
  background: $primary-color;
  box-shadow: $box-shadow;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: $primary-5;
  }
}
.layout-popup {
  width: 400px;
  height: 100vh;
  padding: 10px;
  .header {
    display: flex;
    align-items: center;
    .title {
      font-size: $h4-16;
    }
    .icon-close {
      font-size: 20px;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>
