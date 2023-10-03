const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const filmsRouter = require('./routes/films');

const app = express();

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
    console.log(`${pathmethode  } : ${  stats[pathmethode]}`);
    next();
});

app.use('/films', filmsRouter);



module.exports = app;
