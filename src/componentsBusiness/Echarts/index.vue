<script lang="tsx">
import { ref, onMounted, onUnmounted, watch, SetupContext, PropType } from 'vue'
import echarts from 'echarts'
import { EChartsType, SetOptionOpts } from 'echarts/types/dist/echarts'

type Props = {
  option: SetOptionOpts
}

export default {
  // dom：echarts的dom数据，echarts：实例
  emits: ['dom', 'echarts'],
  props: {
    option: {
      type: Object as PropType<SetOptionOpts>,
      default: () => {
        return {}
      },
    },
  },
  setup(props: Props, ctx: SetupContext) {
    let myChart: EChartsType | null = null // echarts实例
    const echartsdom = ref<string | HTMLElement>('echartsdom')
    // 判断获取dom
    function getDom(ecref: typeof echartsdom) {
      let setint: number
      return new Promise((resolve, reject) => {
        clearInterval(setint)
        setint = setInterval(() => {
          const dom = ecref.value as HTMLElement
          if (dom && typeof ecref.value === 'object') {
            clearInterval(setint)
            ctx.emit('dom', dom)
            resolve(dom)
          }
        }, 20)
      })
    }

    async function renderEcharts() {
      const dom = await getDom(echartsdom)
      myChart = echarts.init(dom as HTMLElement)
      setOption()
      ctx.emit('echarts', myChart)
    }
    // 设置echarts参数值,自带默认参数
    function setOption(option = props.option) {
      myChart &&
        myChart.setOption({
          color: [
            '#5bc2e7',
            '#6980c5',
            '#70dfdf',
            '#f7f1ee',
            '#3390FF',
            '#4962FC',
            '#dd3ee5',
            '#12e78c',
            '#fe8104',
            '#01C2F9',
            '#FD9E06',
          ],
          ...option,
        })
    }

    // 根据屏幕宽度变化
    function resizeEcharts() {
      myChart && myChart.resize()
    }

    watch(
      () => props.option,
      (option) => {
        setOption(option)
      },
      {
        deep: true,
      },
    )

    onMounted(() => {
      renderEcharts()
      window.addEventListener('resize', resizeEcharts)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resizeEcharts)
      ;(myChart as EChartsType).clear()
      myChart = null
    })

    return () => <div class="gl-echarts" ref={echartsdom} />
  },
}
</script>

<style lang="scss">
.gl-echarts {
  width: 100%;
  height: 100%;
}
</style>
