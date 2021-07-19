// 事件分享函数，用以实现事件的或者数据多处监听

// 回调函数
type Callback = <T>(args: T) => void
// 回调队列
type QueueItem = { eventName: string; callback: Callback }
// 回调事件队列
type CallQueue = QueueItem[]
// 私有验证
type _CheckQueue = { queue: CallQueue; length: number }

class EventShare {
  queue: CallQueue | null = []
  // 数据接收源
  dataSource<T>(args: T) {
    const { queue } = this._checkQueue() as _CheckQueue
    if (!queue) return null

    queue?.forEach((item) => {
      item.callback(args)
    })
  }
  // 监听其中一个事件
  monitor(eventName: string, callback: Callback) {
    const index = this._getIndex(eventName)
    if (index) {
      const msg = '队列中存在同名事件' + eventName
      console.warn(msg)
      return msg
    }

    this.queue?.push({ eventName, callback })
  }
  // 取消监听事件
  cancel(eventName: string) {
    const { queue } = this._checkQueue() as _CheckQueue
    if (!queue) return null

    const index = this._getIndex(eventName)
    if (index === null) return null

    queue.splice(index, 1)
  }
  // 取消所有监听
  clear() {
    this.queue = null
  }
  // 获取队列index
  private _getIndex(eventName: string): number | null {
    const queue = this.queue as CallQueue
    const length = queue.length

    let index = null
    if (length === 1) index = 0
    else {
      for (let i = 0; i < length; i++) {
        if (queue[i].eventName === eventName) {
          index = i
          break
        }
      }
    }

    return index
  }
  // 队列验证
  private _checkQueue() {
    const queue = this.queue
    const length = queue?.length
    if (!queue || !length || length < 1) return null
    return {
      queue,
      length,
    }
  }
}
export default EventShare
