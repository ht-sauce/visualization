import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import DhtUi from '@/componentsBusiness/index' // 导入全局组件

const app = createApp(App)

DhtUi(app)

app.use(router).mount('#app')
