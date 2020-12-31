import { SetupContext } from '@vue/runtime-core'

type Props = {
  draggable?: boolean
  modelValue?: any
}
type CallData = {
  event: DragEvent | null // 当前触发事件
  modelValue: any
  startDom: HTMLElement | null
  endDom: HTMLElement | null
}
type DragType = {
  startDom: HTMLElement | null
  endDom: HTMLElement | null
  dragFun: (
    props: Props,
    ctx: SetupContext,
  ) => {
    ondrop: (e: DragEvent) => void
    ondrag: (e: DragEvent) => void
    ondragend: () => void
    ondragenter: (e: DragEvent) => void
    ondragexit: (e: DragEvent) => void
    ondragleave: (e: DragEvent) => void
    ondragover: (e: DragEvent) => void
    ondragstart: (e: DragEvent) => void
  }
}

const Drag: DragType = {
  startDom: null, // 保证开始节点和结束节点不丢失，写成这样
  endDom: null,
  dragFun: function (props: Props, ctx: SetupContext) {
    function reemit(evname: string, e: DragEvent | null = null) {
      const redata: CallData = {
        event: e,
        modelValue: props.modelValue,
        startDom: Drag.startDom,
        endDom: Drag.endDom,
      }
      ctx.emit(evname, redata)
    }

    // 当用户开始拖拽一个元素或选中的文本时触发
    function ondragstart(e: DragEvent) {
      Drag.startDom = e.target as HTMLElement
      reemit('dragstart', e)
    }

    //当元素或选中的文本在可释放目标上被释放时触发
    function ondrop(e: DragEvent) {
      e.preventDefault()
      Drag.endDom = e.target as HTMLElement
      reemit('drop', e)
    }

    // 当元素或选中的文本在可释放目标上被释放时触发
    function ondrag(e: DragEvent) {
      e.preventDefault() // 这是必须的
      reemit('drag', e)
    }

    // 当拖拽元素或选中的文本到一个可释放目标时触发
    function ondragenter(e: DragEvent) {
      reemit('dragenter', e)
    }
    // 当拖拽元素或选中的文本离开一个可释放目标时触发。
    function ondragleave(e: DragEvent) {
      reemit('dragleave', e)
    }

    // 当元素或选中的文本被拖到一个可释放目标上时触发（每100毫秒触发一次）。
    function ondragover(e: DragEvent) {
      e.preventDefault() // 这是必须的，否则后续事件不会触发
      reemit('dragover', e)
    }

    // 当元素变得不再是拖拽操作的选中目标时触发
    function ondragexit(e: DragEvent) {
      reemit('dragexit', e)
    }

    // 当拖拽操作结束时触发
    function ondragend() {
      reemit('dragend')
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
  },
}

export default Drag.dragFun
