enum Direction {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  topLeft = 'top-left',
  topRight = 'top-right',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
}

interface CallData {
  x: number
  y: number
  my: number
  mx: number
}
type Callback = (args: CallData) => void

interface DataType {
  width: string
  height: string
  direction: Direction
}

interface CallArgs {
  width: number
  height: number
  mx: number
  my: number
}

type PropsCallback = (args: CallArgs) => void
type PropsCallstop = () => void

interface Props {
  maxw: number
  maxh: number
  minw: number
  minh: number
  callback: PropsCallback
  callstop: PropsCallstop
}

export { CallData, Callback, Direction, DataType, Props, CallArgs, PropsCallback, PropsCallstop }
