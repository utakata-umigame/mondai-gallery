'use strict';

const express = require('express');
const crypto = require('crypto');
var moment = require('moment');
const db = require('./mongo');
const passport = require('./passport');
const router = express();

let id = 1;
router.get("/", (req, res) => {
  let obj = {
    "name": "test",
    "editor": "test",
    "mondai":[
      {"id":1, "site": "cindy", "title": "", "author": "", "description": "", "genre": "umigame"}
    ]
  }
  res.json(obj);
});
/* プロフィール */
router.get("/profile/show/:id", (req, res) => {
  db.User.findOne({id: parseInt(req.params.id)}, (err, doc) => {
    if (doc) {
      res.json({
        "id": doc.id,
        "nickname": doc.nickname,
        "bio": doc.bio,
        "latethink": doc.latethink,
        "cindy": doc.cindy,
        "R": doc.R,
        "twitter": doc.twitter,
        "github": doc.github,
        "signup_date": doc.signup_date
      });
      return;
    }
    res.json({'error':'error'});
  });
});
/* 問題リスト全部 */
router.get("/mondaiList", (req, res) => {
  db.MondaiList.find({}).toArray((error, docs) => {
      if (docs) {
        res.json(docs.map(function (x) {
          return {
            id: x.id,
            name: x.name,
            fromMyMondais: x.fromMyMondais,
            editor: x.editor,
            description: x.description,
            updateDate: x.updateDate
          };
        }));
      }
      else {
        res.json({'error': 'error'});
      }
  });
});
/* 問題リスト1つ */
router.get("/mondaiList/show/:id", (req, res) => {
   db.MondaiList.findOne({id: parseInt(req.params.id)}, (err, doc) => {
     if (doc) {
       res.json(doc);
       return;
     }
     if (err) {
       console.log(err);
     }
     res.json({'error': 'error'});
     
   });
});
/* ログイン */
router.post(
  '/login',
  passport.authenticate('local'), 
  function(req, res) {
    db.User.findOne({username: req.body.username}, (err, doc) => {
    if (doc) res.json({'message': 'Logged in', 'user': doc});
    else res.json({'error':'error'});
  });
});
/* 登録 */
router.post('/signup', function(req, res) {
  console.log();
  if (req.body['username'] === '' || req.body['password'] === '') {
    res.json({'error': 'Credentials are missing'});
    return;
  }
  //ハッシュ値を計算して照合
  let shasum = crypto.pbkdf2Sync(req.body['password'], process.env.SALT||'yoursalthere', 10000, 64, 'sha512');
  /* let shasum = crypto.createHash('sha1');
  shasum.update(req.body['password']); */
  let hash = shasum.toString('hex'); 
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
        res.json({'error': 'Duplicated username'});
      } else {
        db.Counter.findOneAndUpdate({id:"user_id"},{$inc: {seq: 1}}, {new: true}, (err, res) => {
          console.log(res.value);
          let id = res.value.seq||1;
          data.id = id;
          db.User.insertOne(data, (err, result) => {});
        })
        res.json({"message": 'success'});
      }
    });
  } else {
    res.json({'error': 'Invalid username'});
  }
});
function isAuthenticated (req, res, next) {
  // 認証チェック
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({"error": "Authentication failed"});
  }
}
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

router.get("/user", isAuthenticated,(req, res) => {
  if (req.user)
    res.json(req.user);
  else res.status(403).send({
    "success": "false",
    "message": "Not authenticated"
  });
});
/* マイページ */
router.get("/mypage", isAuthenticated,(req, res) => {
  if (!req.user) {
    res.json({'error': 'error1'});
    return;
  }
  db.User.findOne({username: req.user.username}, (err, doc) => {
    if (doc) {
      if (doc.username) {
        res.json({
          "id": doc.id,
          "username": doc.username,
          "nickname": doc.nickname,
          "bio": doc.bio,
          "latethink": doc.latethink,
          "cindy": doc.cindy,
          "R": doc.R,
          "twitter": doc.twitter,
          "github": doc.github,
          "signup_date": doc.signup_date
        });
        return;
      }
    }
    res.json({'error':'error'});
  });
});
router.post("/profile/edit", isAuthenticated,(req, res) => {
  let obj = req.body;
  console.log(obj);
  db.User.updateOne({"username": req.user.username}, {$set: {"bio": obj.bio, "latethink": obj.latethink, "cindy": obj.cindy, "R": obj.R, "twitter": obj.twitter, "github": obj.github}}, (err, doc) => {})
  res.json({"message": "success"})
});
/* リスト編集 */
router.post("/mondaiList/edit/:id", isAuthenticated,(req, res) => {
  let obj = req.body
  let updateDate = moment()
    .utcOffset('+09:00')
    .format('YYYY/MM/DD HH:mm')
  db.MondaiList.updateOne({"id": req.body.id, "editor.username": req.user.username}, {$set: {"name": obj.name, editor: req.user,"fromMyMondais": obj.fromMyMondais, "description": obj.description, "mondai": obj.mondai, "updateDate": updateDate}}, (err, doc) => {
     if(err) res.status(403).send({
      'success': 'false',
      'message': 'Cannot edit'
     });
     else {
      res.json({"message": "success"});
     }
  });
});
/* リスト追加 */
router.post("/add", isAuthenticated,(req, res) => {
  db.Counter.findOneAndUpdate({id:"list_id"},{$inc: {seq: 1}}, {new: true}, (err, res) => {
    console.log(res.value);
    let id = res.value.seq||1;
    req.body.id = id;
    req.body.editor = req.user;
    req.body.updateDate = moment()
      .utcOffset('+09:00')
      .format('YYYY/MM/DD HH:mm')
    db.MondaiList.insertOne(req.body, (err, result) => {});
  })
  res.json({"message": "Success"});
});
/* ログアウト */
router.get('/logout', isAuthenticated, function (req, res) {
  req.logout();
  res.json({});
});

module.exports = router;