export interface ComponentsItem {
  id: number // 组件编号
  name: string // 组件名称
}
export type CallData = {
  event: DragEvent | null // 当前触发事件
  modelValue: number // 绑定的数据类型
  endData: number // 自身携带的数据
  startDom: HTMLElement | null
  endDom: HTMLElement | null
}
