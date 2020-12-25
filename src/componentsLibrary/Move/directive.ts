import { DirectiveBinding } from 'vue'

interface HTMLElementCopy extends HTMLElement {
  customOffsetLeft: number
  customOffsetHeight: number
}

function paramsHandler(dragBox: HTMLElementCopy, binding: DirectiveBinding) {
  const boundary = binding.modifiers?.boundary ?? false // 是否控制边界
  // 子元素设置
  // dragBox.style.position = 'absolute'
  // 父元素设置
  const pdom = dragBox.parentNode as HTMLElement
  //boundary && (pdom.style.position = 'relative')
  // 回调函数定义
  let callback = (arg: any) => {
    return null
  }
  if (typeof binding.value === 'function') {
    callback = binding.value
  }
  if (typeof binding.value === 'object') {
    callback = binding.value?.callback ? binding.value.callback : callback
  }

  // 父元素宽高
  const pw = pdom.offsetWidth
  const ph = pdom.offsetHeight
  // 本身宽高
  const sw = dragBox.offsetWidth
  const sh = dragBox.offsetHeight * 2 // 在控制父边界情况下避免元素超出范围
  // 计算得到最大移动距离
  const maxw = pw - sw + dragBox.customOffsetLeft
  const maxh = ph - sh + dragBox.customOffsetHeight
  const minw = 0
  const minh = 0
  console.log(dragBox.offsetLeft)
  // x,y轴移动
  const x = dragBox.getAttribute('dht-move-x') !== 'false'
  const y = dragBox.getAttribute('dht-move-y') !== 'false'
  let mx = null,
    my = null
  if (typeof binding.value === 'object') {
    mx = binding.value.x
    my = binding.value.y
  }
  if (boundary) {
    dragBox.style.transition = 'top 0.3s, left 0.3s'
    if (typeof mx === 'number' && x) {
      dragBox.style.left = (mx / 100) * maxw + 'px'
    }
    if (typeof my === 'number' && y) {
      dragBox.style.top = (my / 100) * maxh + 'px'
    }
  }
  return {
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
    x,
    y,
    mx,
    my,
  }
}

const Move = {
  // 绑定元素的父组件挂载时调用
  mounted(el: HTMLElementCopy, binding: DirectiveBinding) {
    const boundary = binding.modifiers?.boundary ?? false // 是否控制边界
    const dragBox = el //获取当前元素
    // 绑定元素设置
    dragBox.style.position = 'absolute'
    // 父元素设置
    const pdom = dragBox.parentNode as HTMLElement
    // 支持边界控制情况下
    boundary && (pdom.style.position = 'relative')
    dragBox.customOffsetLeft = el.offsetLeft
    dragBox.customOffsetHeight = el.offsetHeight

    const { callback, maxw, maxh, minw, minh, x, y } = paramsHandler(dragBox, binding)

    dragBox.onmousedown = (e) => {
      dragBox.style.transition = ''
      // 阻止默认事件，避免元素选中
      e.preventDefault()
      dragBox.style.cursor = 'move'
      //算出鼠标当前相对元素的位置
      const disX = e.x - dragBox.offsetLeft
      const disY = e.y - dragBox.offsetTop

      document.onmousemove = (e2) => {
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e2.clientX - disX
        let top = e2.clientY - disY
        // 相对于父元素的移动百分比
        let percentX = 0
        let percentY = 0
        // 当传入true代表控制边界
        if (boundary) {
          left = left > maxw ? maxw : left < minw ? minw : left
          top = top > maxh ? maxh : top < minh ? minh : top
          // 计算移动百分比
          percentX = Number(((left / maxw) * 100).toFixed(0))
          percentY = Number(((top / maxh) * 100).toFixed(0))
        }

        //移动当前元素
        x && (dragBox.style.left = left + 'px')
        y && (dragBox.style.top = top + 'px')

        callback({ left, top, percentX, percentY })
      }
      document.onmouseup = (updom) => {
        //鼠标弹起来的时候不再移动
        document.onmousemove = null
        document.onmouseup = null
        dragBox.style.cursor = 'default'
      }
    }
  },
  updated(el: HTMLElementCopy, binding: DirectiveBinding) {
    paramsHandler(el, binding)
  },
}

export default Move
