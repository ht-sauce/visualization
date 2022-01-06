import { setConfig, Config } from './config'
import { parseNavigator } from './base/browser'

const Vientiane = {
  start(con: Config) {
    setConfig(con)
    parseNavigator()
  },
}

export default Vientiane
