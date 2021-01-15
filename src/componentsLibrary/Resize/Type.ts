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

interface Props {
  maxw: number
  maxh: number
  minw: number
  minh: number
  callback: <T>(args: T) => void
}

export { CallData, Callback, Direction, DataType, Props }
