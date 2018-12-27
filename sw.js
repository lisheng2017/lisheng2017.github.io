// 由于 localStorage 是同步的用法，不允许在 Service Worker 中使用，这里可以使用 Service Worker cache。

// // install 事件监听
// this.addEventListener('install', event => {
//   // ExtendableEvent.waitUntil() 方法，确保 Service Worker 不会在 waitUntil() 里面的代码执行完毕之前安装完成。
//   event.waitUntil(
//     // caches.open() 创建缓存，参数是缓存名；addAll() 这个方法的参数是一个由一组相对于 origin 的 URL 组成的数组，这些 URL 就是你想缓存的资源的列表。
//     caches.open('test-cache-v1').then(cache => cache.addAll([
//       '/',
//       '/index.html',
//       '/main.js'
//     ]))
//   )
// })

// fetch 事件
this.addEventListener('fetch', event => {
  event.respondWith( // 拦截 HTTP 相应
    caches.match(event.request).then(response => {
      // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
      if (response) return response
      // 否则请求服务端
      const request = event.request.clone() // 拷贝原始请求
      return fetch(request).then(httpRes => {
        // 请求失败，直接返回结果
        if (!httpRes || httpRes.status !== 200) return httpRes
        // 请求成功，缓存请求
        const responseClone = httpRes.clone()
        caches.open('test-cache-v1').then(cache => {
          cache.put(event.request, responseClone) // 下次相同请求就不需要到服务端要结果了
        })
      })
    })
  )
})
