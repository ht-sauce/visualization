import { defineComponent, ref, reactive } from 'vue'
import { VNode, FunctionalComponent } from '@vue/runtime-core'

const TestA = defineComponent({
  setup(props, ctx) {
    return () => <div>{ctx.slots.default && ctx.slots.default('作用域传参')}</div>
  },
})

const TestD = defineComponent({
  setup(props, ctx) {
    return () => (
      <div>
        <span>组件：TestD</span>
        <TestA
          v-slots={{
            default: (n: string) => <span>{n}</span>,
          }}
        />
      </div>
    )
  },
})

const Testref = defineComponent({
  setup(props, ctx) {
    const dateone = ref('测试')
    const datetwo = reactive({
      test: '测试',
    })
    return () => (
      <div>
        <div>{dateone}</div>
        <div>{datetwo.test}</div>
      </div>
    )
  },
})

const iffor = defineComponent({
  setup(props, ctx) {
    const ces = true
    const ifelse = () => {
      if (ces) return <div>if部分</div>
      else return <div>else部分</div>
    }

    const forarr = () => {
      let i = 0
      return new Array(10).fill('').map(() => {
        i++
        return <span>{i}</span>
      })
    }

    return () => (
      <div>
        {ifelse()}
        {forarr()}
      </div>
    )
  },
})

const testslot = defineComponent({
  setup(props, ctx) {
    return () => (
      <div>
        {/*默认插槽*/}
        <div>{ctx.slots.default && ctx.slots.default()}</div>
        {/*具名插槽*/}
        <div>{ctx.slots.name && ctx.slots.name()}</div>
      </div>
    )
  },
})

export const TestCom = defineComponent({
  setup(props, ctx) {
    return () => <TestD />
  },
})
