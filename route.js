'use strict';

const express = require('express');
var crypto = require('crypto');
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
router.get("/user", isAuthenticated, (req, res) => {
  if (req.user)
    res.json(req.user);
  else res.json({});
});
/* マイページ */
router.get("/mypage", (req, res) => {
  if (!req.user) {
    res.json({'error': 'error'});
    return;
  }
  db.User.findOne({username: req.user.username}, (err, doc) => {
    if (doc) {
      if (doc.username) {
        res.json({
          "id": doc.id,
          "username": doc.username,
          "nickname": doc.nickname,
          "signup_date": doc.signup_date
        });
        return;
      }
    }
    res.json({'error':'error'});
  });
});
/* プロフィール */
router.get("/profile/show/:id", (req, res) => {
  db.User.findOne({id: parseInt(req.params.id)}, (err, doc) => {
    if (doc) {
      res.json({
        "id": doc.id,
        "nickname": doc.nickname,
        "bio": doc.bio,
        "signup_date": doc.signup_date
      });
      return;
    }
    res.json({'error':'error'});
  });
});
router.post("/profile/edit", isAuthenticated, (req, res) => {
  let obj = req.body;
  console.log(obj);
  db.User.updateOne({"username": req.user.username}, {$set: {"bio": obj}}, (err, doc) => {})
  res.json({"message": "success"})
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
            description: x.description
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
/* リスト編集 */
router.post("/mondaiList/edit/:id", isAuthenticated, (req, res) => {
  let obj = req.body
  db.MondaiList.updateOne({"id": req.body.id, "editor.username": req.user.username}, {$set: {"name": obj.name, editor: req.user,"fromMyMondais": obj.fromMyMondais, "description": obj.description, "mondai": obj.mondai}}, (err, doc) => {
     if(err) console.log(err);
  });
  res.json({"message": "success"});
});
/* リスト追加 */
router.post("/add", isAuthenticated, (req, res) => {
  db.Counter.findOneAndUpdate({id:"list_id"},{$inc: {seq: 1}}, {new: true}, (err, res) => {
    console.log(res.value);
    let id = res.value.seq||1;
    req.body.id = id;
    req.body.editor = req.user;
    db.MondaiList.insertOne(req.body, (err, result) => {});
  })
  res.json({"message": "Success"});
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
/* ログアウト */
router.get('/logout', function (req, res) {
  req.logout();
  res.json({});
});
/* 登録 */
router.post('/signup', function(req, res) {
  console.log();
  if (req.body['username'] === '' || req.body['password'] === '') {
    res.json({'error': 'Credentials are missing'});
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

module.exports = router;