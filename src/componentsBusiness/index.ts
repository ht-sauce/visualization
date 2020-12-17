import { App } from 'vue'
import DhtUi from '@/componentsLibrary/index'
import '@/componentsLibrary/style.scss'

const install = (app: App): void => {
  app.use(DhtUi)
}

export default install
