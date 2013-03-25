var fs = require('fs');
var http = require('http');
var connect = require('connect');
var urlrouter = require('urlrouter');
var render = require('connect-render');
var forward = require('forward');

var config = require('./config');
var routes = require('./routes');

var app = connect();
// 记录access log
connect.logger.format('home', ':remote-addr :response-time - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :res[content-length]');
app.use(connect.logger({
  format: 'home',
  stream: fs.createWriteStream(__dirname + '/logs/access.log')
}));

// 解析query
app.use(connect.query());

// 模版
app.use(render({
  root: __dirname + '/views',
  layout: 'layout',
  viewExt: '.html',
  cache: !config.debug,
  helpers: {}
}));
// favicon
app.use('/favicon.ico', forward(__dirname + '/assets/favicon.ico'));

// 解析静态文件
app.use('/assets', connect.static(__dirname + '/assets', { maxAge: 3600000 * 24 * 365 }));

// 路由
app.use(urlrouter(routes));

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
  err.url = err.url || req.url;
  console.log(err.stack);
  res.statusCode = err.status || 500;
  res.render('500', {
    viewname: 'error',
    viewClassName: 'error_500'
  });
});

/**
 * Page not found handler
 */
app.use(function (req, res, next) {
  res.statusCode = 404;
  res.render('404', {
    viewname: 'error',
    viewClassName: 'error_404',
    title: '迷路了?'
  });
});

process.on('uncaughtException', function (err) {
  if (err.domain_thrown) {
    return;
  }
  // 测试情况下，断言异常不要抛出
  if (process.env.NODE_ENV === 'test' && err.name === 'AssertionError') {
    return;
  }
  throw err;
});

// 调用pm分发多进程
var worker = require('pm').createWorker();
var server = http.createServer(app);
worker.ready(function (socket) {
  server.emit('connection', socket);
});

module.exports = server;
