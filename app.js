const Vue = require('vue')
// 创建网站服务器
const server = require('express')()
// 创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

server.get('/', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <meta charset="UTF-8" />
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(3000)
console.log('启动成功')