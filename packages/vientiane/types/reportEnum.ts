// 上报大类

export enum Type {
  error = 'error',
  base = 'base',
  behavior = 'behavior',
  performance = 'performance',
}
// 大类对应的小类
export enum BaseSonType {
  userAgent = 'user-agent', // 用户基本信息
}

export enum ErrorSonType {
  consoleWarn = 'console-warn',
  consoleError = 'console-error',
  resource = 'resource',
  js = 'js',
  promise = 'promise',
}

export enum behavior {}

export enum performance {}
