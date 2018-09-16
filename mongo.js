'use strict';

const assert = require("assert");

//Connect to MongoDB
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";
let db = {};
MongoClient.connect(url, function(err, client) {
  db.User = client.db(process.env.MONGODB_NAME||"gallery").collection("user");
  db.MyList = client.db(process.env.MONGODB_NAME||"gallery").collection("myList");
  db.Counter = client.db(process.env.MONGODB_NAME||"gallery").collection("counter");
  db.Counter.insertOne({id: "list_id", seq: 1});
  console.log("connected");
});

module.exports = db;
