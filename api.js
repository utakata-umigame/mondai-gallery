'use strict';

const crypto = require('crypto');
const moment = require('moment');
const db = require('./mongo');

module.exports = {
  root: (req, res) => {
    res.json({
      "name": "test",
      "editor": "test",
      "mondai":[
        {"id":1, "site": "cindy", "title": "", "author": "", "description": "", "genre": "umigame"}
      ]
    });  
  },
  profileFromID: (req, res) => {
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
  },
  allList: (req, res) => {
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
  },
  listFromID: (req, res) => {
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
  },
  login: (req, res) => {
    db.User.findOne({username: req.body.username}, (err, doc) => {
      if (doc) res.json({'message': 'Logged in', 'user': doc});
      else res.json({'error':'error'});
    });
  },
  signUp: (req, res) => {
    if (req.body['username'] === '' || req.body['password'] === '') {
      res.json({'error': 'Credentials are missing'});
      return;
    }
    //ハッシュ値を計算して照合
    let shasum = crypto.pbkdf2Sync(req.body['password'], process.env.SALT||'yoursalthere', 10000, 64, 'sha512');
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
  },
  /* Functions below require authentication */
  user: (req, res) => {
    if (req.user)
      res.json(req.user);
    else res.status(403).send({
      "success": "false",
      "message": "Not authenticated"
    });
  },
  myPage: (req, res) => {
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
  },
  editProfile: (req, res) => {
    let obj = req.body;
    console.log(obj);
    db.User.updateOne({"username": req.user.username}, {$set: {"bio": obj.bio, "latethink": obj.latethink, "cindy": obj.cindy, "R": obj.R, "twitter": obj.twitter, "github": obj.github}}, (err, doc) => {});
    res.json({"message": "success"})
  },
  editList: (req, res) => {
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
  },
  addList: (req, res) => {
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
  },
  logout: function (req, res) {
    req.logout();
    res.json({});
  }
};