'use strict';

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
const router = require('./route');
const passport = require('./passport');
const db = require('./mongo');
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'gwgwagwawhwa',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
    },
    store: new MongoStore({url: (process.env.MONGODB_URI || "mongodb://localhost:27017")})
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);
app.use(express.json());
app.use(history());
app.use(express.static(path.resolve(__dirname, 'client/dist')));
app.use(express.static(path.resolve(__dirname, 'client/dist/static/css')));
app.use(express.static(path.resolve(__dirname, 'client/dist/static/js')));
let port = process.env.PORT||3000;
let host = process.env.HOST||'0.0.0.0';
app.listen(port, host);
console.log('listen on port ' + port);
