interface Config {
  prefix?: string // 前缀
  url?: string // 路径
  data?: any // 传入的参数
  method?: string
  splicing?: boolean // 当get请求下是否拼接data数据
  timeout?: number
}
// 埋点上报文件
class Ajax {
  constructor() {
    console.log('请求接口sdk')
  }
  // get情况下需要拼接字符格式
  private splicing(data: any): string {
    let params = ''
    for (const key in data) {
      params += `${key}=${data[key]}&`
    }
    params = '?' + params.substring(0, params.length - 1)
    return params
  }
  // 传入参数预处理
  private config({
    prefix = '',
    url = '',
    data = {},
    method = 'get',
    splicing = true,
    timeout = 1000 * 60, // 默认等待1分钟
  }: Config): Config {
    method = method.toUpperCase() // 统一转换为大写
    url = prefix + url
    if (method === 'GET' && splicing) url = url + this.splicing(data)

    const config = {
      prefix,
      url,
      data,
      splicing,
      method,
      timeout,
    }

    return config
  }
  // image请求方式
  image(config: Config): void {
    const setting: Config = this.config(config)

    let image: HTMLImageElement | null
    image = new Image()
    image.src = setting.url as string

    image = null // 清空内存
  }
  // xhr请求方式
  request(config: Config): Promise<any> {
    const { url, method, timeout } = this.config(config)

    let xhr: XMLHttpRequest
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest()
    else if (window.ActiveXObject) xhr = new ActiveXObject('Microsoft.XMLHTTP')

    return new Promise<any>((resolve, reject) => {
      if (!xhr) reject(false)

      // 响应事件
      const onreadystatechange = () => {
        const readyState = xhr.readyState
        console.log(readyState)
      }

      xhr.onreadystatechange = onreadystatechange
      xhr.open(method as string, url as string, true)
      xhr.send(null)
      xhr.timeout = timeout as number

      resolve()
    })
  }
}

export default Ajax
