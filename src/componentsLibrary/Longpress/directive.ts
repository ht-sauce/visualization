import { DirectiveBinding } from 'vue'
import { IsPhone } from '../tool/tool'
interface HTMLElementCopy extends HTMLElement {
  settime: number | null
}
// 参数处理
function paramsHandler(el: HTMLElementCopy, binding: DirectiveBinding) {
  const callback = binding.value?.callback ?? (() => null)
  const time = binding.value?.time ?? 350

  return {
    callback,
    time,
  }
}

// 事件绑定
function eventBind(el: HTMLElementCopy, binding: DirectiveBinding) {
  const { callback, time } = paramsHandler(el, binding)
  el.settime && clearTimeout(el.settime)
  console.log(IsPhone())

  if (IsPhone()) {
    // 手机端
    el.ontouchstart = () => {
      el.settime = setTimeout(() => callback(el), time)
    }
    el.ontouchend = () => {
      el.settime && clearTimeout(el.settime)
    }
  } else {
    // pc端
    el.onmousedown = () => {
      el.settime = setTimeout(() => callback(el), time)
    }
    el.onmouseup = () => {
      el.settime && clearTimeout(el.settime)
    }
  }
}

const Longpress = {
  // 绑定元素
  mounted(el: HTMLElementCopy, binding: DirectiveBinding) {
    eventBind(el, binding)
  },
  updated(el: HTMLElementCopy, binding: DirectiveBinding) {
    eventBind(el, binding)
  },
  beforeUnmount(el: HTMLElementCopy) {
    // 必要的操作
    el.onmousedown = null
    el.onmousemove = null
    el.onmouseup = null
  },
}

export default Longpress
