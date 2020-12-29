import { defineComponent } from 'vue'

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

export const TestCom = defineComponent({
  setup(props, ctx) {
    return () => <TestD />
  },
})
