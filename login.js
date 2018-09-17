'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
var passport = require('./passport');
router.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'client/dist/index.html'));
});
router.post('/', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res, next);
});

module.exports = router;