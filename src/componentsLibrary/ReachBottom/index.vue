<template>
  <div class="root" @scroll="OnScroll" ref="root">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'DhtReachBottom',
  emit: ['load', 'roll'],
  props: {
    bottom: {
      type: Number,
      default: 10,
    },
  },
  setup(props, ctx) {
    const root = ref<string | HTMLElement>('root')
    let _currentScroll = 0 // 当前滚动距离，判断上还是下
    let _isOnReachBottom = false // 是否触发过滑动到底部事件,保证不会一次性触发多次事件
    function OnScroll() {
      const dom = root.value as HTMLElement
      const clientHeight = dom.clientHeight
      const contentHeight = dom.scrollHeight //内容高度
      const scrollTop = dom.scrollTop // 滚动距离

      const scollType = scrollTop >= _currentScroll ? 'down' : 'up'

      const BottomDistance = contentHeight - clientHeight - scrollTop
      // 页面滚动事件
      ctx.emit('roll', {
        dom: dom,
        clientHeight,
        contentHeight,
        scrollTop,
        PercentageDown: scrollTop / (contentHeight - clientHeight), // 向下滚动百分比
        BottomDistance: BottomDistance, // 底部距离，px
      })

      //到达底部10px时,页面滚动到底部的事件
      if (!_isOnReachBottom && scollType === 'down' && BottomDistance <= props.bottom) {
        _isOnReachBottom = true
        ctx.emit('load')
      }

      if (scollType === 'up') {
        _isOnReachBottom = false
      }

      _currentScroll = scrollTop
    }

    return {
      root,
      OnScroll,
    }
  },
})
</script>

<style scoped lang="scss"></style>
