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
router.get("/mylist", (req, res) => {
    db.MyList.find({}).toArray((error, docs) => {
        res.json(docs.map(x => {
            return {
                id: x.id,
                name: x.name,
                editor: x.editor
            }; 
        }));
    });
});
router.get("/myList/show/:id", (req, res) => {
   db.MyList.findOne({id: parseInt(req.params.id)}, (err, doc) => {
       if(err) console.log(err);
       res.json(doc);
   });
});
router.post("/add", (req, res) => {
  db.Counter.findOneAndUpdate({id:"list_id"},{$inc: {seq: 1}}, {new: true}, (err, res) => {
      console.log(res.value);
      let id = res.value.seq||1;
      req.body.id = id;
      db.MyList.insertOne(req.body, (err, result) => {
          console.log("inserted");
      });
  })
});


module.exports = router;