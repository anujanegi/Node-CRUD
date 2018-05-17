var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var employees = require('./routes/employees');

var app = express();
var mysql = require("mysql");
var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//app.use(express.static(path.join(__dirname + '/public')));

// database connection
app.use(function (req, res, next) {
  res.locals.connection = mysql.createConnection({
    host : 'localhost',
    user : 'username',
    password : 'password',
    database : 'database name'
  });
  res.locals.connection.connect();
  next();
});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// API endpoints
app.use('/employees', employees);
app.use('/employees/:id', employees);

module.exports = app;
