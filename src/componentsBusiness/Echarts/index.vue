<script lang="tsx">
import { ref, onMounted, onUnmounted, watch } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const echarts = require('echarts')
export default {
  // dom：echarts的dom数据，echarts：实例
  emits: ['dom', 'echarts'],
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(props, ctx) {
    let myChart = null // echarts实例
    const echartsdom = ref('echartsdom')
    // 判断获取dom
    function getDom(ecref) {
      let setint = null
      return new Promise((resolve, reject) => {
        clearInterval(setint)
        setint = setInterval(() => {
          const dom = ecref.value
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
      myChart = echarts.init(dom)
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
      myChart.clear()
      myChart = null
    })

    return () => <div className="gl-echarts" ref={echartsdom} />
  },
}
</script>

<style lang="scss">
.gl-echarts {
  width: 100%;
  height: 100%;
}
</style>
