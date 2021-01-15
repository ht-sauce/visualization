import { reactive, SetupContext, ref } from 'vue'
import { CallData, Direction, Props } from './Type'

const Resize = (props: Props, ctx: SetupContext) => {
  const data = reactive({
    width: 'auto',
    height: 'auto',
  })

  let isMove = false // 是否在移动中
  const rootDom = ref<HTMLElement | string>('rootDom')
  let width = 0 // 元素初始大小
  let height = 0

  let direction = Direction.top

  const setDirection = (fx: Direction) => {
    if (isMove) return null
    direction = fx
    const rootDiv = rootDom.value as HTMLElement
    width = rootDiv.offsetWidth
    height = rootDiv.offsetHeight
  }

  // 移动回调
  function dcCallback(callData: CallData) {
    isMove = true
    const { x, y, mx, my } = callData

    let nx = 0
    let ny = 0

    // 四个方向移动值是基础方向，可以相互融合，生成另外四个方向
    const top = () => {
      ny = y - my
    }
    const bottom = () => {
      ny = my - y
    }
    const left = () => {
      nx = x - mx
    }
    const right = () => {
      nx = mx - x
    }

    switch (direction) {
      case Direction.top:
        top()
        break
      case Direction.bottom:
        bottom()
        break
      case Direction.left:
        left()
        break
      case Direction.right:
        right()
        break
      case Direction.topLeft:
        top()
        left()
        break
      case Direction.topRight:
        top()
        right()
        break
      case Direction.bottomLeft:
        bottom()
        left()
        break
      case Direction.bottomRight:
        bottom()
        right()
        break
    }

    // 最终处理移动产生宽高变化
    let finh = height + ny
    let finw = width + nx

    if (props.maxh) finh = finh > props.maxh ? props.maxh : finh
    if (props.maxw) finw = finw > props.maxw ? props.maxw : finw
    if (props.minh) finh = finh < props.minh ? props.minh : finh
    if (props.minw) finw = finw < props.minw ? props.minw : finw

    data.height = (finh < 0 ? 0 : finh) + 'px'
    data.width = (finw < 0 ? 0 : finw) + 'px'

    props.callback({ width: finw, height: finh, mx: nx, my: ny })
  }
  // 移动结束
  function onStop() {
    isMove = false
    props.callstop()
  }

  return {
    data,
    rootDom,
    dcCallback,
    setDirection,
    onStop,
  }
}
export default Resize
