// 一个primose并发控制函数
/*示例
const one = () => {
      return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
          console.log(1)
          resolve(5)
        }, 1000 * 2)
      })
    }

    Concurrent({ pool: [one, one, one, one], max: 2 })
*/
type Fun = () => Promise<any>
interface Params {
  pool: Fun[] // 接收一组可以返回promise对象的函数
  max: number // 最大并发数量
  // 每一次并发成功返回结果，由于使用了promise.all所以请全部返回reslove
  success?: <T>(arg: T) => void
  error?: <T>(arg: T) => void // 并发失败返回结果
}

async function Concurrent(
  {
    pool = [],
    max = 1,
    success = () => {
      return null
    },
    error = () => {
      return null
    },
  } = {} as Params,
) {
  // 按max分割并发数组
  // 并发池
  let pools: Promise<any>[] = []
  const len = Math.ceil(pool.length / max)
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < max; j++) {
      const fun = pool.slice((i + 1) * max - max, (i + 1) * max)
      pools.push(fun[j]())
    }
    try {
      const suc = await Promise.all(pools)
      pools = []
      success(suc)
    } catch (e) {
      pools = []
      error(e)
    }
  }
}

export default Concurrent
