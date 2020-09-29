class ExamplePlugin {
  apply(compiler) {
    // 指定一个挂载到 webpack 自身的事件钩子。
    compiler.plugin('webpacksEventHook', (compilation, callback) => {
      console.log('This is an example plugin!!!')

      // 功能完成后调用 webpack 提供的回调。
      callback()
    })
  }
}

export default ExamplePlugin
