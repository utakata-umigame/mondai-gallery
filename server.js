'use strict';

const express = require('express');
const path = require('path');
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
app.use(express.static(path.resolve(__dirname, 'client')));
app.use('/api', router);
app.get('/add', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/client/add_list.html'));
});
app.get('/myList/show', (req, res) => {
  res.sendFile(path.resolve(__dirname + "/client/mondai_list.html"));
});
let port = process.env.PORT||8000;
let host = process.env.HOST||'0.0.0.0';
app.listen(port, host);
console.log('listen on port ' + port);