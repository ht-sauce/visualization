#EventShare一个事件分发函数
当有全局监听需求的时候可以使用该类  

代码使用示例

    const eventShare = new EventShare()
    // 发送数据源
    setInterval(() => {
      eventShare.dataSource(1111)
    }, 1000)
    // 添加监听事件
    eventShare.monitor('one', (e) => {
      console.log(e)
    })
    eventShare.monitor('two', (e) => {
      console.log(e)
    })
    // 重名监听事件会提示报错
    eventShare.monitor('two', (e) => {
      console.log(e)
    })
    // 取消单个监听事件
    eventShare.cancel('one')
    // 取消所有监听事件
    eventShare.cancel()
