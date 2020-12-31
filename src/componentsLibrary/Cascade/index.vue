<template>
  <dht-popper trigger="manual" :options="popperOptions" v-model="popperShow" @hide="popperHide">
    <div
      :class="{ 'dht-cascade-check': popperShow }"
      class="dht-cascade"
      @click="popperShow = !popperShow"
    >
      展示的数据
    </div>
    <template #tooltip>
      <div class="dht-cascade-tooltip"></div>
    </template>
  </dht-popper>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { DhtPopper } from '../Popper'
import type { ModifierArguments, Options, State } from '@popperjs/core'
export default defineComponent({
  name: 'DhtCascade',
  components: { DhtPopper },
  emits: [],
  props: {
    modelValue: Array,
    trigger: {
      type: String,
      default: 'hover', // hover,click
    },
  },
  setup(props, ctx) {
    const data = reactive({
      popperShow: false,
      popperOptions: {
        modifiers: [
          {
            name: 'arrow',
            phase: 'main',
            options: {},
            data: {
              x: 10,
            },
            fn: ({ state }: ModifierArguments<Options>) => {
              const { modifiersData, elements } = state as State
              const { reference, arrow } = elements
              const referencecopy = reference as HTMLElement
              console.log(modifiersData)
              // const x = modifiersData.arrow.x ? modifiersData.arrow.x : 0
              //
              // modifiersData.arrow.x =
              //   x - (referencecopy.clientWidth - (arrow as HTMLElement).clientWidth) / 2 + 20
            },
          },
        ],
      },
    })
    function popperHide() {
      console.log(data.popperShow)
    }

    return {
      ...toRefs(data),
      popperHide,
    }
  },
})
</script>
