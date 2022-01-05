// 深拷贝
export function deepCopy<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

// 获取页面url
export function getPageURL() {
  return window.location.href
}
