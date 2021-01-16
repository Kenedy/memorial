var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var uploadResult = require('./routes/uploadResult');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.post('/uploadResult', uploadResult);

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});


module.exports = app;
