<template>
  <dht-float-win
    @stop="floatStop"
    :y="y"
    :x="x"
    :pwin="true"
    :boundary="false"
    :tblr="[false, false, true, true]"
  >
    <div class="float-drawer">
      <span class="button" @click="isShow">{{ title }}</span>
    </div>
  </dht-float-win>
  <!--布局组件展示部分-->
  <dht-popup :modelValue="modelValue" :mask="false" ToBody :direction="directionIn">
    <div class="float-drawer-popup">
      <div class="header">
        <span class="title">{{ title }}</span>
        <i class="dht-icon-close-bold icon-close" @click="isShow"></i>
      </div>
      <!--弹窗内容部分-->
      <slot></slot>
    </div>
  </dht-popup>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  emit: ['update:modelValue'],
  props: {
    modelValue: Boolean,
    title: String,
    /*以下参数为设置初始值*/
    y: {
      type: Number,
      default: 0,
    },
    x: {
      type: Number,
      default: 0,
    },
    // 初始位置
    direction: {
      type: String,
      default: 'right',
    },
  },
  setup(props, ctx) {
    const data = reactive({
      directionIn: props.direction,
    })
    function floatStop(callData) {
      const { direction } = callData
      data.directionIn = direction
    }

    function isShow() {
      ctx.emit('update:modelValue', !props.modelValue)
    }

    return {
      ...toRefs(data),
      floatStop,
      isShow,
    }
  },
}
</script>

<style scoped lang="scss">
.float-drawer {
  $lw: 55px;
  width: $lw * 2;
  height: $lw * 0.8;
  background: $primary-color;
  box-shadow: $box-shadow;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  .button {
    cursor: pointer;
    &:hover {
      background: $primary-5;
    }
  }
}
.float-drawer-popup {
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
