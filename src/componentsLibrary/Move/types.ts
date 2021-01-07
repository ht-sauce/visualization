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
export { HTMLElementCopy, VmoveCallData }
