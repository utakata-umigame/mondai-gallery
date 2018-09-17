'use strict';

const express = require('express');
const path = require('path');
var router = express.Router();
var db = require('./mongo');
var crypto = require('crypto');
var moment = require('moment');

router.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'client/dist/index.html'));
});
router.post('/', function(req, res) {
  console.log();
  if (req.body['username'] === '' || req.body['password'] === '') {
    res.redirect('/signup');
    return;
  }
  let shasum = crypto.createHash('sha1');
  shasum.update(req.body['password']);
  let hash = shasum.digest('hex');
  let data = {
    nickname: req.body['nickname'],
    username: req.body['username'],
    password: hash,
    signup_date: moment()
      .utcOffset('+09:00')
      .format('YYYY/MM/DD HH:mm:ss')
  };
  if (!data.username.match(/[^A-Za-z0-9]+/)) {
    db.User.findOne({username: data.username}, function(err, doc) {
      if (err) {
        console.log(err);
      }
      if (doc) {
        res.redirect('/signup');
      } else {
        db.User.insert(data);
        res.redirect('/login');
      }
    });
  } else {
    res.redirect('/signup');
  }
});
module.exports = router;
