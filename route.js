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
router.get("/user", (req, res) => {
  if (req.user)
    res.json(req.user);
  else res.json({});
});
router.get("/mylist", (req, res) => {
    db.MyList.find({}).toArray((error, docs) => {
        console.log(docs);
        res.json(docs);
    });
});
router.get("/myList/show/:id", (req, res) => {
   db.MyList.findOne({id: parseInt(req.params.id)}, (err, doc) => {
       if(err) console.log(err);
       res.json(doc);
   });
});
/* リスト編集 */
router.post("/myList/edit/:id", isAuthenticated, (req, res) => {
  let obj = req.body
   db.MyList.updateOne({"id": req.body.id}, {$set: {"name": obj.name, "description": obj.description, "mondai": obj.mondai}}, (err, doc) => {
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
    db.MyList.insertOne(req.body, (err, result) => {});
  })
  res.json({"message": "Success"});
});
/* ログイン */
router.post(
  '/login',
  passport.authenticate('local'), 
  function(req, res) {
    db.User.findOne({username: req.body.username}, (err, doc) => {
      res.json({'message': 'Logged in', 'user': doc});
    });
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