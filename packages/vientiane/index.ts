import { setConfig, Config, generateStorageUid } from './config'
import base from './base'
import behavior from './behavior'
import performance from './performance'
import error from './error'
import { report } from './utils/report'

const Vientiane = {
  // 控制大事件是否启用
  enable: {
    base: {
      enable: true,
    },
    error: {
      enable: true,
    },
    behavior: {
      enable: true,
    },
    performance: {
      enable: true,
    },
  },
  report,
  // 必要的时候重新设置配置信息
  restConfig(con: Config) {
    setConfig(con)
  },
  start(con: Config) {
    this.restConfig(con)
    generateStorageUid() // 唯一标识生成需要在基本设置完成之后

    const {
      base: baseC,
      error: errorC,
      behavior: behaviorC,
      performance: performanceC,
    } = this.enable
    baseC && base() // 最基本信息
    errorC && error() // js错误监控
    behaviorC && behavior() // 行为收集
    performanceC && performance() // 性能监测
  },
}

export default Vientiane
