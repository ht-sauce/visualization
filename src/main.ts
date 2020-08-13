import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 解决ts下全局变量定义问题
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    http: number
  }
}

const app = createApp(App)

app.config.globalProperties.http = '11111'

app.provide('useStore', store)
app
  .use(store)
  .use(router)
  .mount('#app')
