'use strict';

const express = require('express');
const passport = require('./passport');
const apis = require('./api');
const tumblr = require('./tumblr');
const router = express();

// Public routes
router.get('/', (req, res) => res.json(apis.root()));
router.get('/allUser', (req, res) => apis.allUser(req, data => res.json(data)));
router.get('/profile/show/:id', (req, res) =>
  apis.profileFromID(req, data => res.json(data))
);
router.get('/mondaiList', (req, res) =>
  apis.allList(req, data => res.json(data))
);
router.get('/mondaiList/:id', (req, res) =>
  apis.listFromID(req, data => res.json(data), err => res.status(403).send(err))
);
router.post('/signup', apis.signUp);
router.get('/userlist/:id', (req, res) =>
  apis.listById(req, data => res.json(data))
);
router.get('/schedule', (req, res) =>
  apis.allSchedule(req, data => res.json(data))
);
router.get('/schedule/:id', (req, res) =>
  apis.schedule(req, data => res.json(data))
);
router.get('/milestone/:id', (req, res) =>
  apis.milestone(req, data => res.json(data))
);
router.post('/update', (req, res) => apis.hook(req, data => res.json(data)));
// Login
router.post('/login', passport.authenticate('local'), apis.login);

// Routes that require authentication
router.get('/acceptedList', isAuthenticated, apis.acceptedList);
router.get('/user', isAuthenticated, apis.user);
router.get('/mypage', isAuthenticated, apis.myPage);
router.get('/mylist', isAuthenticated, apis.myList);
router.get('/logout', isAuthenticated, apis.logout);
router.post('/profile/edit', isAuthenticated, apis.editProfile);
router.put('/schedule/:id', isAuthenticated, apis.editSchedule);
router.put('/milestone/:id', isAuthenticated, apis.editMilestone);
router.put('/mondaiList/:id', isAuthenticated, apis.editList);
router.post('/add', isAuthenticated, apis.addList);
router.get('/tumblr', isAuthenticated, tumblr.auth);
router.get('/auth/callback', isAuthenticated, tumblr.callback);
router.post('/post', isAuthenticated, tumblr.post);
router.post('/read/:id', isAuthenticated, apis.sendRead);
router.post('/unread/:id', isAuthenticated, apis.removeRead);

function isAuthenticated(req, res, next) {
  // 認証チェック
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({ error: 'Authentication failed' });
  }
}

module.exports = router;
