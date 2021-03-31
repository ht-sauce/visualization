import { DirectiveBinding } from 'vue'
import CopyFun from './Copy'
interface CusDom extends HTMLElement {
  $value: string
  handler: () => void
}
const Copy = {
  // 绑定元素的父组件挂载时调用
  mounted(el: CusDom, { value }: DirectiveBinding) {
    el.$value = value
    el.handler = () => {
      CopyFun(el.$value)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  update(el: CusDom, { value }: DirectiveBinding) {
    el.$value = value
  },
  beforeUnmount(el: CusDom) {
    el.removeEventListener('click', el.handler)
  },
}

export default Copy
