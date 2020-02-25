import express from 'express';
import history from 'connect-history-api-fallback';
import router from './routes/index';
import path from 'path';

import { setEnvironment } from './config/env';

import { configs } from './config/config';
import { sequelize } from './models';
import passport from 'passport';
import passportConfig from './passport/passport';

const app = express();
setEnvironment(app);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', router);
app.use(history());
app.use('/', function(req, res) {
    if(process.env.NODE_ENV === 'production') {
        return res.sendFile(path.join(__dirname, '../public', 'index.html'));
    }else {
        return res.send('Running server in development mode');
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
    app.listen(configs.port);
    console.log(`Server started on port ${configs.port}. This is ${process.env.NODE_ENV} mode`);
});
