'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.get("/", (req, res)=> {
  let obj = {
    "name": "",
    "editor": "",
    "mondai":[
      {"id":0, "site": "cindy", "title": "", "author": "", "description": "", "genre": "umigame"}
    ]
  }
  res.json(obj);
});

let port = process.env.PORT||8000;
app.listen(port);
console.log('listen on port ' + port);