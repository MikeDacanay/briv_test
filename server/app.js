const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const usersRouter = require('./routes/users');

const passport = require("passport");
const passportJWT = require('passport-jwt');
const LocalStrategy = require("passport-local");
const JWTStrategy = passportJWT.Strategy;
const app = express();

app.options('*', cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "../client/build")));

// passport.use(new LocalStrategy(async(username, password, done) => {
//     const intake = await User.findOne({username}); //

//     if(intake) return done(null, intake);

//     return done(null, false);
// }));

app.use('/users', usersRouter);

module.exports = app;