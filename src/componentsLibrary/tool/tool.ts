import { getCurrentInstance } from 'vue'

// 全局配置
export const globalConfig = () => {
  const vm: any = getCurrentInstance()
  if ('$DHT' in vm.proxy) {
    return vm.proxy.$DHT
  }
  return {}
}
