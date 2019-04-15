const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

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
