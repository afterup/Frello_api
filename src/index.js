import express from 'express';
import logger from './middlewares/logger';

import history from 'connect-history-api-fallback';
import router from './routes/index';
import path from 'path';

import { setEnvironment } from './config/env';

const app = express();
setEnvironment(app);
const { configs } = require('./config/config');
const { sequelize } = require('./models');
const passport = require('passport');
const passportConfig = require('./passport/passport');

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', router);
app.use(history());
app.use('/', function(req, res) {
    if(process.env.NODE_ENV === 'production') {
        return res.sendFile(path.join(__dirname, '../public', 'index.html'));
    }else {
        return res.render('index.html');
        // return res.send('Running server in development mode');
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passportConfig();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {}
        }
    });
});

sequelize.sync().then(() => {
    app.listen(configs.port);
    console.log(`Server started on port ${configs.port}. This is ${process.env.NODE_ENV} mode`);
});
