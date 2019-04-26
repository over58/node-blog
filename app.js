const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package')

var app = express();

//session中间件
app.use(
  session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true, //强制更新session
    saveUninitialized: false, //设置位false,强制创建一个 session 即使用户未登录
    cookie: {
      maxAge: config.session.maxAge
    },
    store: new MongoStore({
      url: config.mongodb
    })
  })
);

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}))


routes(app)
app.use(function (err, req, res, next) {
  console.error(err)
  res.redirect('/')
})

if (module.parent) {
  // 被 require，则导出 app
  module.exports = app
} else {
  // 监听端口，启动程序
  app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`)
  })
}

