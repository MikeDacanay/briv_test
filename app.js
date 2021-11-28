const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const passport = require("passport");
const passportJWTStrategy = require('./middleware/passportJWT');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = express();
app.options('*', cors());
app.use(passport.initialize());
passportJWTStrategy();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

module.exports = app;