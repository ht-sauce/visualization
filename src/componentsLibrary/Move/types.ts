interface HTMLElementCopy extends HTMLElement {
  isMove: boolean
}
// 回调函数返回值
interface VmoveCallData {
  left: number // 移动位置
  top: number
  percentX: number // 相对于父元素百分比
  percentY: number
  minX: number // 最小移动位置
  minY: number
  maxX: number // 最大移动位置
  maxY: number
  selfWidth: number // 元素本身宽高
  selfHeight: number
}

interface REparamsHandler {
  callstart: <T>(arg: T) => null
  callstop: <T>(arg: T) => null
  callback: <T>(arg: T) => null
  boundary: boolean
  pw: number
  ph: number
  sw: number
  sh: number
  maxw: number
  maxh: number
  minw: number
  minh: number
  isX: boolean
  isY: boolean
  mx: number
  my: number
  pwin: number
  disabled: boolean
}

export { HTMLElementCopy, VmoveCallData, REparamsHandler }
