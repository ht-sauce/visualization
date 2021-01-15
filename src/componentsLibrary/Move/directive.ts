import { DirectiveBinding } from 'vue'
import { HTMLElementCopy, VmoveCallData, REparamsHandler } from './types'

function paramsHandler(dragBox: HTMLElementCopy, binding: DirectiveBinding): REparamsHandler {
  const disabled = binding.value?.disabled ?? false
  const boundary = binding.value?.boundary ?? false // 是否控制边界
  // 是否根据window的范围进行移动,注意和boundary参数是互斥使用的
  const pwin = binding.value?.pwin ?? false
  //加入偏量值会导致负数出现
  const deviationX = binding.value?.deviationX ?? 0
  const deviationY = binding.value?.deviationY ?? 0

  // dom预先定义
  dragBox.style.position = 'absolute'
  // 父元素设置
  const pdom = dragBox.parentNode as HTMLElement
  pdom.style.position = 'relative'

  // 回调函数定义
  let callback = <T>(arg: T) => {
    return null
  }
  // 移动开始
  let callstart = <T>(arg: T) => {
    return null
  }
  // 移动结束
  let callstop = <T>(arg: T) => {
    return null
  }
  if (typeof binding.value === 'function') {
    callback = binding.value
  }
  if (typeof binding.value === 'object') {
    callback = binding.value?.callback ? binding.value.callback : callback
    callstart = binding.value?.callstart ? binding.value.callstart : callstart
    callstop = binding.value?.callstop ? binding.value.callstop : callstop
  }

  // 父元素宽高
  const pw = pwin ? window.innerWidth - 1 : pdom.offsetWidth + deviationX
  const ph = pwin ? window.innerHeight - 1 : pdom.offsetHeight + deviationY
  // 本身宽高
  const sw = dragBox.offsetWidth
  const sh = dragBox.offsetHeight // 在控制父边界情况下避免元素超出范围
  // 计算得到最大移动距离
  const maxw = pw - sw //+ dragBox.customOffsetLeft
  const maxh = ph - sh //+ dragBox.customOffsetHeight
  const minw = -deviationX
  const minh = -deviationY

  // x,y轴移动
  const isX = dragBox.getAttribute('dht-move-x') !== 'false'
  const isY = dragBox.getAttribute('dht-move-y') !== 'false'
  let mx = null,
    my = null
  if (typeof binding.value === 'object') {
    mx = binding.value.x ?? 0
    my = binding.value.y ?? 0
  }

  if (!dragBox.isMove) {
    dragBox.style.transition = 'top 0.3s, left 0.3s'
    const left = (boundary ? (mx / 100) * maxw : mx) + 'px'
    const top = (boundary ? (my / 100) * maxh : my) + 'px'
    if (typeof mx === 'number' && isX) dragBox.style.left = left
    if (typeof my === 'number' && isY) dragBox.style.top = top
  }
  return {
    callstart,
    callstop,
    callback,
    boundary,
    pw,
    ph,
    sw,
    sh,
    maxw,
    maxh,
    minw,
    minh,
    isY,
    isX,
    mx,
    my,
    pwin,
    disabled,
  }
}

// 事件绑定
function eventBind(dragBox: HTMLElementCopy, binding: DirectiveBinding) {
  const {
    pwin,
    callstart,
    callstop,
    callback,
    maxw,
    maxh,
    minw,
    minh,
    isX,
    isY,
    sw,
    sh,
    disabled,
    boundary,
  } = paramsHandler(dragBox, binding) as REparamsHandler

  dragBox.onmousedown = (e) => {
    if (disabled) return // 如果禁用则不能移动
    // 阻止默认事件，避免元素选中
    e.preventDefault()
    dragBox.isMove = true
    dragBox.style.cursor = 'move'
    //算出鼠标当前相对元素的位置
    const disX = e.x - dragBox.offsetLeft
    const disY = e.y - dragBox.offsetTop

    let left = 0,
      top = 0,
      // 相对于父元素百分比
      percentX = 0,
      percentY = 0
    callstart(true)

    document.onmousemove = (e2) => {
      dragBox.style.transition = ''
      //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      left = e2.clientX - disX
      top = e2.clientY - disY
      // 当传入true代表控制边界
      if (boundary || pwin) {
        left = left > maxw ? maxw : left < minw ? minw : left
        top = top > maxh ? maxh : top < minh ? minh : top
        // 计算移动百分比
        percentX = Number(((left / maxw) * 100).toFixed(0))
        percentX = isNaN(percentX) ? 0 : percentX
        percentY = Number(((top / maxh) * 100).toFixed(0))
        percentY = isNaN(percentY) ? 0 : percentY
      }
      //移动当前元素
      isX && (dragBox.style.left = left + 'px')
      isY && (dragBox.style.top = top + 'px')

      callback({
        left,
        top,
        percentX,
        percentY,
        minX: minw,
        minY: minh,
        maxX: maxw,
        maxY: maxh,
        selfWidth: sw,
        selfHeight: sh,
      } as VmoveCallData)
    }
    document.onmouseup = (updom) => {
      //鼠标弹起来的时候不再移动
      dragBox.isMove = false
      document.onmousemove = null
      document.onmouseup = null
      dragBox.style.cursor = 'default'
      callstop({
        left,
        top,
        percentX,
        percentY,
        minX: minw,
        minY: minh,
        maxX: maxw,
        maxY: maxh,
        selfWidth: sw,
        selfHeight: sh,
      } as VmoveCallData)
    }
  }
}

const Move = {
  // 绑定元素的父组件挂载时调用
  mounted(el: HTMLElementCopy, binding: DirectiveBinding) {
    eventBind(el, binding)
  },
  updated(el: HTMLElementCopy, binding: DirectiveBinding) {
    paramsHandler(el, binding)
    eventBind(el, binding)
  },
  beforeUnmount(el: HTMLElementCopy) {
    // 必要的操作
    el.onmousedown = null
    document.onmousemove = null
    document.onmouseup = null
  },
}

export default Move
