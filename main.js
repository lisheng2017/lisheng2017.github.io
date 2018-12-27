if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', {scope: '/'})
      .then(registration => {
        console.log('service worker registration successful with scope: ', registration.scope)
      })
      .catch(err => {
        console.log('service worker registration failed: ', err)
      })
  })
}