// 该版本对于非ie支持度较为友好，ie情况支持ie10以上
interface Headers {
  [key: string]: string
}
interface Config {
  prefix?: string // 前缀
  url?: string // 路径
  data?: object // 传入的参数
  method?: string
  splicing?: boolean // 当get请求下是否拼接data数据
  timeout?: number
  type?: string // 数据响应类型
  header?: Headers
}
class Ajax {
  // 私有变量部分
  private _xhr: XMLHttpRequest
  constructor() {
    this._xhr = {} as XMLHttpRequest
  }
  // 终止接口请求
  abort() {
    this._xhr && this._xhr.abort()
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
    splicing = true, // get参数默认需要参数拼接
    timeout = 1000 * 30, // 默认等待时间
    type = 'json',
    header = {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  }: Config) {
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
      type,
      header,
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
    const { url, method, timeout, header, type } = this.config(config)

    let xhr: XMLHttpRequest
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
      this._xhr = xhr
    }

    // 返回promise对象
    return new Promise((resolve, reject) => {
      if (!xhr) reject('版本不支持')
      // 请求成功回调函数
      // xhr.onload = e => {
      //   //console.log('load', e)
      //   resolve(e)
      // }
      // 请求结束
      xhr.onloadend = (e) => {
        const status = xhr.status
        let data
        if (xhr.responseType === 'text') {
          data = xhr.responseText
        } else if (xhr.responseType === 'document') {
          data = xhr.responseXML
        } else {
          data = xhr.response
        }
        resolve({ data, status, xhr: e })
      }
      // 请求出错
      xhr.onerror = (e) => {
        //console.error('error', e)
        reject(e)
      }
      // 请求超时
      xhr.ontimeout = (e) => {
        //console.error('timeout', e)
        reject(e)
      }
      // 当 request 被停止时触发
      // xhr.onabort = e => {
      //   reject(e)
      // }

      xhr.open(method as string, url as string, true)

      // 设置期望的返回数据类型
      xhr.responseType = type as XMLHttpRequestResponseType
      // 设置请求头
      for (const key of Object.keys(header)) {
        xhr.setRequestHeader(key, header[key])
      }

      xhr.send(config.data as Document)
      xhr.timeout = timeout as number
    })
  }
  // 新一代fetch方式，考虑之后不做逻辑封装，业务封装更直接
  fetch(config: Config) {
    const { url, method, timeout, header, data, type } = this.config(config)

    let setTimeInt: number
    return new Promise((resolve, reject) => {
      setTimeInt && clearTimeout(setTimeInt)
      setTimeInt = setTimeout(() => {
        reject(url + '：请求超时')
      }, timeout)

      const sendData = {
        method,
        headers: header,
        mode: 'cors',
        cache: 'default',
      } as RequestInit

      if (type === 'json') sendData.body = JSON.stringify(data)

      fetch(url as string, sendData)
        .then((e) => {
          clearTimeout(setTimeInt)
          resolve(e)
        })
        .catch((err) => {
          clearTimeout(setTimeInt)
          reject(err)
        })
    })
  }
  // _success() {}
  // _error() {}
}

export default Ajax
