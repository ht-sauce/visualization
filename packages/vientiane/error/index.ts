import { lazyReportCache } from '../utils/report'
import { onPageShow } from '../utils/utils'
import { Type, ErrorSonType } from '../types/reportEnum'

export default function error() {
  const oldConsoleError = window.console.error
  const oldConsoleWarn = window.console.warn

  window.console.error = (...args) => {
    oldConsoleError.apply(window.console, args)
    lazyReportCache({
      appType: Type.error,
      SonType: ErrorSonType.consoleError,
      errData: args,
    })
  }

  window.console.warn = (...args) => {
    oldConsoleWarn.apply(window.console, args)
    lazyReportCache({
      appType: Type.error,
      SonType: ErrorSonType.consoleWarn,
      errData: args,
    })
  }

  // 监听 js 错误
  window.onerror = (msg, url, line, column, error) => {
    lazyReportCache({
      appType: Type.error,
      SonType: ErrorSonType.js,
      msg,
      line,
      column,
      error: error?.stack, // 错误对象
    })
  }

  // 监听 promise 错误 缺点是获取不到列数据
  window.addEventListener('unhandledrejection', (e) => {
    lazyReportCache({
      appType: Type.error,
      SonType: ErrorSonType.promise,
      reason: e.reason,
    })
  })

  onPageShow(() => {
    error()
  })
}
