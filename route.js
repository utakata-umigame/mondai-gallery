'use strict';

const express = require('express');
const passport = require('./passport');
const apis = require('./api');
const router = express();


// Public routes
router.get("/", (req, res) => res.json(apis.root()));
router.get("/profile/show/:id", (req, res) => apis.profileFromID(req, data => res.json(data)));
router.get("/mondaiList", (req, res) => apis.allList(req, data => res.json(data)));
router.get("/mondaiList/:id", (req, res) => apis.listFromID(req, data => res.json(data), err => res.status(403).send(err)));
router.post("/signup", apis.signUp);
router.get("/userlist/:id", (req, res) => apis.listById(req, data => res.json(data)));
router.get("/schedule", (req, res) => apis.allSchedule(req, data => res.json(data)));
router.get("/schedule/:id", (req, res) => apis.schedule(req, data => res.json(data)));
// Login
router.post("/login", passport.authenticate('local'), apis.login);

// Routes that require authentication
router.get("/user", isAuthenticated, apis.user);
router.get("/mypage", isAuthenticated, apis.myPage);
router.get("/mylist", isAuthenticated, apis.myList);
router.get("/logout", isAuthenticated, apis.logout);
router.post("/profile/edit", isAuthenticated, apis.editProfile);
router.put("/schedule/:id", isAuthenticated, apis.editSchedule);
router.put("/mondaiList/:id", isAuthenticated, apis.editList);
router.post("/add", isAuthenticated, apis.addList);

function isAuthenticated (req, res, next) {
  // 認証チェック
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({"error": "Authentication failed"});
  }
}

module.exports = router;
