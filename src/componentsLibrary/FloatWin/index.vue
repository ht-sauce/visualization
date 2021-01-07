<script lang="tsx">
import { defineComponent, PropType, reactive } from 'vue'
import DhtMove from '../Move'
import { VmoveCallData } from '../Move/types'
import { DirectionEnum } from './Types'
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
    const Movedata = reactive({ x: props.x, y: props.y })

    function startmove() {
      ctx.emit('start')
    }
    function stopmove(callData: VmoveCallData) {
      const { percentX, percentY } = callData
      let direction: DirectionEnum // 移动方向
      // x移动大于y，则左右移动
      if (percentX > percentY) direction = percentX > 50 ? DirectionEnum.right : DirectionEnum.left
      else direction = percentY > 50 ? DirectionEnum.bottom : DirectionEnum.top

      const [top, bottom, left, right] = props.tblr
      // 方向控制只支持上下左右单个、上下模式、左右模式、全判断模式：全false
      if (top) direction = DirectionEnum.top
      if (bottom) direction = DirectionEnum.bottom
      if (left) direction = DirectionEnum.left
      if (right) direction = DirectionEnum.right
      if (top && bottom) direction = percentY > 50 ? DirectionEnum.bottom : DirectionEnum.top
      if (left && right) direction = percentX > 50 ? DirectionEnum.right : DirectionEnum.left

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
        }}
      >
        {ctx.slots.default && ctx.slots.default()}
      </div>
    )
  },
})
</script>
