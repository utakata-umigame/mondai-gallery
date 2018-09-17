'use strict';

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
const router = require('./route');
const passport = require('./passport');
const signup = require('./signup');
const login = require('./login');
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(history());
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
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'client/dist')));
app.use(express.static(path.resolve(__dirname, 'client/dist/static/css')));
app.use(express.static(path.resolve(__dirname, 'client/dist/static/js')));
app.use('/api', router);
app.use('/signup', signup);
app.use('/login', login);
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});
/*app.get('/', (req, res) => {
  res.sendFile(path.resolve(path.resolve(__dirname, "client/dist/index.html")));
});
app.get('/add', isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(path.resolve(__dirname, "client/dist/index.html")));
});
app.get('/myList/show/:id', (req, res) => {
  res.sendFile(path.resolve(path.resolve(__dirname, "client/dist/index.html")));
});*/
let port = process.env.PORT||8000;
let host = process.env.HOST||'0.0.0.0';
app.listen(port, host);
console.log('listen on port ' + port);

function isAuthenticated(req, res, next) {
  // 認証チェック
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}