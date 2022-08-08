<script lang="tsx">
import { defineComponent, getCurrentInstance, PropType, reactive } from 'vue'
import DhtMove from '../Move'
import { VmoveCallData } from '../Move/types'
import { DirectionEnum } from './Types'
import { ComponentInternalInstance } from 'vue'

interface CallData extends VmoveCallData {
  direction?: DirectionEnum
}
export default defineComponent({
  name: 'DhtFloatWin',
  directives: {
    DhtMove: DhtMove.directive,
  },
  emits: ['start', 'stop'],
  props: {
    disabled: Boolean, // 是否禁用
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    // 基于window进行移动
    pwin: {
      type: Boolean,
      default: false,
    },
    // 基于父元素移动
    boundary: {
      type: Boolean,
      default: true,
    },
    // 上下左右控制
    tblr: {
      type: Array as PropType<boolean[]>,
      default: () => [false, false, false, false],
    },
  },
  setup(props, ctx) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const Movedata = reactive({ x: props.x, y: props.y })

    function startmove() {
      ctx.emit('start')
    }

    function stopmove(callData: VmoveCallData) {
      const { percentX, percentY } = callData

      if (percentX === percentY) return null // 未发生移动则无任何操作

      let direction = DirectionEnum.left // 移动方向
      // x移动大于y，则左右移动
      if (percentX > percentY) direction = percentX > 50 ? DirectionEnum.right : DirectionEnum.left
      if (percentX < percentY) direction = percentY > 50 ? DirectionEnum.bottom : DirectionEnum.top

      const [top, bottom, left, right] = props.tblr
      // 方向控制只支持上下左右单个、上下模式、左右模式、全判断模式：全false
      if (top) direction = DirectionEnum.top
      if (bottom) direction = DirectionEnum.bottom
      if (left) direction = DirectionEnum.left
      if (right) direction = DirectionEnum.right
      if (top && bottom) direction = percentY > 50 ? DirectionEnum.bottom : DirectionEnum.top
      if (left && right) direction = percentX > 50 ? DirectionEnum.right : DirectionEnum.left

      // 最后判断，避免参数一样，导致默认变成left
      //if (percentX === percentY) direction = oldDirection

      autoMove(direction, callData)
    }

    function autoMove(direction: DirectionEnum, callData: CallData) {
      callData.direction = direction
      const { left, top, maxY, maxX, percentX, percentY } = callData
      const pwin = props.pwin
      const boundary = props.boundary
      let x = pwin ? left : boundary ? percentX : 0
      let y = pwin ? top : boundary ? percentY : 0

      switch (direction) {
        case DirectionEnum.top:
          y = 0
          break
        case DirectionEnum.bottom:
          y = pwin ? maxY : boundary ? 100 : 0
          break
        case DirectionEnum.left:
          x = 0
          break
        case DirectionEnum.right:
          x = pwin ? maxX : boundary ? 100 : 0
          break
      }

      Movedata.x = x
      Movedata.y = y
      proxy && proxy.$forceUpdate() // 和上一次参数一样会导致响应式依赖不会更新
      ctx.emit('stop', callData)
    }

    return () => (
      <div
        v-dht-move={{
          callmove: startmove,
          callstop: stopmove,
          pwin: props.pwin,
          boundary: props.boundary,
          x: Movedata.x,
          y: Movedata.y,
          disabled: props.disabled,
        }}
      >
        {ctx.slots.default && ctx.slots.default()}
      </div>
    )
  },
})
</script>
