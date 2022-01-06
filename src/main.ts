import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import DhtUi from '@/componentsBusiness/index' // 导入全局组件

import VConsole from 'vconsole'

const app = createApp(App)

DhtUi(app)

// h5调试工具
const vConsole = new VConsole({ maxLogNumber: 1000 })

app.use(router).mount('#app')
