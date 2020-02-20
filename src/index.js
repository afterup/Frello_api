import express from 'express';

import passport from 'passport';
import passportConfig from './passport/passport';

import config from './config/config'
import logger from './middlewares/logger';
import { sequelize } from './models';

import history from 'connect-history-api-fallback';
import router from './routes/index';
import path from 'path';

// Create global app object
const app = express();
import { setEnvironment } from './config/env';

setEnvironment(app);

app.use('/api', router);
app.use(history());
app.use('/', function(req,res){
    if(process.env.NODE_ENV !== 'production'){
        return res.send('Running server in development mode');
    }else {
        return res.sendFile(path.join(__dirname, '../public', 'index.html'));
    }
});

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
    app.listen(config.port);
    console.log(`Server started on port ${config.port}. This is ${process.env.NODE_ENV} mode`);
});
