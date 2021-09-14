# 爬虫

通过分析网页源代码，分析出来需要获取到的信息的头信息，然后模拟浏览器请求服务器的行为，将站点返回的HTML代码/JSON数据/二进制数据等等爬到本地。

# 一、什么是SSR

​	SSR  在VUE中将组件渲染成为HTML字符串直接发送到浏览器。简单理解为既是在服务器端先将HTML等组装完毕返回给浏览器。浏览器可以直接显示该页面，但是这样会带来一些不好的地方，首次加载过慢的问题。我个人想的解决办法有：可以使用浏览器自带的缓存，不用每次都重新渲染页面，提高访问速度。

# 二、为什么使用SSR

通过阅读文档：

1. 因为主流的搜索引擎只能对同步JavaScript进行很好的搜索。而我们传统的SPA  使用 Ajax获取内容，而Ajax又是一个异步的任务，如果需要SEO优化的话，对于网站是致命的。

2. 通过查阅资料，我了解了浏览器渲染过程，显示解析HTML绘制为DOM树，css会绘制成为CSSDOM，然后在和DOM生成Render Tree 渲染树，JS执行会阻塞DOM的创建，直到JS执行完毕。

   通过上述的了解学习，发现SSR还有另外一个好处，就是由于网络特别慢的情况下，就不用等待JS下载并执行完毕后在渲染页面了，这样可以使用户更快的看到完整的页面，增加用户体验。

缺点：

1. 只能在某些生命周期钩子函数中使用
2. 需要搭建Node.js serve 运行环境
3. 更多的服务器负载。因为需要在服务器端渲染DOM。

# 三、vue SSR的使用

## 1. 安装

```
npm install vue vue-server-renderer --save
```

- 推荐使用 Node.js 版本 6+。
- `vue-server-renderer` 和 `vue` 必须匹配版本。
- `vue-server-renderer` 依赖一些 Node.js 原生模块，因此只能在 Node.js 中使用。

## 2.渲染一个Vue实例

```
// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

// 第 3 步：将 Vue 实例渲染为 HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
})

// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
```

## 3. 服务器集成

在 Node.js 服务器中使用。

```bash
npm install express --save // 下载express框架
```



```
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
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
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080)
```



















