'use strict';

const express = require('express');
const crypto = require('crypto');
const moment = require('moment');
const db = require('./mongo');
const passport = require('./passport');
const apis = require('./api');
const router = express();

router.get("/", apis.root);
router.get("/profile/show/:id", apis.profileFromID);
router.get("/mondaiList", apis.allList);
router.get("/mondaiList/show/:id", apis.listFromID);
router.post("/signup", apis.signUp);
router.post(
  "/login",
  passport.authenticate('local'), 
  apis.login);
function isAuthenticated (req, res, next) {
  // 認証チェック
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({"error": "Authentication failed"});
  }
}
router.get("/user", isAuthenticated, apis.user);
router.get("/mypage", isAuthenticated, apis.myPage);
router.get("/logout", isAuthenticated, apis.logout);
router.post("/profile/edit", isAuthenticated, apis.editProfile);
router.post("/mondaiList/edit/:id", isAuthenticated, apis.editList);
router.post("/add", isAuthenticated, apis.addList);

module.exports = router;
/*
var crypto = require('crypto');
// jwt
router.post('/authenticate', function (req, res) {
  db.User.findOne({username: req.body.username}, (err, doc) => {
    if(!doc) {
      res.json({'error': 'error1'});
      return;
    }
    var shasum = crypto.createHash('sha1');
    shasum.update(req.body.password);
    var hash = shasum.digest('hex');
    if(doc.password !== hash) {
      res.json({'error': 'error'});
      return;
    }
    let token = jwt.sign(doc, router.get('superSecret'), {
      expiresIn: '24h'
    });
    res.json({'message': 'Logged in', 'user': doc, 'token': token});
  });
});

// Authentification Filter
router.use(function(req, res, next) {
  var token = req.query.token;

  // validate token
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
  jwt.verify(token, router.get('superSecret'), function(err, decoded) {
    if (err) {
      return res.json({
        success: false,
        message: 'Invalid token'
      });
    }
    // if token valid -> save token to request for use in other routes
    req.user = decoded;
    next();
  });
});*/