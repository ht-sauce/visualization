declare interface Event {
  dataTransfer: {
    setData(...args): void
    getData(...args)
  }
}
