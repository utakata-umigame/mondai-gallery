'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./route');
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', router);
let port = process.env.PORT||8000;
app.listen(port);
console.log('listen on port ' + port);