import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
const helmet = require('helmet');
const hpp = require('hpp');

export function setEnvironment(app) {
    if(process.env.NODE_ENV !== 'production') {
        setDevEnv(app);
    }else{
        setProdEnv(app);
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development';
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
};

function setProdEnv(app) {
    console.log('production');
    app.use(helmet());
    app.use(hpp());
}