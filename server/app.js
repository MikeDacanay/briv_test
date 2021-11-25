const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const usersRouter = require('./routes/users');
const passport = require("passport");
const passportJWT = require('passport-jwt');


const app = express();
const JWTStrategy = passportJWT.Strategy;
app.use(passport.initialize());
app.options('*', cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client/build")));

app.use('/users', usersRouter);

module.exports = app;