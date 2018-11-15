'use strict';

const crypto = require('crypto');
const moment = require('moment');
const db = require('./mongo');

module.exports = {
  root: (req, res) => {
    return {
      "name": "test",
      "editor": "test",
      "mondai":[
        {"id":1, "site": "cindy", "title": "", "author": "", "description": "", "genre": "umigame"}
      ]
    };
  },
  profileFromID: (req, callback) => {
    db.User.findOne({id: parseInt(req.params.id)}, (err, doc) => {
      if (doc) {
        callback({
          "id": doc.id,
          "nickname": doc.nickname,
          "bio": doc.bio,
          "latethink": doc.latethink,
          "cindy": doc.cindy,
          "R": doc.R,
          "latelate": doc.latelate,
          "latePro": doc.latePro,
          "twitter": doc.twitter,
          "github": doc.github,
          "color": doc.color,
          "picUrl": doc.picUrl,
          "signup_date": doc.signup_date
        });
        return;
      }
      callback({'error':'error'});
    });
  },
  allList: (req, callback) => {
    db.MondaiList.find({"private": false}).toArray((error, docs) => {
        if (docs) {
          callback(docs.map(function (x) {
            return {
              id: x.id,
              name: x.name,
              fromMyMondais: x.fromMyMondais,
              private: x.private,
              editor: x.editor,
              description: x.description,
              updateDate: x.updateDate
            };
          }));
        }
        else {
          callback({'error': 'error'});
        }
    });
  },
  listById: (req, callback) => {
    // ユーザーIDでフィルター
    db.MondaiList.find({"private": false}).toArray((error, docs) => {
        if (docs) {
          let list = docs.map(x => {
            return {
                id: x.id,
                name: x.name,
                fromMyMondais: x.fromMyMondais,
                private: x.private,
                editor: x.editor,
                description: x.description,
                updateDate: x.updateDate
            }
          }).filter(x => x.editor.id.toString() === req.params.id.toString());
          callback(list);
        } else {
          callback({'error': 'error'});
        }
    });
  },
  listFromID: (req, callback, error) => {
  // リストIDを指定して表示
   db.MondaiList.findOne({id: parseInt(req.params.id)}, (err, doc) => {
     if (doc) {
       if (!doc.private) {
         db.User.findOne({"username": doc.editor.username}, (err, usr) => {
            if (usr) {
             doc.editor.color = usr.color || '#000';
            }
            callback(doc);
          })
         return;
       } else if (!req.user) {
         error({
           "success": "false",
           "message": "Not logged in"
         });
         return;
       } else if (doc.editor.username === req.user.username){
         db.User.findOne({"username": doc.editor.username}, (err, usr) => {
            if (usr) {
             doc.editor.color = usr.color || '#555';
            }
            callback(doc);
          })
         return;
       } else {
         error({
           "success": "false",
           "message": "Private list"
         });
         return;
       }
     } else {
       if (err) {
         console.log(err);
       }
       callback({'error': 'error'});
     }
   });
  },
  allSchedule: (req, callback) => {
    db.Schedule.find({}).toArray((err, docs) => {
      if (!docs) {
        callback({});
        return;
      }
      let data = docs.reduce((acc, doc) => {
        let tasks = doc.tasks.map(task => {
          task.editor = doc.editor
          return task
        });
        return acc.concat(tasks);
      }, []);
      callback(data);
    });
  },
  schedule: (req, callback) => {
    let id = parseInt(req.params.id);
    db.Schedule.findOne({"editor.id": id} , (err, doc) => {
      if (doc) {
        callback(doc);
      } else {
        callback({});
      }
    })
  },
  login: (req, res) => {
    db.User.findOne({username: req.body.username}, (err, doc) => {
      if (doc) res.json({'message': 'Logged in', 'user': doc});
      else res.status(403).send({
        'success': 'false',
        'message': 'Failed to log in'
      });
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
            "latelate": doc.latelate,
            "latePro": doc.latePro,
            "twitter": doc.twitter,
            "github": doc.github,
            "color": doc.color,
            "picUrl": doc.picUrl,
            "signup_date": doc.signup_date
          });
          return;
        }
      }
      res.json({'error':'error'});
    });
  },
  myList: (req, res) => {
    db.MondaiList.find({"editor.id": req.user.id}).toArray((err, docs) => {
      if (docs) {
        res.json(docs.map(x => {
          return {
            id: x.id,
            name: x.name,
            fromMyMondais: x.fromMyMondais,
            private: x.private,
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
  editProfile: (req, res) => {
    let obj = req.body;
    console.log(obj);
    db.User.updateOne(
      {
        "username": req.user.username
      },
      {
        $set: {
          "bio": obj.bio,
          "latethink": obj.latethink,
          "cindy": obj.cindy,
          "R": obj.R,
          "latelate": obj.latelate,
          "latePro": obj.latePro,
          "twitter": obj.twitter,
          "github": obj.github,
          "color": obj.color,
          "picUrl": obj.picUrl
        }
      }, (err, doc) => {});
    res.json({"message": "success"});
  },
  editSchedule: (req, res) => {
    if (req.params.id.toString() !== req.user.id.toString()) {
      res.status(403).send({
        "success": "false",
        "message": 'エラー'
      })
      return;
    }
    db.Schedule.findOne(
      {"editor.username": req.user.username},
      (err, doc) => {
        if (doc) {
          if (doc.editor.id !== req.user.id) {
            res.status(403).send({
              "success": "false",
              "message": err
            })
            return;
          }
          db.Schedule.updateOne(
            {"editor.username": req.user.username},
            {
              $set: {
                "editor": req.user,
                "tasks": req.body.tasks
              }
            }, (err, doc) => {
              if (doc) {
                res.status(200).send({
                  "success": "true",
                  "message": "success"
                })
              } else {
                res.status(403).send({
                  "success": "false",
                  "message": err
                })
              }
            }
          )
        } else {
          db.Schedule.insertOne(
            {
              "editor": req.user,
              "tasks": req.body.tasks
            }, (err, doc) => {
              if (doc) {
                res.status(200).send({
                  "success": true,
                  "message": "success"
                })
              } else if (err) {
                res.status(403).send({
                  "success": false,
                  "message": err
                })
              }
            }
          )
        }
      }
    )
  },
  editList: (req, res) => {
    let obj = req.body
    let updateDate = moment()
      .utcOffset('+09:00')
      .format('YYYY/MM/DD HH:mm')
    db.MondaiList.updateOne(
      {
        "id": req.body.id,
        "editor.username": req.user.username
      },
      {
        $set: {
          "name": obj.name,
          "editor": req.user,
          "fromMyMondais": obj.fromMyMondais,
          "tags": obj.tags,
          "private": obj.private,
          "description": obj.description,
          "mondai": obj.mondai,
          "updateDate": updateDate
        }
      }, (err, doc) => {
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
