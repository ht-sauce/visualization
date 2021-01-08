import { getCurrentInstance } from 'vue'
import { InstallOptions } from '../types/index'
// 全局配置
export const globalConfig = (): InstallOptions => {
  const vm: any = getCurrentInstance()
  if ('$DHT' in vm.proxy) {
    return vm.proxy.$DHT
  }
  return {} as InstallOptions
}

// 判断是否手机端
export const IsPhone = () => {
  return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
}
