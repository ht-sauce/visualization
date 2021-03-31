export default function (text: string | number) {
  if (!text) {
    // 值为空的时候，给出提示。可根据项目UI仔细设计
    console.log('无复制内容')
    return
  }
  // 动态创建 textarea 标签
  const textarea = document.createElement('textarea')
  // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
  textarea.readOnly = true
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  // 将要 copy 的值赋给 textarea 标签的 value 属性
  textarea.value = text.toString()
  // 将 textarea 插入到 body 中
  document.body.appendChild(textarea)
  // 选中值并复制
  textarea.select()
  const result = document.execCommand('Copy')
  if (result) {
    console.log('复制成功') // 可根据项目UI仔细设计
  }
  document.body.removeChild(textarea)
}
