'use strict';

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
const router = require('./route');
const passport = require('./passport');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'gwgwagwawhwa',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);
app.use(express.json());
app.use(history());
app.use(express.static(path.resolve(__dirname, 'client-beta/dist')));
app.use(express.static(path.resolve(__dirname, 'client-beta/dist/static/css')));
app.use(express.static(path.resolve(__dirname, 'client-beta/dist/static/js')));
let port = process.env.PORT||3000;
let host = process.env.HOST||'0.0.0.0';
app.listen(port, host);
console.log('listen on port ' + port);
