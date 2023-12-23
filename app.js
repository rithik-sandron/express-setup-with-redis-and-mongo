var fs = require('fs');
var createError = require('http-errors');
var escapeHtml = require('escape-html');
// var { redisConnect } = require('./db/redis')
var { mongoConnect } = require('./db/mongo')
var express = require('express');
var marked = require('marked');
var cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var { log, requestTime } = require('./routes/middleware')

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup : markdown
app.engine('md', function (path, options, fn) {
  fs.readFile(path, 'utf8', function (err, str) {
    if (err) return fn(err);
    var html = marked.parse(str).replace(/\{([^}]+)\}/g, function (_, name) {
      return escapeHtml(options[name] || '');
    });
    fn(null, html);
  });
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'md');

// middlewares and routes
app.use(requestTime)
app.use(log)
app.use('/', indexRouter);

// redisConnect();
mongoConnect();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;