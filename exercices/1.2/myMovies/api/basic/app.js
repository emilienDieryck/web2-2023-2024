var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');
const { ftruncateSync } = require('fs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const stats = {};

app.use((req, res, next) => {
    const pathmethode = `${req.method} ${req.path}`;
    const pathmethodeNbr = stats[pathmethode];
    if(pathmethodeNbr === undefined) {
        stats[pathmethode] = 0;
    }
    stats[pathmethode] += 1;
    console.log(pathmethode + ' : ' + stats[pathmethode]);
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);



module.exports = app;
