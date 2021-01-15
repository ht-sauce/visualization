import { DirectiveBinding } from 'vue'
import { CallData, Callback } from './Type'
// 获取参数
function getParams(el: HTMLElement, binding: DirectiveBinding) {
  const callback: Callback =
    binding.value?.callback ??
    ((args: CallData) => {
      return {}
    })
  const stop =
    binding.value?.stop ??
    (() => {
      return {}
    })

  return {
    callback,
    stop,
  }
}

function eventBind(el: HTMLElement, binding: DirectiveBinding) {
  const { callback, stop } = getParams(el, binding)

  el.onmousedown = (emd) => {
    //阻止默认事件
    emd.preventDefault()

    const { x, y } = emd

    document.onmousemove = (dmm) => {
      const mx = dmm.x
      const my = dmm.y

      callback({ x, y, mx, my } as CallData)
    }
    //终止事件
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      stop()
    }
  }
}

const DirectionCommand = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    eventBind(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    eventBind(el, binding)
  },
  beforeUnmount(el: HTMLElement) {
    // 必要的操作
    el.onmousedown = null
    document.onmousemove = null
    document.onmouseup = null
  },
}

export default DirectionCommand
