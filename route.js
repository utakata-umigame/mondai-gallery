'use strict';

const express = require('express');
const db = require('./mongo');
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
router.post("/myList/edit/:id", isAuthenticated, (req, res) => {
  let obj = req.body
   db.MyList.updateOne({"id": req.body.id}, {$set: {"name": obj.name, "description": obj.description, "mondai": obj.mondai}}, (err, doc) => {
       if(err) console.log(err);
   });
   res.json({"message": "success"});
});
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
function isAuthenticated(req, res, next) {
  // 認証チェック
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({"error": "Authentication failed"});
  }
}

module.exports = router;