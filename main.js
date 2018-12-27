if ('serviceWorker' in navigator) { // 分辨浏览器是否支持
  window.addEventListener('load', () => { // onload 调用
    navigator.serviceWorker.register('/sw.js', {scope: '/'}) // 在 sw.js 注册 sw, 
      .then(registration => {
        console.log('service worker registration successful with scope: ', registration.scope)
      })
      .catch(err => {
        console.log('service worker registration failed: ', err)
      })
  })
}
// 关于 register 方法的 scope 参数，需要说明一下：
// Service Worker 线程将接收 scope 指定网域目录上所有事项的 fetch 事件，
// 如果我们的 Service Worker 的 javaScript 文件在 /a/b/sw.js，
// 不传 scope 值的情况下, scope 的值就是 /a/b。
// scope 的值的意义在于，如果 scope 的值为 /a/b，
// 那么 Service Worker 线程只能捕获到 path 为 /a/b 开头的( /a/b/page1, /a/b/page2，...)页面的 fetch 事件。
// 通过 scope 的意义我们也能看出 Service Worker 不是服务单个页面的，
// 所以在 Service Worker 的 js 逻辑中全局变量需要慎用。