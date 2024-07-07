'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sequelize = require('./config/sequelize');
const limiter = require('./config/limiter');
const { swaggerUi, specs } = require('./config/swagger');

const indexRouter = require('./routes/index');
const materialRoutes = require('./routes/materialRoutes');

var app = express();

sequelize.sync({ force: false, alter: true }).then(() => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(limiter);
    app.use('/', indexRouter);
    app.use('/materials', materialRoutes);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

module.exports = app;
