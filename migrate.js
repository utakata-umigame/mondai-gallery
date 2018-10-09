'use strict';

const db = require('./mongo');
const express = require('express');
const router = express();

router.get('/', (req, res) => {
  db.MondaiList.updateMany(
    {},
    {
      $set: {
        private: false
      }
    }, (err, doc) => {
      console.log(doc);
      if (doc) {
        res.send("success");
      }
    });
});

module.exports = router;
