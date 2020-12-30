import { ref } from 'vue'
interface Props {
  text: string
}

// ref不能放在组件内部，否则会重新赋值，导致不会响应式变化
const num = ref(1)
const dataone = ref('测试无defineComponent数据变化')

const addnum = () => {
  num.value++
}
const inpt = ref('')
const onInput = () => {
  console.log(inpt.value)
}

const NoDcom = (props: Props, ctx: any) => {
  //console.log(props, ctx)
  return (
    <div>
      <div>{dataone.value}</div>
      <button onClick={addnum}>点击测试数据变化</button>
      <div>变化的数字{num.value}</div>
      <input type="text" v-model={inpt.value} onChange={onInput} />
    </div>
  )
}
export default NoDcom
