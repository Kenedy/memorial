var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var uploadResult = require('./routes/uploadResult');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.post('/uploadResult', uploadResult);

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});

module.exports = app;
