'use strict';

const assert = require("assert");

//Connect to MongoDB
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";

let failureCount = 0;
let db = {
  User: {},
  MondaiList: {},
  Counter: {}
};
let callback = function(err, client) {
  if (err) {
    failureCount++;
    if (failureCount >= 10) {
      console.log("Connection failed 10 times", err)
      return;
    }
    setTimeout(() =>{}, 5000);
    MongoClient.connect(url, callback);
    console.log("Redirect to Database");
    return;
  }
  db.User = client.db(process.env.MONGODB_NAME||"gallery").collection("user");
  db.MondaiList = client.db(process.env.MONGODB_NAME||"gallery").collection("mondaiList");
  db.Counter = client.db(process.env.MONGODB_NAME||"gallery").collection("counter");
  db.Counter.countDocuments(
    {id: "list_id"},
    {},
    function (err, res) {
      if (err) {
        console.log(err)
      }
      if (res == 0) {
        db.Counter.insertOne({id: "list_id", seq: 1});
      }
    });
  db.Counter.countDocuments(
    {id: "user_id"},
    {},
    function (err, res) {
      if (err) {
        console.log(err)
      }
      if (res == 0) {
        db.Counter.insertOne({id: "user_id", seq: 1});
      }
    });
  console.log("connected");
}
MongoClient.connect(url, callback);

module.exports = db;
