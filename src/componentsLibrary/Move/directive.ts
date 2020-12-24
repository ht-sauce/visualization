import { DirectiveBinding } from 'vue'

const Move = {
  // 绑定元素的父组件挂载时调用
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const dragBox = el //获取当前元素
    const boundary = binding.modifiers?.boundary ?? false // 是否控制边界
    const callback =
      binding.value ??
      ((arg: any) => {
        return null
      })
    const x = el.getAttribute('dht-move-x') !== 'false'
    const y = el.getAttribute('dht-move-y') !== 'false'

    dragBox.style.position = 'absolute'
    const pdom = dragBox.parentNode as HTMLElement
    boundary && (pdom.style.position = 'relative')
    // 父元素宽高
    const pw = pdom.offsetWidth
    const ph = pdom.offsetHeight
    // 本身宽高
    const sw = dragBox.offsetWidth
    const sh = dragBox.offsetHeight * 2 // 在控制父边界情况下避免元素超出范围
    // 计算得到最大移动距离
    const maxw = pw - sw + dragBox.offsetLeft
    const maxh = ph - sh + dragBox.offsetHeight
    const minw = 0
    const minh = 0

    dragBox.onmousedown = (e) => {
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
          percentX = Number(((left / maxw) * 100).toFixed(2))
          percentY = Number(((top / maxh) * 100).toFixed(2))
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
}

export default Move
