import { getCurrentInstance, withScopeId } from 'vue'
import { ComponentInternalInstance } from '@vue/runtime-core'

// jsx使用scopedid
export function withScoped() {
  // 必须在setup内执行
  const instance = getCurrentInstance() as any
  const scopeId = instance.type.__scopeId
  return withScopeId(scopeId)
}
