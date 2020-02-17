const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('passport');
const passportConfig = require('./passport/passport');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');

// Create global app object
const app = express();

// express config defaults
if(process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
}else{
    app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const config = require('./config/config');
app.use(passport.initialize());
passportConfig();
const { sequelize } = require('./models');
const logger = require('./middlewares/logger');

app.use(require('./routes/index'));



/// error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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
    console.log(`Server started on port ${config.port}`);
});
