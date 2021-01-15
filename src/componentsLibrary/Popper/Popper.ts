import { onMounted, onUnmounted, reactive, ref, SetupContext, watch } from 'vue'
import { createPopper, Instance, Options } from '@popperjs/core'
import { dataType, visibility, Props } from './types'
import { globalConfig } from '../tool/tool'

const Popper = (props: Props, ctx: SetupContext) => {
  let popperInstance: Instance | null = null
  // 全局z-index
  const config = globalConfig()
  const zIndex = props.zIndex ?? config.zIndex

  const data = reactive({
    show: 'hidden',
  } as dataType)

  // 被绑定的
  const popper = ref<string | HTMLElement>('popper')
  // 会移动的，这是提示内容
  const tooltip = ref<string | HTMLElement>('tooltip')

  // 合并参数
  function mergeOptions() {
    const opt = {
      placement: props.placement,
      ...(props?.options ? props.options : {}),
    } as Options
    const modifiers = []

    modifiers.push({
      name: 'offset',
      options: {
        offset: [0, props.offset],
      },
    })

    const optModifiers = opt.modifiers ? opt.modifiers : []

    opt.modifiers = [...optModifiers, ...modifiers]
    //console.log(opt)
    return opt
  }

  onMounted(() => {
    if (props.disabled) return false

    const popperDom = popper.value as HTMLElement
    const tooltipDom = tooltip.value as HTMLElement

    popperInstance = createPopper(popperDom, tooltipDom, mergeOptions())
  })

  onUnmounted(() => {
    ;(popperInstance as Instance)?.destroy()
    popperInstance = null
  })

  // 关闭
  function hide() {
    data.show = visibility.hidden
    ctx.emit('update:modelValue', false)
    ctx.emit('hide')
  }
  // 展示
  function show() {
    data.show = visibility.visible
    ctx.emit('update:modelValue', true)
    ctx.emit('show')
  }

  // 点击事件
  function onClick() {
    if (props.trigger !== 'click') return null
    if (data.show === 'hidden') show()
    else hide()
  }

  function onMouseover() {
    if (props.trigger !== 'hover') return null
    show()
  }

  function onMouseout() {
    if (props.trigger !== 'hover') return null
    hide()
  }

  watch(
    () => props.modelValue,
    (e) => {
      if (props.trigger !== 'manual') return null

      if (e) show()
      else hide()
    },
    {
      immediate: true,
    },
  )

  function clickOutside() {
    if (props.trigger === 'hover') return
    if (data.show === 'hidden') return
    if (props.clickOutside) hide()
  }

  return { clickOutside, popper, onClick, onMouseover, onMouseout, data, tooltip, zIndex }
}

export default Popper
