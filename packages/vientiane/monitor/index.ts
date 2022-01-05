// window监控
export default function monitor() {
  const eventList = ['']
  eventList.forEach((eventName) => {
    window.addEventListener(eventName, function (e) {})
  })
}
