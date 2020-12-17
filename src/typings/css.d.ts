// 对css模块不对类型校验
declare module '*.css' {
  const style: any
  export default style
}
declare module '*.scss' {
  const style: any
  export default style
}
