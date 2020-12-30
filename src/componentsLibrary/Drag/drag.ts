import { ref } from 'vue'
import { SetupContext } from '@vue/runtime-core'

type Props = {
  draggable?: boolean
  modelValue?: any
}
type CallData = {
  event: DragEvent
  modelValue: any
  startDom: HTMLElement
  endDom: HTMLElement
}

export default function (props: Props, ctx: SetupContext) {
  let startDom: HTMLElement, endDom: HTMLElement
  // 当元素或选中的文本在可释放目标上被释放时触发
  function ondrag(e: DragEvent) {
    e.preventDefault()
  }

  // 当元素或选中的文本在可释放目标上被释放时触发
  function ondrop(e: DragEvent) {
    e.preventDefault()
    endDom = e.target as HTMLElement

    const redata: CallData = {
      event: e,
      modelValue: props.modelValue,
      startDom,
      endDom,
    }
    ctx.emit('drag', redata)
  }

  // 当拖拽元素或选中的文本到一个可释放目标时触发
  function ondragenter(e: DragEvent) {
    endDom = e.target as HTMLElement
    ctx.emit('dragenter', e)
  }
  // 当拖拽元素或选中的文本离开一个可释放目标时触发。
  function ondragleave(e: DragEvent) {
    ctx.emit('dragleave', e)
  }

  // 当元素或选中的文本被拖到一个可释放目标上时触发（每100毫秒触发一次）。
  function ondragover(e: DragEvent) {
    e.preventDefault()
    ctx.emit('dragover', e)
  }

  // 当用户开始拖拽一个元素或选中的文本时触发
  function ondragstart(e: DragEvent) {
    // console.log('ondragstart', e)
    startDom = e.target as HTMLElement
    ctx.emit('dragstart', e)
  }

  // 当元素变得不再是拖拽操作的选中目标时触发
  function ondragexit(e: DragEvent) {
    ctx.emit('dragexit', e)
  }

  // 当拖拽操作结束时触发
  function ondragend() {
    ctx.emit('dragend')
  }

  return {
    ondrop,
    ondrag,
    ondragend,
    ondragenter,
    ondragexit,
    ondragleave,
    ondragover,
    ondragstart,
  }
}
