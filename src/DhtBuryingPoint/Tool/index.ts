import { geolocation } from '../Types'
import { v4 as uuidv4 } from 'uuid'

// 获取地理位置
export function getGeolocation(): Promise<geolocation> {
  return new Promise<geolocation>((resolve, reject) => {
    const nolg = { latitude: null, longitude: null }
    // 超时处理
    setTimeout(() => {
      reject(nolg)
    }, 1000 * 10)

    navigator.geolocation.getCurrentPosition(
      (suc) => {
        // console.log(e.coords)
        // latitude: 32.014719899999996
        // longitude: 118.7218446
        const { latitude, longitude } = suc.coords ?? {}
        resolve({ latitude, longitude })
      },
      (err) => {
        reject(nolg)
      },
    )
  })
}

export const getUuid = () => uuidv4()
