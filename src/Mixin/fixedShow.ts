// 一般用于h5页面，监听页面变化，确认是否需要隐藏元素
import { ref, onBeforeUnmount, onDeactivated, watch, reactive } from 'vue'

export default function () {
  const fiexdShow = ref(true) // 显示或者隐藏

  onBeforeUnmount(() => {
    window.removeEventListener('resize', heightscroll)
  })
  onDeactivated(() => {
    window.removeEventListener('resize', heightscroll)
  })

  const h2 = reactive({
    docmHeight: document.documentElement.clientHeight, //默认屏幕高度
    showHeight: document.documentElement.clientHeight, //实时屏幕高度
  })

  window.addEventListener('resize', heightscroll)

  function heightscroll() {
    h2.showHeight = document.documentElement.clientHeight
  }

  watch(
    () => h2.showHeight,
    () => {
      if (h2.docmHeight > h2.showHeight) {
        fiexdShow.value = false
      } else {
        fiexdShow.value = true
      }
    },
  )

  return {
    fiexdShow,
  }
}
