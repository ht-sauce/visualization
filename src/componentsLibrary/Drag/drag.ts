import { SetupContext } from 'vue'

type Props = {
  draggable?: boolean
  modelValue?: any
}
type CallData = {
  event: DragEvent | null // 当前触发事件
  modelValue?: any // 绑定的数据类型
  startDom: HTMLElement | null
  endDom: HTMLElement | null
  endData: any
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
// 一个全局的数据
let DhtDragBindData: any = null

const Drag: DragType = {
  startDom: null, // 保证开始节点和结束节点不丢失，写成这样
  endDom: null,
  dragFun: function (props: Props, ctx: SetupContext) {
    function reemit(evname: string, e: DragEvent | null = null) {
      if (Drag.startDom === Drag.endDom) return null

      const redata: CallData = {
        event: e,
        startDom: Drag.startDom,
        endDom: Drag.endDom,
        modelValue: DhtDragBindData,
        endData: props.modelValue,
      }

      ctx.emit(evname, redata)
    }

    // 当用户开始拖拽一个元素或选中的文本时触发
    function ondragstart(e: DragEvent) {
      e.dataTransfer?.clearData()
      Drag.startDom = e.target as HTMLElement

      if (!props?.modelValue) return null
      DhtDragBindData = props.modelValue

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
