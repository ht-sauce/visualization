// 深拷贝
export function deepCopy<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

type Callboack = <T>(arg?: T) => void

// 页面卸载前
export function onBeforeunload(callback: Callboack) {
  window.addEventListener('beforeunload', callback, true)
}

// 页面隐藏
export function onHidden(callback: Callboack, once: boolean) {
  const onHiddenOrPageHide = (event: Event) => {
    if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
      callback(event)
      if (once) {
        window.removeEventListener('visibilitychange', onHiddenOrPageHide, true)
        window.removeEventListener('pagehide', onHiddenOrPageHide, true)
      }
    }
  }

  window.addEventListener('visibilitychange', onHiddenOrPageHide, true)
  window.addEventListener('pagehide', onHiddenOrPageHide, true)
}
// 页面展示
export function onPageShow(callback: Callboack) {
  window.addEventListener(
    'pageshow',
    (event) => {
      if (event.persisted) {
        callback(event)
      }
    },
    true,
  )
}
// 页面加载
export function executeAfterLoad(callback: Callboack) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    const onLoad = () => {
      callback()
      window.removeEventListener('load', onLoad, true)
    }

    window.addEventListener('load', onLoad, true)
  }
}
