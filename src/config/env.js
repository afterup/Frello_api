import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import path from 'path';
require('dotenv').config();

export function setEnvironment(app) {
    if(process.env.NODE_ENV === 'development') {
        setDevEnv(app);
    }else{
        setProdEnv(app);
    }
}

/**
 * Used to set development environment variables
 * @param {Express App} app 
 */
function setDevEnv(app) {
    console.log('development');
    process.env.NODE_ENV = 'development';
    require('dotenv').config({ path: path.join(__dirname, '../../.env.dev') });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(cors());
};

/**
 * Used to set development environment variables
 * @param {Express App} app 
 */
function setProdEnv(app) {
    console.log('production');
    process.env.NODE_ENV = 'production';
    require('dotenv').config({ path: path.join(__dirname, '../../.env.prod') });
    app.use(bodyParser.json());
    app.use(cors());
}