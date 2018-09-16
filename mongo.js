'use strict';

const assert = require("assert");

//Connect to MongoDB
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = process.env.MONGODB_HOST || "mongodb://localhost:27017";
let db = {};
MongoClient.connect(url, function(err, client) {
  db.User = client.db("gallery").collection("user");
  db.MyList = client.db("gallery").collection("myList");
});

module.exports = db;