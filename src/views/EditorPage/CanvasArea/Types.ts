import { DragDataType } from '../Type'
export interface ComponentsItem {
  id: number // 组件编号
  name: string // 组件名称
}

interface bindData {
  type: DragDataType
  data: string
}
export type CallData = {
  event: DragEvent | null // 当前触发事件
  // 绑定的数据类型
  modelValue: bindData
  endData: bindData // 自身携带的数据
  startDom: HTMLElement | null
  endDom: HTMLElement | null
}
